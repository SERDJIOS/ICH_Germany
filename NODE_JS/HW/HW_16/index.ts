
function greetUser(name: string): void {
  console.log(`Привет, ${name}!`);
}


interface Person {
  name: string;
  age: number;
  city: string;
}

function printPersonInfo(person: Person): void {
  console.log(`Имя: ${person.name}, Возраст: ${person.age}, Город: ${person.city}`);
}


function squareNumber(num: number): number {
  return num * num;
}


function isEven(num: number): boolean {
  return num % 2 === 0;
}


interface Student {
  name: string;
  grade: number;
}

function printStudentInfo(student: Student): void {
  console.log(`Студент: ${student.name}, Оценка: ${student.grade}`);
}


function logMessage(message: string): void {
  console.log(message);
}


greetUser("Алексей");

const person: Person = {
  name: "Иван",
  age: 30,
  city: "Москва"
};
printPersonInfo(person);

console.log(squareNumber(5)); // 25

console.log(isEven(4)); // true
console.log(isEven(7)); // false

const student: Student = {
  name: "Мария",
  grade: 95
};
printStudentInfo(student);

logMessage("Hello, world!"); 