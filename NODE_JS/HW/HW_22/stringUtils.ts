export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function reverseString(str: string): string {
  return str.split('').reverse().join('');
} 