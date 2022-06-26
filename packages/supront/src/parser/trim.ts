export default function trimHTML(c: string): string {
  c = c.trim();
  let r = '';
  let startString = false;
  c.replace('\t', ' ')
    .split('\n')
    .forEach((l) => {
      if (l.trim() !== '') {
        if (!startString) startString = true;
        if (r !== '') r += '\n';
        r += `${l}`;
      }
    });
  return r;
}
