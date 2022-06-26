import parseTag from '../packages/supront/src/parser/parseTag';

test('tag parser', () => {
  expect(parseTag('<div app string="10" />')).toEqual({ name: 'div', attributes: { app: true, string: '10' } });
  expect(parseTag('<div app string = "10" hello=" world " />')).toEqual({
    name: 'div',
    attributes: { app: true, string: '10', hello: ' world ' },
  });
});
