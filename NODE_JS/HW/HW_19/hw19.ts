// Задание 1
// Стрелочная функция, которая принимает массив чисел и возвращает сумму всех четных чисел
const sumEvenNumbers = (numbers: number[]): number => {
    return numbers.reduce((sum, num) => num % 2 === 0 ? sum + num : sum, 0);
};

// Задание 2
// Интерфейс для функции, которая принимает строку и возвращает boolean
interface StringToBooleanFunction {
    (str: string): boolean;
}

// Реализация функции, проверяющей является ли строка пустой
const isEmpty: StringToBooleanFunction = (str) => str.length === 0;

// Задание 3
// Тип для функции, принимающей две строки и возвращающей boolean
type CompareStrings = (str1: string, str2: string) => boolean;

// Функция, соответствующая типу CompareStrings
const areEqual: CompareStrings = (str1, str2) => str1 === str2;

// Задание 4
// Обобщенная функция, принимающая массив любого типа и возвращающая последний элемент
function getLastElement<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[arr.length - 1] : undefined;
}

// Задание 5
// Обобщенная функция, принимающая три аргумента одного типа и возвращающая их в виде массива
function makeTriple<T>(a: T, b: T, c: T): T[] {
    return [a, b, c];
}

// Примеры использования
console.log("Задание 1:");
console.log(sumEvenNumbers([1, 2, 3, 4, 5, 6])); // 12 (2 + 4 + 6)

console.log("\nЗадание 2:");
console.log(isEmpty("")); // true
console.log(isEmpty("hello")); // false

console.log("\nЗадание 3:");
console.log(areEqual("hello", "hello")); // true
console.log(areEqual("hello", "world")); // false

console.log("\nЗадание 4:");
console.log(getLastElement([1, 2, 3, 4, 5])); // 5
console.log(getLastElement(["a", "b", "c"])); // "c"
console.log(getLastElement([])); // undefined

console.log("\nЗадание 5:");
console.log(makeTriple(1, 2, 3)); // [1, 2, 3]
console.log(makeTriple("a", "b", "c")); // ["a", "b", "c"]
console.log(makeTriple(true, false, true)); // [true, false, true] 