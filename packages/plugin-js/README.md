# supront-plugin-js

> It is built into supront by default.

HTML javascript source bundler (using esbuild)

```js
const supront = require('supront');
const { javascriptPlugin } = require('supront-plugin-js');

const code = `
<script src="index.js"></script>
`;

const dist = supront.bundle(code, {
  plugins: [javascriptPlugin({ base: __dirname })],
  base: __dirname,
});
```

```js
// index.js
require('helloworld.js')();
```

```js
// helloworld.js
console.log('hello, world');
```

## ⚠️ Warning

bad :

```html
<script>
  require('helloworld.js')(); // not working!!
</script>
```

good :

```html
<script src="..." />
```
