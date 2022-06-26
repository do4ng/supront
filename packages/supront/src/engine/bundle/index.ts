import { readFileSync } from 'fs';
import { join } from 'path';

import { javascriptPlugin } from 'supront-plugin-js';

import parser from '../../parser';
import minify from '../minify';
import explore from './explore';

export interface Options {
  base?: string /* default: process.cwd() */;
  target?: { tag: string; key: string; replace?: string; require?: object }[];
  plugins?: any[];
}

/**
 * minify html code
 */
export default function bundle(html: string, options?: Options) {
  const opts: Options = {
    base: process.cwd(),
    target: [],
    plugins: [],
    ...options,
  };

  opts.target.push(
    { tag: 'script', key: 'src' } /* <script src="..." /> */,
    { tag: 'link', key: 'href', require: { rel: ['stylesheet'] } } /* <link href="..." rel: "stylesheet" /> */,
    {
      tag: 'style',
      key: 'src',
      require: { type: ['import', 'load', 'stylesheet'] },
    } /* <style src="..." type="import" /> */
    /* supront only (not working on browser) */
  );

  opts.plugins.push(javascriptPlugin({ base: opts.base, esbuild: { platform: 'browser' } }));

  opts.plugins.forEach((plugin) => {
    if (plugin.getConfig) plugin.getConfig(opts);
  });

  const node = explore(parser(html), (n) => {
    if (opts.target.filter((a) => a.tag === n.name).length > 0) {
      opts.target
        .filter((a) => a.tag === n.name)
        .forEach((target) => {
          if (
            Object.keys(target.require || {}).filter((c) => Object.hasOwn(target.require, c) && target.require[c].includes(n.attributes[c]))
              .length === Object.keys(target.require || {}).length
          ) {
            if (Object.hasOwn(n.attributes, target.key)) {
              let data = readFileSync(join(opts.base, (n.attributes as any)[target.key])).toString();
              opts.plugins.forEach((plugin) => {
                if (plugin.transform) {
                  data = plugin.transform(data, n);
                  console.log(data);
                }
              });
              n.children.push({ type: 'text', data });

              n.attributes[target.key] = null;
            }
          }
        });
    }
    return n;
  });
  return minify(node);
}
