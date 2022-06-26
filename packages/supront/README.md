# supront-js

Supront is html tool for production which is super fast!

---

```bash
$ npm install --save-dev supront
```

```js
const supront = require('supront');
const code = `
<div>Hello, World!</div>
<link href="style.css" rel="stylesheet" />
<script src="index.js"></script>
`;
```

## bundle html, css, js

use esbuild to bundle javascript

```js
const dist = supront.bundle(code);
```

## minify html

```js
const dist = supront.minify(code);
```

## parsing html

```js
const tree = supront.parse(code);
```
