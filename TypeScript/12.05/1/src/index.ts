// Создайте функцию, которая принимает два числа и возвращает их сумму.
function sum (a: number, b:number): number {
    return a + b
}
console.log(sum(3,7));


// Реализуйте функцию с опциональным параметром, которая принимает строку и возвращает ее длину или сообщение о пустой строке.
function getStringLength(str?: string): string | number {
    if (!str) {
      return "Строка не передана или пуста";
    }
    return str.length;
  }
  console.log(getStringLength("fvdf"));
  
// Напишите стрелочную функцию, которая принимает массив чисел и возвращает массив, где все элементы умножены на 2.
const fnArr = (arr: number[]): number[] => {
    return arr.map((item) => item * 2);
}
const arr = [1, 3, 5];
console.log(fnArr(arr));

const fnArr1 = (arr: number[]): number[] => {
    return arr.reduce((acc: number[], item: number) => {
        acc.push(item * 2);
        return acc;
    }, []);
}
const arr1 = [1, 3, 5];
console.log(fnArr1(arr1));

console.log("______________________________");

// Напишите стрелочную функцию, которая принимает массив чисел и возвращает число - сумму всех элементов массива, сначала надо отфильтровать массив, тк будет передан массив чисел и строк
const fn4 = (arr: [number, number, string, number]): number =>
    arr.filter(a => typeof a === 'number').reduce((acc, num) => acc + num, 0)
  console.log(fn4([3, 5, 'abc', 77]))

  console.log("______________________________");


  // T, G - обобщенный тип (generic) смысл которого принять любой тип данных в момент вызова функции
function identity<T, G>(value: T, num: G): T | G {
    if(typeof value === 'string') {
        return value
    }
    return num
}

const res1 = identity<string, number>('hello world', 10)

function getFirstElem<T>(arr: T[]): T {
    return arr[0]
}

const arrRes1= getFirstElem<number>([4, 3, 2, 5, 1, 9])
const arrRes2= getFirstElem<string>(['hello first string', 'asdas', 'asdasd'])
console.log(arrRes2);

console.log("______________________________");
//   Напишите обобщенную функцию, которая принимает массив любого типа и возвращает первый элемент этого массива.


function fnFirstElm<T>(arr: T[]): T {
    return arr[1]
}
console.log(fnFirstElm<number>([19,23,54]));

// Создайте обобщенную функцию, которая принимает два аргумента одного типа и возвращает массив из этих двух элементов.

function fnMakePair<T>(a: T, b: T): T[]{
    return [a,b]
}
console.log(fnMakePair<number>(1,2));
console.log("______________________________");


// Напишите обобщенную функцию, которая принимает объект и строку — имя свойства этого объекта. Функция должна возвращать значение этого свойства.
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }
// Создайте обобщенную функцию с ограничением по типу, которая принимает массив объектов с полем `id` и возвращает массив значений `id`.
// Обобщённая функция для получения значения свойства объекта

  
  // Обобщённая функция с ограничением по типу для извлечения id
  function extractIds<T extends { id: number | string }>(items: T[]): (T["id"])[] {
    return items.map(item => item.id);
  }
  
  const user = { name: "Alice", age: 30 };
  const userName = getProperty(user, "name"); // string
  const age = getProperty(user, "age");       // number
  
  console.log(userName); 
  console.log(age);       
  
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];
  
  const ids = extractIds(users); 
  console.log(ids);


//   Задание 4
// Обобщенная функция
// Создайте обобщенную функцию `reverseArray`, которая принимает массив любого типа и возвращает его элементы в обратном порядке.

function reverseArray<T>(arr: T[]): T[] {
    return [...arr].reverse();
  }
  
  // Примеры использования:
  console.log(reverseArray<number>([1, 2, 3]));         // [3, 2, 1]
  console.log(reverseArray<string>(['a', 'b', 'c']));   // ['c', 'b', 'a']

//   Задание 5

// Обобщенный интерфейс

// Определите обобщенный интерфейс `KeyValuePair<K, V>`, который описывает пару "ключ-значение".

// Реализуйте функцию `createKeyValuePair`, которая принимает ключ и значение и возвращает объект, соответствующий этому интерфейсу.


function reverseArray1<T>(arr: T[]): T[] {
    const result: T[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      result.push(arr[i]);
    }
    return result;
  }
  
  // Примеры:
  console.log(reverseArray1<number>([10, 20, 30]));       // [30, 20, 10]
  console.log(reverseArray1<boolean>([true, false]));     // [false, true]