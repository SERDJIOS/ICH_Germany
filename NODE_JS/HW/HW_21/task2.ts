abstract class Shape {
    abstract calculateArea(): number;
}

abstract class ColoredShape extends Shape {
    abstract color: string;
}

class ColoredCircle extends ColoredShape {
    constructor(public radius: number, public color: string) {
        super();
    }

    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class ColoredRectangle extends ColoredShape {
    constructor(public width: number, public height: number, public color: string) {
        super();
    }

    calculateArea(): number {
        return this.width * this.height;
    }
}

const coloredShapes: ColoredShape[] = [
    new ColoredCircle(5, "red"),
    new ColoredRectangle(4, 6, "blue")
];

coloredShapes.forEach(shape => {
    console.log(`Area: ${shape.calculateArea()}, Color: ${shape.color}`);
}); 