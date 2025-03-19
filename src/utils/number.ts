export const parseNumber = (value: string | number): number => {
  if (typeof value === "number") return value;
  const numericValue = value.replace(/\D/g, "");
  return numericValue ? Number(numericValue) : 0;
};
export const formatCurrency = (value: string | number) => {
  if (!value) return "";
  return Number(value).toLocaleString("vi-VN");
};
