const people = [{ id: 1, name: 'Jack' }, { id: 2, name: 'Sally' }, { id: 3, name: 'Joe' }];

console.time('object.desc');
people.reduce((lookup, person) => ({
  ...lookup, [person.id]: person
}), {});
console.timeEnd('object.desc');

console.time('object.set');
people.reduce((lookup, person) => {
  lookup[person.id] = person;
  return lookup;
}, {});
console.timeEnd('object.set');

const numbers = [10, 20, 30, 40, 50];

console.time('array.desc');
numbers.reduce((arr, v) => [...arr, v * 100], []);
console.timeEnd('array.desc');

console.time('array.push');
numbers.reduce((arr, v) => {
  arr.push(v * 100);
  return arr;
}, []);
console.timeEnd('array.push');
