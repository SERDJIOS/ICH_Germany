abstract class Appliance {
    abstract turnOn(): void;
    abstract turnOff(): void;
}

class WashingMachine extends Appliance {
    turnOn(): void {
        console.log("Washing machine is ON");
    }

    turnOff(): void {
        console.log("Washing machine is OFF");
    }
}

class Refrigerator extends Appliance {
    turnOn(): void {
        console.log("Refrigerator is ON");
    }

    turnOff(): void {
        console.log("Refrigerator is OFF");
    }
}

const appliances: Appliance[] = [new WashingMachine(), new Refrigerator()];

appliances.forEach(appliance => {
    appliance.turnOn();
    appliance.turnOff();
}); 