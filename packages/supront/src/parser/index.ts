import parseTag from './parseTag';
import trimHTML from './trim';

export interface TokenType {
  type: 'tag' | 'text' | 'comment' | 'root' | 'DOCTYPE';
  name?: string;
  attributes?: {
    [key: string]: string | boolean;
  };
  children?: Array<TokenType>;
  data?: string;
}

/**
 * html parser
 * @param code html code
 * @returns tokenized
 */

function parser(code: string): TokenType[] {
  const stringOpens = ["'", '"'];

  const levels: { [key: string]: TokenType } = {
    0: {
      type: 'root',
      name: 'root',
      attributes: {},
      children: [],
      data: '',
    },
  };

  let text;
  let current = 0;
  let level = 0;

  let isString = false;
  let stringStart = '';

  let collect = '';

  code = `<a>${code}</a>`;

  while (current < code.length) {
    text = code[current]; /* current text */
    if (!levels[level]) {
      levels[level] = { type: 'tag', children: [] };
    }

    if (text === '<') {
      let innerTag = '<';

      while (current < code.length) {
        if (text === '>' && !isString) break;
        current += 1;
        text = code[current];

        innerTag += text;

        if (stringOpens.includes(text) && (stringStart === text || stringStart === '')) {
          stringStart = text;
          if (isString) {
            stringStart = '';
          }
          isString = !isString;
        }
      }

      if (innerTag.startsWith('<!DOCTYPE') && innerTag.endsWith('>')) {
        /* <!DOCTYPE > */

        levels[level].children.push({
          type: 'DOCTYPE',
          data: innerTag,
        });
      } else if (innerTag.startsWith('<!--') && innerTag.endsWith('-->')) {
        /* comment */

        levels[level].children.push({
          type: 'comment',
          data: innerTag.slice(4, innerTag.length - 3),
        });
      } else if (innerTag.endsWith('/>')) {
        /* void tag */

        const parsed = parseTag(innerTag);

        levels[level].children.push({
          type: 'tag',
          name: parsed.name,
          attributes: parsed.attributes,
          children: [],
        });
      } else if (innerTag.startsWith('</')) {
        /* close tag */

        if (trimHTML(collect)) levels[level].children.push({ type: 'text', data: trimHTML(collect) });
        levels[level - 1].children.push(levels[level]);
        levels[level] = null;
        collect = '';

        // console.log(JSON.stringify(levels[level]), level); /* dev */

        level -= 1;
      } else {
        /* open tag */

        if (trimHTML(collect)) levels[level].children.push({ type: 'text', data: trimHTML(collect) });

        const { name, attributes } = parseTag(innerTag);

        levels[level + 1] = { type: 'tag', name, attributes, children: [] };
        collect = '';
        level += 1;
      }
    } else {
      collect += text;
    }

    current += 1;
  }

  const children = [];
  levels[0].children[0].children.forEach((c) => {
    children.push(c);
  });
  return children as any;
}

export default parser;
