export enum ConversionType {
  GrossToNet = "gross_to_net",
  NetToGross = "net_to_gross",
}

export const PERSONAL_DEDUCTION = 11_000_000;
export const DEPENDENT_DEDUCTION = 4_400_000;

export interface DetailedSalaryBreakdown {
  grossSalary: number;
  socialInsurance: number;
  healthInsurance: number;
  unemploymentInsurance: number;
  totalInsurance: number;
  incomeBeforeTax: number;
  personalDeduction: number;
  dependentDeduction: number;
  taxableIncome: number;
  tax: number;
  netSalary: number;
}

export function calculateTax(monthlyTaxableIncome: number): number {
  if (monthlyTaxableIncome <= 0) return 0;
  const annualTaxableIncome = monthlyTaxableIncome * 12;
  let tax = 0;
  if (annualTaxableIncome <= 60_000_000) {
    tax = annualTaxableIncome * 0.05;
  } else if (annualTaxableIncome <= 120_000_000) {
    tax = 60_000_000 * 0.05 + (annualTaxableIncome - 60_000_000) * 0.1;
  } else if (annualTaxableIncome <= 216_000_000) {
    tax =
      60_000_000 * 0.05 +
      60_000_000 * 0.1 +
      (annualTaxableIncome - 120_000_000) * 0.15;
  } else if (annualTaxableIncome <= 384_000_000) {
    tax =
      60_000_000 * 0.05 +
      60_000_000 * 0.1 +
      96_000_000 * 0.15 +
      (annualTaxableIncome - 216_000_000) * 0.2;
  } else {
    tax =
      (annualTaxableIncome - 384_000_000) * 0.25 +
      60_000_000 * 0.05 +
      60_000_000 * 0.1 +
      96_000_000 * 0.15 +
      168_000_000 * 0.2;
  }
  return tax / 12;
}

export function getDetailedBreakdownFromGross(
  gross: number,
  dependents: number,
  insuranceSalary: number = gross
): DetailedSalaryBreakdown {
  const socialBase = Math.min(insuranceSalary, 46_800_000);
  const socialInsurance = socialBase * 0.08;
  const healthInsurance = socialBase * 0.015;
  const unemploymentInsurance = Math.min(insuranceSalary, 99_200_000) * 0.01;
  const totalInsurance = Math.round(
    socialInsurance + healthInsurance + unemploymentInsurance
  );
  const incomeBeforeTax = Math.round(gross - totalInsurance);
  const personalDeduction = PERSONAL_DEDUCTION;
  const dependentDeduction = Math.round(dependents * DEPENDENT_DEDUCTION);
  const taxableIncome = Math.max(
    0,
    incomeBeforeTax - personalDeduction - dependentDeduction
  );
  const tax = calculateTax(taxableIncome);
  return {
    grossSalary: Math.round(gross),
    socialInsurance,
    healthInsurance,
    unemploymentInsurance,
    totalInsurance,
    incomeBeforeTax,
    personalDeduction,
    dependentDeduction,
    taxableIncome,
    tax,
    netSalary: Math.round(incomeBeforeTax - tax),
  };
}

export function getDetailedBreakdown(
  salary: number,
  dependents: number,
  inputType: ConversionType,
  insuranceSalary: number = salary
): DetailedSalaryBreakdown {
  if (inputType === ConversionType.GrossToNet) {
    return getDetailedBreakdownFromGross(salary, dependents, insuranceSalary);
  }
  let grossGuess = salary * 1.2;
  let breakdown = getDetailedBreakdownFromGross(
    grossGuess,
    dependents,
    insuranceSalary
  );
  for (let i = 0; i < 100; i++) {
    const error = salary - breakdown.netSalary;
    if (Math.abs(error) < 1) break;
    grossGuess += error;
    breakdown = getDetailedBreakdownFromGross(
      grossGuess,
      dependents,
      insuranceSalary
    );
  }
  return breakdown;
}
