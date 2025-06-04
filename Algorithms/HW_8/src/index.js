const Stack = require('./stack');

function demo() {
  const stack = new Stack();

  console.log('Создали пустой стек. Пуст ли стек?', stack.empty());

  console.log('\nДобавляем элементы: A, B, C');
  stack.push('A');
  stack.push('B');
  stack.push('C');

  console.log('Пуст ли стек?', stack.empty());
  console.log('Размер стека:', stack.size());
  console.log('Элемент на вершине (peek):', stack.peek());

  console.log('\nИщем элементы:');
  console.log("Поиск 'C':", stack.search('C'));
  console.log("Поиск 'B':", stack.search('B'));
  console.log("Поиск 'A':", stack.search('A'));
  console.log("Поиск 'Z':", stack.search('Z'));

  console.log('\nУдаляем элементы при помощи pop():');
  console.log('pop():', stack.pop());
  console.log('Новая вершина (peek):', stack.peek());
  console.log('pop():', stack.pop());
  console.log('pop():', stack.pop());
  console.log('pop() из пустого стека:', stack.pop());

  console.log('\nПосле нескольких pop() стек пуст:', stack.empty());
  console.log('Размер стека:', stack.size());
}

demo();