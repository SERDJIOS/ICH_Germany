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
  
  const books: Book[] = [
    { title: "1984", author: "George Orwell", yearPublished: 1949, isAvailable: true },
    { title: "To Kill a Mockingbird", author: "Harper Lee", yearPublished: 1960, isAvailable: false },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", yearPublished: 1925, isAvailable: true }
  ];
  
  function printBookInfo(books: Book[]): void {
      books.forEach((item) => {
          console.log(`Title: ${item.title}`);
          console.log(`Author: ${item.author}`);
          console.log(`Year Published: ${item.yearPublished}`);
          console.log(`Available: ${item.isAvailable}`);
          console.log('----------------------');
      });
  }
  
  printBookInfo(books);