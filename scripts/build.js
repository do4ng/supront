const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

esbuild.build({
  entryPoints: ['packages/supront/src/index.ts'],
  outfile: 'packages/supront/dist/index.js',
  bundle: true,
  platform: 'node',
  plugins: [nodeExternalsPlugin()],
});
