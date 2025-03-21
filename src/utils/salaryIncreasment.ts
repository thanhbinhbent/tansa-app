import {
  ConversionType,
  DetailedSalaryBreakdown,
  getDetailedBreakdownFromGross,
  getDetailedBreakdown,
} from "./taxHandler";

export function calculateSalaryIncrements(
  baseSalary: number,
  percentageIncreases: number[],
  conversionType: ConversionType,
  dependents: number = 0
) {
  const salaryAdjustments = [];

  for (const increasePercent of percentageIncreases) {
    const newGrossSalary = Math.round(baseSalary * (1 + increasePercent / 100));

    let breakdown: DetailedSalaryBreakdown;
    if (conversionType === ConversionType.GrossToNet) {
      breakdown = getDetailedBreakdownFromGross(newGrossSalary, dependents);
    } else {
      breakdown = getDetailedBreakdown(
        newGrossSalary,
        dependents,
        ConversionType.NetToGross
      );
    }

    salaryAdjustments.push({
      baseSalary,
      increasePercent,
      conversionType,
      newGrossSalary: Math.round(breakdown.grossSalary),
      newNetSalary: Math.round(breakdown.netSalary),
    });
  }

  return salaryAdjustments;
}

export const formatCurrency = (value: string | number) => {
  const number = Number(value.toString().replace(/\D/g, ""));
  return number.toLocaleString("vi-VN");
};
