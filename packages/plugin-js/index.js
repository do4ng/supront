/* eslint-disable implicit-arrow-linebreak */
const esbuild = require('esbuild');
const { readFileSync } = require('fs');
const { join } = require('path');

module.exports.javascriptPlugin = function (config = {}) {
  const build = (code) =>
    esbuild.buildSync({ entryPoints: [code], outfile: join(__dirname, 'cache', '0.js'), bundle: true, ...(config.esbuild || {}) });
  return {
    name: 'supront-plugin-js',
    transform(code, node) {
      console.log(code, node);
      if (node.attributes && typeof node.attributes.type === 'undefined' && Object.hasOwn(node.attributes, 'src')) {
        build(join(config.base || process.cwd(), node.attributes.src));
        return readFileSync(join(__dirname, 'cache', '0.js')).toString();
      }
      if (node.attributes.type === 'application/javascript' || node.attributes.type === 'text/javascript') {
        build(join(config.base || process.cwd(), node.attributes.src));
        return readFileSync(join(__dirname, 'cache', '0.js')).toString();
      }
      return code;
    },
  };
};
