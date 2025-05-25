class Animal {
    name: string;
    species: string;

    constructor(name: string, species: string) {
        this.name = name;
        this.species = species;
    }

    sound(): void {
        console.log("The animal makes a sound");
    }
}

class Dog extends Animal {
    breed: string;

    constructor(name: string, species: string, breed: string) {
        super(name, species);
        this.breed = breed;
    }

    sound(): void {
        console.log("The dog barks");
    }
}

// Example usage:
const genericAnimal: Animal = new Animal("Generic", "Unknown");
genericAnimal.sound(); // Output: The animal makes a sound

const myDog: Dog = new Dog("Buddy", "Canine", "Golden Retriever");
console.log(myDog.name); // Output: Buddy
console.log(myDog.species); // Output: Canine
console.log(myDog.breed); // Output: Golden Retriever
myDog.sound(); // Output: The dog barks 