export function generateFibonacci(limit: number): number[] {
  const sequence = [0, 1];
  if (limit <= 0) return [];
  if (limit === 1) return [0];
  while (sequence[sequence.length - 1] + sequence[sequence.length - 2] <= limit) {
    sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
  }
  return sequence;
}

export function generatePrimeNumbers(limit: number): number[] {
  const primes: number[] = [];
  const isPrime = new Array(limit + 1).fill(true);
  isPrime[0] = isPrime[1] = false;
  for (let p = 2; p * p <= limit; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i <= limit; i += p) isPrime[i] = false;
    }
  }
  for (let p = 2; p <= limit; p++) {
    if (isPrime[p]) {
      primes.push(p);
    }
  }
  return primes;
} 