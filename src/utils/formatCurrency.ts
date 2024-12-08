export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString('uz-UZ').replace(/,/g, ' ')} so'm`;
}
