const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const supront = require('supront');
const { javascriptPlugin } = require('supront-plugin-js');

const dist = supront.bundle(readFileSync(join(__dirname, './index.html')).toString(), {
  plugins: [javascriptPlugin({ base: __dirname })],
  base: __dirname,
});
console.log(typeof dist);
writeFileSync(join(__dirname, 'dist.html'), dist.toString());
