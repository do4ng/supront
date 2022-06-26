import parser, { TokenType } from '../../parser';
import minifyAttributes from './minifyAttributes';

export interface MinifyOptions {
  removeComment?: boolean;
}

function minifyHTML(node: TokenType, opt?: MinifyOptions): string {
  let code = '';
  if (node.type === 'text') {
    code = node.data + code;
  } else if (node.type === 'tag') {
    let children = '';
    if (node.children) {
      node.children.forEach((c) => {
        children += minifyHTML(c, opt);
      });
    }
    const attrs = minifyAttributes(node.attributes);
    if (children === '') {
      code = `<${node.name}${attrs === '' ? '' : ' '}${attrs} />`;
    } else {
      code = `<${node.name}${attrs === '' ? '' : ' '}${attrs}>${children}</${node.name}>`;
    }
  } else if (node.type === 'comment' && !opt.removeComment) {
    code += `<!--${node.data || ''}-->`;
  } else if (node.type === 'DOCTYPE') {
    code += node.data;
  }

  return code;
}
/**
 * minify html code
 */
export default function minify(html: string | TokenType[], options?: MinifyOptions) {
  let code = '';
  if (typeof html === 'string') {
    parser(html).forEach((h) => {
      code += minifyHTML(h, options);
    });
  } else if (typeof html === 'object') {
    html.forEach((h) => {
      code += minifyHTML(h, options);
    });
  }
  return code;
}
