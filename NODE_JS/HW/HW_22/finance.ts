export namespace Finance {
  export class LoanCalculator {
    calculateMonthlyPayment(principal: number, annualInterestRate: number, loanTermInYears: number): number {
      const monthlyInterestRate = annualInterestRate / 12 / 100;
      const numberOfPayments = loanTermInYears * 12;
      if (monthlyInterestRate === 0) {
        return principal / numberOfPayments;
      }
      const monthlyPayment = 
        principal * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
      return monthlyPayment;
    }
  }

  export class TaxCalculator {
    calculateIncomeTax(income: number, taxRate: number): number {
      return income * (taxRate / 100);
    }
  }
} 