class Vehicle {
    make: string;
    model: string;

    constructor(make: string, model: string) {
        this.make = make;
        this.model = model;
    }
}

class Motorcycle extends Vehicle {
    type: string;

    constructor(make: string, model: string, type: string) {
        super(make, model);
        this.type = type;
    }
}

// Example usage:
const car: Vehicle = new Vehicle("Toyota", "Camry");
console.log(car.make); // Output: Toyota
console.log(car.model); // Output: Camry

const motorcycle: Motorcycle = new Motorcycle("Honda", "CBR500R", "Sport");
console.log(motorcycle.make); // Output: Honda
console.log(motorcycle.model); // Output: CBR500R
console.log(motorcycle.type); // Output: Sport 