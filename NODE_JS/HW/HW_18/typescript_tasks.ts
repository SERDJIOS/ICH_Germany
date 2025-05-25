// Задание 1 - Объединение и пересечение типов
type Admin = {
  name: string;
  permissions: string[];
};

type User = {
  name: string;
  email: string;
};

// Объединение типов Admin и User
type AdminUser = Admin & User;

// Создание объекта типа AdminUser
const adminUser: AdminUser = {
  name: "John Doe",
  permissions: ["create", "read", "update", "delete"],
  email: "john.doe@example.com"
};

console.log("Задание 1:");
console.log(adminUser);

// Задание 2 - Вложенные объекты и опциональные поля
type Car = {
  make: string;
  model: string;
  engine: {
    type: string;
    horsepower: number;
  };
  year?: number; // Опциональное поле
};

// Создание объекта типа Car
const car: Car = {
  make: "Toyota",
  model: "Camry",
  engine: {
    type: "V6",
    horsepower: 268
  },
  year: 2021
};

// Функция для вывода информации о машине
function displayCarInfo(car: Car): void {
  console.log(`
    Марка: ${car.make}
    Модель: ${car.model}
    Двигатель: ${car.engine.type}, ${car.engine.horsepower} л.с.
    ${car.year ? `Год: ${car.year}` : "Год: не указан"}
  `);
}

console.log("\nЗадание 2:");
displayCarInfo(car);

// Задание 3 - Интерфейс для функции с объектом
interface Product {
  name: string;
  price: number;
}

// Интерфейс для функции calculateDiscount
interface DiscountCalculator {
  (product: Product, discount: number): number;
}

// Реализация функции calculateDiscount
const calculateDiscount: DiscountCalculator = (product, discount) => {
  return product.price - (product.price * discount / 100);
};

const product: Product = {
  name: "Ноутбук",
  price: 1000
};

console.log("\nЗадание 3:");
console.log(`Цена ${product.name} со скидкой 15%: ${calculateDiscount(product, 15)}`);

// Задание 4 - Массив объектов и функции
interface Employee {
  name: string;
  salary: number;
}

// Массив сотрудников
const employees: Employee[] = [
  { name: "Иван", salary: 50000 },
  { name: "Мария", salary: 60000 },
  { name: "Алексей", salary: 55000 },
  { name: "Елена", salary: 65000 }
];

// Функция для получения массива зарплат
function getSalaries(employees: Employee[]): number[] {
  return employees.map(employee => employee.salary);
}

console.log("\nЗадание 4:");
console.log("Массив зарплат:", getSalaries(employees));

// Задание 5 - Наследование интерфейсов и работа с объектами
interface Person {
  firstName: string;
  lastName: string;
}

// Интерфейс Student наследует Person
interface Student extends Person {
  grade: number;
}

// Создание объекта типа Student
const student: Student = {
  firstName: "Анна",
  lastName: "Смирнова",
  grade: 90
};

// Функция для вывода информации о студенте
function displayStudentInfo(student: Student): void {
  console.log(`Студент: ${student.firstName} ${student.lastName}, Оценка: ${student.grade}`);
}

console.log("\nЗадание 5:");
displayStudentInfo(student);

// Задание 6 - Интерфейс для функции с несколькими параметрами
interface StringConcatenator {
  (str1: string, str2: string): string;
}

// Реализация функции concatStrings
const concatStrings: StringConcatenator = (str1, str2) => {
  return str1 + str2;
};

console.log("\nЗадание 6:");
console.log(`Результат объединения "Hello, " и "World!": ${concatStrings("Hello, ", "World!")}`); 