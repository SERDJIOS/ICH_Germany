// Задание 1

// Класс `Car` и его наследник `ElectricCar`
// Создайте класс `Car`, который будет содержать свойства `make` (марка автомобиля) и `year` (год выпуска).
// Добавьте метод `start()`, который выводит в консоль сообщение `"The car is starting"`.

// Затем создайте класс-наследник `ElectricCar`, который добавит новое свойство `batteryLevel` (уровень заряда батареи).

// Переопределите метод `start()`, чтобы он выводил сообщение `"The electric car is starting"`.
class Car {
    constructor(public mark: string, public year: number) {
        this.mark = mark;
        this.year = year;
    }

    start() {
        console.log(`The car (${this.mark}, ${this.year}) is starting`);
    }
}

class ElectricCar extends Car {
    constructor(public batteryLevel: number, mark: string, year: number) {
        super(mark, year);
    }

    start() {
        console.log(`The electric car (${this.mark}, ${this.year}, battery: ${this.batteryLevel}%) is starting`);
    }
}

const car = new Car("BMW", 2020);
car.start(); 

const electricCar = new ElectricCar(100, "Tesla", 2021);
electricCar.start();  

console.log("---------------------------------");

// Задание 2

// Статический метод для создания объектов

// Создайте класс `Product`, который имеет свойства `name` (название продукта) и `price` (цена продукта).

// Добавьте статический метод `createDiscountedProduct`, который принимает название продукта, цену и процент скидки, а затем возвращает новый объект `Product` с учетом скидки.
class Product {
    constructor(public name: string, public price: number) {
        this.name = name;
        this.price = price;
    }

    static createDiscountedProduct(name: string, price: number, discountPercent: number): Product {
        const discountedPrice = price - (price * discountPercent / 100);
        return new Product(name, discountedPrice);
    }
}

// Пример использования:
const discountedProduct = Product.createDiscountedProduct("Laptop", 1000, 15);
console.log(`Product: ${discountedProduct.name}, Price after discount: $${discountedProduct.price}`);

console.log("---------------------------------");
// Задание 3

// Модификаторы доступа в классе `BankAccount`

// Создайте класс `BankAccount`, который содержит защищенное свойство `balance` (баланс).

// Реализуйте метод `deposit()`, который увеличивает баланс, и метод `withdraw()`, который уменьшает баланс.

// В классе `BankAccount` должен быть публичный метод `getBalance()`, который возвращает текущий баланс.

// Создайте объект и проверьте работу методов.

class BankAccount {
    protected balance: number;

    constructor(initialBalance: number = 0) {
        this.balance = initialBalance;
    }

    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
        } else {
            console.log("Deposit amount must be positive.");
        }
    }

    withdraw(amount: number): void {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
        } else {
            console.log("Invalid withdraw amount.");
        }
    }

    public getBalance(): number {
        return this.balance;
    }
}

// Пример использования:
const account = new BankAccount(1000);
account.deposit(534);
account.withdraw(45);
console.log(`Current balance: $${account.getBalance()}`); 

console.log("---------------------------------");
// Задание 4

// Наследование и работа со статическим свойством

// Создайте класс `Employee` с полями `name` (имя) и `position` (должность).

// Добавьте статическое свойство `employeeCount`, которое увеличивается при создании нового сотрудника.

// Затем создайте класс `Manager`, который наследуется от `Employee` и добавляет новое свойство `department` (отдел).


class Employee {
    public name: string;
    public position: string;
    static employeeCount: number = 0;

    constructor(name: string, position: string) {
        this.name = name;
        this.position = position;
        Employee.employeeCount++;
    }

    static getEmployeeCount(): number {
        return Employee.employeeCount;
    }
}

class Manager extends Employee {
    public department: string;

    constructor(name: string, position: string, department: string) {
        super(name, position);
        this.department = department;
    }
}

// Пример использования:
const emp1 = new Employee("Alice", "Developer");
const emp2 = new Employee("Bob", "Designer");
const mgr1 = new Manager("Charlie", "Team Lead", "Engineering");

console.log(`Total employees: ${Employee.getEmployeeCount()}`); // Ожидается: 3
console.log(`${mgr1.name} works in ${mgr1.department} as a ${mgr1.position}`);