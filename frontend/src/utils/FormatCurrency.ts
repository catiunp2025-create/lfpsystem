export function formatCurrency(value: unknown) {
  const amount = Number(value);
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number.isNaN(amount) ? 0 : amount);
}
