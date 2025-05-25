let result: string | number;
result = 10
result = 'hello'
//error
// result = false
// console.log(result);

function bound(param: string | number): string | number {
    if(typeof param === 'string' && param.length > 10) {
        return param + ' Here it is'
    }
    if(typeof param === 'number') {
        return param + 1000
    }
    return 'param doesnt have required length'
}

console.log(bound('heh'))

// type str = string
// const value: str = 'hello'
// type Person = {
//     name: string
// }

// type MoreInfo = {
//     age: number,
//     lastName: string
// }

// type UnitedInfo = Person & MoreInfo

// const obj: UnitedInfo = {
//     age: 99,
//     name: 'name',
//     lastName: 'jujujuju'
// }

// Создайте переменную, которая может быть либо строкой, либо числом. Затем напишите функцию, которая обрабатывает и выводит длину строки или умножает число на 2.

let result2: string | number = 28

function sum (param: string | number): string | number {
    if (typeof param === "string" ){
        return param.length
    }else if(typeof param === "number"){
        return param * 2
        
    }
    return param
        
}

console.log(sum(result2));
// Напишите пример пересечения типов. Создайте два типа: `Person` и `Employee`, затем создайте объект, который объединяет свойства этих двух типов.

type Person = {
    name: string,
    age: number
}

type Employee = {
    lastName: string,
    city: string
}

type Human = Employee & Person

const obj: Human = {
    name: "Boris",
    age: 28,
    lastName: "Jon",
    city: "Düss"
}

console.log(obj);




type Address = {
    city: string
    street: string
    zip: number
}

type User = {
    name: string,
    age: number,
    address: Address
}

interface IAdditionalParams {
    moreDetals: string
}

interface IAddress {
    city: string
    street: string
    zip: number
}

interface IUser extends IAdditionalParams {
    name: string
    age: string
    address: IAddress
}


interface IUser{
    name: string
    age: string
    //?
    address?: IAddress
}

const infoAboutUser: IUser = {
    name: 'HHH',
    age: '77'
}

console.log(infoAboutUser?.address?.city)