abstract class Animal {
    abstract makeSound(): string;
}

class Dog extends Animal {
    makeSound(): string {
        return "Bark";
    }
}

class Cat extends Animal {
    makeSound(): string {
        return "Meow";
    }
}

const animals: Animal[] = [new Dog(), new Cat()];

animals.forEach(animal => {
    console.log(animal.makeSound());
}); 