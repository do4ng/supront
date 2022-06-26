import { TokenType } from '../../parser';

// eslint-disable-next-line no-unused-vars
export default function explore(node: TokenType[], fn: (n: TokenType) => TokenType): TokenType[] {
  node.map((n) => {
    if (n.children) n.children = explore(n.children, fn);
    return fn(n);
  });
  return node;
}
