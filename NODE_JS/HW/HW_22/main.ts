import { capitalize, reverseString } from './stringUtils';
import { Finance } from './finance';
import { UserManagement } from './userManagement';
import { generateFibonacci, generatePrimeNumbers } from './sequenceUtils';

// Test stringUtils
console.log("--- String Utilities ---");
const testString = "hello world";
console.log(`Original: "${testString}"`);
console.log(`Capitalized: "${capitalize(testString)}"`);
console.log(`Reversed: "${reverseString(testString)}"`);
console.log(`Capitalized empty string: "${capitalize("")}"`);
console.log(`Reversed empty string: "${reverseString("")}"`);

// Test finance
console.log("\n--- Finance Operations ---");
const loanCalculator = new Finance.LoanCalculator();
const principal = 100000;
const annualInterestRate = 5;
const loanTermInYears = 10;
const monthlyPayment = loanCalculator.calculateMonthlyPayment(principal, annualInterestRate, loanTermInYears);
console.log(`Monthly payment for a loan of ${principal} at ${annualInterestRate}% for ${loanTermInYears} years: ${monthlyPayment.toFixed(2)}`);

const taxCalculator = new Finance.TaxCalculator();
const income = 50000;
const taxRate = 20;
const incomeTax = taxCalculator.calculateIncomeTax(income, taxRate);
console.log(`Income tax for an income of ${income} at a ${taxRate}% rate: ${incomeTax}`);

// Test userManagement
console.log("\n--- User Management ---");
const adminUser = new UserManagement.Admin.AdminUser("John Doe", "john.doe@example.com");
console.log(adminUser.getPermissions());
adminUser.setSuperAdmin(true);
console.log("After granting super admin rights:");
console.log(adminUser.getPermissions());

// Test sequenceUtils
console.log("\n--- Sequence Utilities ---");
const fibLimit = 50;
console.log(`Fibonacci sequence up to ${fibLimit}: ${generateFibonacci(fibLimit).join(', ')}`);
const primeLimit = 30;
console.log(`Prime numbers up to ${primeLimit}: ${generatePrimeNumbers(primeLimit).join(', ')}`);

console.log(`Fibonacci sequence up to 0: ${generateFibonacci(0).join(', ')}`);
console.log(`Fibonacci sequence up to 1: ${generateFibonacci(1).join(', ')}`);
console.log(`Prime numbers up to 1: ${generatePrimeNumbers(1).join(', ')}`);
console.log(`Prime numbers up to 2: ${generatePrimeNumbers(2).join(', ')}`); 