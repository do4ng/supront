export default function minifyAttributes(attributes: { [key: string]: string | boolean }) {
  let code = '';
  Object.keys(attributes).forEach((attr) => {
    if (attributes[attr]) {
      if (attr === attributes[attr]) {
        code += `${code.endsWith(' ') ? '' : ' '}${attr} `;
      }
      code += `${attr}="${attributes[attr]}"`;
    }
  });
  return code;
}
