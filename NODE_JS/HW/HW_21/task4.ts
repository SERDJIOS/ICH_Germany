abstract class Account {
    protected balance: number = 0;

    abstract deposit(amount: number): void;
    abstract withdraw(amount: number): void;

    getBalance(): number {
        return this.balance;
    }
}

class SavingsAccount extends Account {
    private interestRate: number = 0.02; // Example interest rate

    deposit(amount: number): void {
        this.balance += amount;
        this.balance += this.balance * this.interestRate; // Apply interest
        console.log(`Deposited ${amount} to Savings. New balance: ${this.balance}`);
    }

    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrew ${amount} from Savings. New balance: ${this.balance}`);
        } else {
            console.log("Insufficient funds in Savings.");
        }
    }
}

class CheckingAccount extends Account {
    private overdraftLimit: number = 100; // Example overdraft limit
    private commissionRate: number = 0.01; // Example commission rate

    deposit(amount: number): void {
        this.balance += amount;
        console.log(`Deposited ${amount} to Checking. New balance: ${this.balance}`);
    }

    withdraw(amount: number): void {
        const commission = amount * this.commissionRate;
        const totalWithdrawal = amount + commission;
        if (this.balance + this.overdraftLimit >= totalWithdrawal) {
            this.balance -= totalWithdrawal;
            console.log(`Withdrew ${amount} (commission: ${commission}) from Checking. New balance: ${this.balance}`);
        } else {
            console.log("Insufficient funds or overdraft limit exceeded in Checking.");
        }
    }
}

// Test cases
const savings = new SavingsAccount();
savings.deposit(1000);
savings.withdraw(200);
console.log(`Final Savings Balance: ${savings.getBalance()}`);

const checking = new CheckingAccount();
checking.deposit(500);
checking.withdraw(100);
checking.withdraw(450); // This should hit overdraft or fail
console.log(`Final Checking Balance: ${checking.getBalance()}`); 