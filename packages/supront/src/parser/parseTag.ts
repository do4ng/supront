/* eslint-disable prefer-destructuring */
export default function parseTag(tag: string): { name: string; attributes: { [key: string]: string | boolean } } {
  if (tag.startsWith('<')) tag = tag.slice(1);
  if (tag.endsWith('>')) tag = tag.slice(0, tag.length - 1);
  if (tag.startsWith('/')) tag = tag.slice(1);
  if (tag.endsWith('/')) tag = tag.slice(0, tag.length - 1);

  const stringOpens = ["'", '"'];

  let current = 0;

  let isString = false;
  let stringStart = '';

  const data: { start: string } = {
    start: '',
  };

  data.start = tag.trim().split(' ')[0];
  tag = tag.trim().split(' ').slice(1).join(' ');

  const code = tag;

  current = 0;
  stringStart = '';
  isString = false;

  let selected = '';
  let selectedKey = '';

  const attrs: { [key: string]: string | boolean } = {};
  while (current < code.length) {
    const next = code
      .slice(current + 1)
      .trim()
      .charAt(0);

    const text = code[current];
    selected += text;
    current += 1;
    if (stringOpens.includes(text) && (stringStart === text || stringStart === '')) {
      stringStart = text;
      if (isString) {
        attrs[selectedKey.slice(0, selectedKey.length - 1).trim()] = selected.slice(1, selected.length - 1);
        selected = '';
        selectedKey = '';
        stringStart = '';
      }
      isString = !isString;
      continue;
    }

    if (text === '=' && !isString) {
      selectedKey = selected;
      selected = '';
      while (code[current] === ' ') current += 1;
      continue;
    }

    if (selected !== '' && code[current] === ' ' && next !== '=' && !isString) {
      attrs[selected] = true;
      selected = '';
      continue;
    }
  }
  return {
    name: data.start,
    attributes: attrs,
  };
}
