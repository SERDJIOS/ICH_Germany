class Library {
    static totalBooks: number = 0;
    title: string;

    constructor(title: string) {
        this.title = title;
    }

    addBook(): void {
        Library.totalBooks++;
        console.log(`Book added. Total books: ${Library.totalBooks}`);
    }
}

// Example usage:
const library1: Library = new Library("Main Library");
const library2: Library = new Library("Branch Library");

library1.addBook(); // Output: Book added. Total books: 1
library2.addBook(); // Output: Book added. Total books: 2
library1.addBook(); // Output: Book added. Total books: 3

console.log(`Total books in all libraries: ${Library.totalBooks}`); // Output: Total books in all libraries: 3 