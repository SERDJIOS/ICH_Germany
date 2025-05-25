// void - возвращаемое значение явно не определено
function sayMyName(name: string): string {
    return name;
  }
  
  const message = sayMyName("Jerry Berry Man");
  console.log(message);
  
  const greet = (name: string): string => {
    return name;
  };
  
  console.log(greet("Herry Jerry Lemon"));
  
  //ts позволяет заранее указывать типы данных
  const myName: string = "Yury";
  const age: number = 27;
  const myAddress: string = "My address";
  const isProgrammer: boolean = true;
  const isHungry: boolean = true;
  
  const multiply = (a: number, b: number, c: number) => {
    return a * b * c;
  };
  
  console.log(multiply(4, 3, 2));
  
  const obj: { name: string; lastName: string } = {
    name: "Yury",
    lastName: "Arakelov",
  };
  
  //interface - используем для описания объектов, с целью обезопасить типизацию
  interface IAboutMe {
    name: string;
    lastName: string;
    age: number;
    isProgrammer: boolean;
    greetings: (phrase: string) => string;
  }

  const infoAboutMe: IAboutMe = {
    name: "Herry",
    lastName: "Priston",
    age: 98,
    isProgrammer: false,
    greetings: (phrase: string) => {
      return phrase;
    },
  };
  
  interface IData {
      a: number
      b: number
      display: string
      input?: string
  }
  
  function displayData(data: IData) {
      return {
          param1: data.display,
          param2: data.a * data.b,
          param3: data.input ?? 'no input'
      };
  }
  
  const result = displayData({a: 5, b: 10, display: 'display param', input: 'input param'});
  console.log(result);
  

//   Определите интерфейс для объекта с данными пользователя:
//    Имя: `name` (строка)
//    Возраст: `age` (число)
//    Email: `email` (строка)

// Создайте объект, соответствующий этому интерфейсу:

// Создайте переменную `user`, которая будет содержать данные пользователя.

// Напишите функцию, которая принимает объект этого интерфейса в качестве параметра:

// Функция должна принимать объект `User` и выводить данные пользователя в консоль.
// Запустите код, чтобы убедиться, что данные пользователя выводятся правильно.
interface IUserData {
  name: string, 
  age: number,
  email: string
}
const user: IUserData = {
  name: 'Anna',
  age: 30,
  email : '123@qqwe.com'
}
function about(userObj: IUserData): void {
  console.log(`Her nama is ${userObj.name}, her age is ${userObj.age},  her email is ${userObj.email}`)
}

about(user);

// /////////////////////////////////

// Создайте интерфейс `Book`:

// Определите интерфейс, который описывает книгу. У книги должны быть следующие свойства:
// `title` (строка) — название книги.
// `author` (строка) — автор книги.
// `yearPublished` (число) — год издания.
// `isAvailable` (булево значение) — доступна ли книга в библиотеке.


interface Book {
  title: string;
  author: string;
  yearPublished: number;
  isAvailable: boolean;
}

const book: Book = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  yearPublished: 1925,
  isAvailable: true
};

function printBookInfo(book: Book): void {
  console.log(`Название: ${book.title}`);
  console.log(`Автор: ${book.author}`);
  console.log(`Год издания: ${book.yearPublished}`);
  console.log(`Доступна: ${book.isAvailable}`);
}

printBookInfo(book);