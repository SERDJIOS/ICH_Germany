// class User {
//     name: string;
//     age: number;

//     constructor(name: string, age: number) {
//         this.name = name;
//         this.age = age;
//     }

//     greet(specialHi: string) {
//         console.log(`Hello, my name is ${this.name}. and ${specialHi} World `);
//     }
// }

// const user = new User('Alice', 25);
// console.log(user);

// user.greet("i love");
// class User {
//     public name: string;
//     private age: number;
//     protected username: string
//     constructor(name: string, age: number, username: string) {
//         this.name = name
//         this.age = age
//         this.username = username
//     }

//    public greet(specialHi: string) {
//         console.log(`Hello, my name is ${this.name}. ${this.age} And i'm saying: ${specialHi}`)
//     }
//     protected getUsername() {
//         return this.username
//     }
//     //Статистические методы можно вызывать напрямую без создания экземпляра класса
//     // static hello() {
//     //     console.log('helo))')
//     // }
// }

// const Alice = new User('Alice', 25, 'allie')

// Alice.greet('HELLO ))')
// // User.hello()
// class SpecialUser extends User {
//     showUsername() {
//         console.log(this.getUsername())
//     }
// }
// const newAlice = new SpecialUser('new Alice', 30, 'Allie999')
// console.log(Alice);
// newAlice.showUsername()

// Измените класс `User`, добавив приватное свойство `password`, которое будет хранить пароль пользователя.

// Добавьте публичный метод для установки пароля (например, `setPassword(password: string)`), который позволит менять значение этого приватного свойства.

// Создайте публичный метод `checkPassword(password: string)`, который будет проверять корректность введенного пароля и возвращать `true` или `false`.

// class newUser{
//     public name: string;
//       public age: number;
//     protected password: string;

//     constructor(name: string, age: number, password: string){
//         this.name = name,
//         this.age = age,
//         this.password = password
//     }
//     protected showPassword(){
//         return this.password
//     }
// }

// const user1 = new User("Jony", 22, "123123")
// class Admin extends newUser{
//      showAdminPassword(){
//         console.log(`Password: ${this.showPassword()}`);

//      }
// }
// const admin = new Admin("Maks", 30, "элита")
// admin.showAdminPassword()
// console.log(user1);

// Создание класса Admin

// Создайте класс `Admin`, который наследуется от `User`.
// Добавьте в класс `Admin` метод `displayUsers()`, который выводит в консоль список всех пользователей. Для этого создайте статический массив `users` в классе `User`, куда будете добавлять созданных пользователей.

// Переопределение метода greet

// В классе `Admin` переопределите метод `greet()`, чтобы он выводил сообщение о том, что пользователь является администратором.
class User {
    static users: User[] = [];

    public name: string;

    constructor(name: string) {
        this.name = name;

        User.users.push(this);
    }

    greet(): void {
        console.log(`Hello, this is ${this.name}`);
        
    }
}

class Admin extends User {
    constructor(name: string) {
        super(name)
    }

    greet(): void {
        console.log(`Hello, this is admin ${this.name}`);
    }

    displayUsers() {
        User.users.forEach((user) => {
            console.log(`${user.name}`);
            
        })
    }
}

const user1 = new User('Alice')
const user2 = new User('Karina')

const admin1 = new Admin('Bob')
const admin2 = new Admin('Jonas')

user1.greet()
admin1.greet()
admin2.displayUsers()