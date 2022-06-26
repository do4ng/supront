import { readdirSync, readFileSync } from 'fs';
import { join, parse } from 'path';
import parser from '../packages/supront/src/parser';

test('html parser', () => {
  readdirSync(join(__dirname, 'assets')).forEach((path) => {
    if (path.endsWith('.html')) {
      const parsed = parser(readFileSync(join(__dirname, 'assets', path)).toString());
      expect(parsed).toStrictEqual(JSON.parse(readFileSync(join(__dirname, 'assets', `${parse(path).name}.json`)).toString()));
    }
  });
});
