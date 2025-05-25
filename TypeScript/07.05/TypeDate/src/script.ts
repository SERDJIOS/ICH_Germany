// Напишите функцию, которая принимает строку и что-то делает

function random(): void {
    console.log("random");
}

function errorFn(message: string): never {
    throw new Error(message);
}

// This line demonstrates the never type in action
// console.log(errorFn("string")); // Uncomment to see error thrown

const arrNums: number[] = [1, 4, 6, 8, 13];
// arrNums.push('hello'); // Error: Argument of type 'string' is not assignable to parameter of type 'number'

function countArr(arr: number[]): number {
    return arr.reduce((prev, curr) => prev + curr, 0);
}

console.log(countArr([1, 3, 45]));



const tuple: [number, number, number, string] = [43,44,55, "hello"]
console.log(tuple);


// Объявите объект с несколькими свойствами разных типов данных и напишите функцию, которая принимает этот объект в качестве параметра:

// Создайте объект `book`, который содержит свойства `title` (строка), `author` (строка), и `pages` (число).
// Напишите функцию `describeBook`, которая принимает объект `book` и возвращает строку с описанием книги.

// Создайте массив с явно указанным типом элементов


interface Book {
    title: string;
    author: string;
    pages: number;
}

const myBook: Book = {
    title: "Vibe",
    author: "Kreal",
    pages: 30
};

function describeBook(book: Book): string {
    return `The book is '${book.title}' by ${book.author} and it has ${book.pages} pages.`;
}

console.log(describeBook(myBook));
console.log("-------------------------------");
// Объявите массив строк `fruits`, содержащий названия нескольких фруктов.

const fruits: string[] = ['Banane', 'Apple']

fruits.forEach(fruit =>{
    console.log(fruit);
    
})    
// Создайте кортеж, который содержит строку и число, и напишите функцию, которая принимает этот кортеж как параметр и выводит его элементы в консоль:
const arr: [string, number] = ['hello',33,]
console.log(arr);
console.log("-------------------------------");
// Создайте кортеж `person`, который содержит имя человека (строка) и его возраст (число).

const person: [string, number] = ["Boris", 27]
console.log(person);

console.log("-------------------------------");
// Напишите функцию `displayPerson`, которая принимает этот кортеж и выводит имя и возраст в консоль.

function displayPerson(person: [string,number]): void{
    const [string, number] = person;
    console.log(`His name is ${string} and his is age ${number}`);
    
}
displayPerson(person)
console.log("-------------------------------");
// Типизация массива с числами

// Создайте массив чисел `scores`, представляющий результаты тестов студентов. Напишите функцию `averageScore`, которая принимает этот массив и возвращает средний балл.

// Используем метод редьюс, средний бал высчитывается по формуле сумма на количесво

const scores: number[] = [90,34,77,184]

function averageScore(scores: number[]): number{
    const sum = scores.reduce((acc, score) => acc + score, 0);
    return sum / scores.length;
}
console.log(averageScore(scores));

console.log("-------------------------------");
// Создание типизированного объекта

// Создайте объект `car`, который будет описывать машину.
// Объект должен содержать следующие свойства:
// `brand` (строка)
// `model` (строка)
// `year` (число)
// `isElectric` (булево значение)
// Затем напишите функцию `describeCar`, которая принимает этот объект в качестве параметра и возвращает строку с описанием машины в следующем формате: "Brand Model (Year), Electric: Yes/No".
// Решение: через интерфейс, далее создаем объект, описываем через него, далее функция принимает параметр, описанный так же через этот интерфейс


interface  Car {
    brand: string,
    model: string,
    year: number,
    isElectric: boolean
}

const myCar: Car = {
    brand: "BMW",
    model: "M5",
    year: 2025,
    isElectric: true

}

function describeCar(car: Car): string {
    return `${car.brand} ${car.model} (${car.year}), Electric: ${car.isElectric ? 'Yes' : 'No'}`;
}

console.log(describeCar(myCar));

console.log("-------------------------------");

// Использование кортежей

// Создайте кортеж `personInfo`, который содержит имя (строка) и возраст (число).
// Затем напишите функцию `printPersonInfo`, которая принимает этот кортеж как параметр и выводит его элементы в консоль.


const personInfo: [string, number] = 
['Alice', 30];

function printPersonInfo(info:[string,number]): void {
    const [name, age] = info;
    console.log(`Naem: ${name}, Age: ${age}`);
    
}
printPersonInfo(personInfo)

console.log("-------------------------------");

// Массив объектов

// Создайте массив объектов `products`, где каждый объект описывает товар и содержит следующие свойства: `name` (строка), `price` (число), и `inStock` (булево значение). Напишите функцию `listAvailableProducts`, которая принимает этот массив и выводит названия товаров, которые есть в наличии.

interface Product {
    name: string,
    price: number,
    inStock: boolean
}
const products: Product[] = [
    {name: "Laptop", price: 1600, inStock: true},
    {name: "Camera", price: 1000, inStock: true}
   
];

function listAvailableProducts(products: Product[]): void{
    products.forEach(product => {
        if(product.inStock){
            console.log(product.name, product.price, product.inStock);
            
        }
    });
}
listAvailableProducts(products)

console.log("-------------------------------");


// Задача 5

// Обработка неизвестного типа

// Создайте переменную `data` типа `unknown`, которая может принимать значения разных типов.
// Напишите функцию `processData`, которая принимает эту переменную и проверяет ее тип.
// Если это строка, функция должна вернуть её длину.
// Если это число, функция должна вернуть его квадрат. В любом другом случае функция должна вернуть `null`.


const data1: unknown = "Привет";
const data2: unknown = 5;
const data3: unknown = true;


function processData(input: unknown): number | null {
    if (typeof input === 'string') {
        return input.length;
    } else if (typeof input === 'number') {
        return input * input;
    } else {
        return null;
    }
}


console.log(processData(data1)); 
console.log(processData(data2)); 
console.log(processData(data3)); 


console.log("-------------------------------");


// Задача 6

// Функция с типом `void` и `never`

// Напишите функцию `logMessage`, которая принимает строку `message` и выводит её в консоль, не возвращая никакого значения (используйте тип `void`).
// Затем напишите функцию `throwError`, которая принимает строку `errorMessage`, выбрасывает исключение с этим сообщением и имеет тип `never`.

function logMessage(message: string): void {
    console.log(message);
}

function throwError(errorMessage: string): never {
    throw new Error(errorMessage);
}


logMessage("This is a simple message.");

