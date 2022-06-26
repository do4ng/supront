export interface TokenType {
  type: 'tag' | 'text' | 'comment' | 'root' | 'DOCTYPE';
  name?: string;
  attributes?: {
    [key: string]: string | boolean;
  };
  children?: Array<TokenType>;
  data?: string;
}

export interface MinifyOptions {
  removeComment?: boolean;
}

export interface Options {
  /** default: process.cwd() */
  base?: string;
  plugins?: any[];
  target?: { tag: string; key: string; replace?: string; require?: object }[];
}
export function parser(code: string): TokenType[];
export function parseTag(tag: string): { name: string; attributes: { [key: string]: string | boolean } };

export function bundle(html: string, options?: Options);
export function minifyHTML(node: TokenType, opt?: MinifyOptions): string;
