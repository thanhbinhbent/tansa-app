import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser();

export enum Currency {
  AUD = "AUSTRALIAN DOLLAR",
  CAD = "CANADIAN DOLLAR",
  CHF = "SWISS FRANC",
  CNY = "YUAN RENMINBI",
  DKK = "DANISH KRONE",
  EUR = "EURO",
  GBP = "POUND STERLING",
  HKD = "HONGKONG DOLLAR",
  INR = "INDIAN RUPEE",
  JPY = "YEN",
  KRW = "KOREAN WON",
  KWD = "KUWAITI DINAR",
  MYR = "MALAYSIAN RINGGIT",
  NOK = "NORWEGIAN KRONER",
  RUB = "RUSSIAN RUBLE",
  SAR = "SAUDI RIAL",
  SEK = "SWEDISH KRONA",
  SGD = "SINGAPORE DOLLAR",
  THB = "THAILAND BAHT",
  USD = "US DOLLAR",
}

export const parseNumber = (value: string | number): number => {
  if (typeof value === "number") return value;
  const numericValue = value.replace(/\D/g, "");
  return numericValue ? Number(numericValue) : 0;
};

const EXCHANGE_RATE_API =
  "https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx";
const LOCAL_STORAGE_KEY = "exchangeRates";

export async function getExchangeRates(
  setExchangeRates: (rates: Record<string, number>) => void
) {
  console.log("Fetching latest exchange rates...");

  try {
    const response = await axios.get(EXCHANGE_RATE_API, { timeout: 10000 });

    const cleanXML = response.data.replace(/<!--[\s\S]*?-->/g, "");

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
    });
    const result = parser.parse(cleanXML);

    if (!result.ExrateList || !result.ExrateList.Exrate) {
      throw new Error("Invalid XML format");
    }

    const exrates = Array.isArray(result.ExrateList.Exrate)
      ? result.ExrateList.Exrate
      : [result.ExrateList.Exrate];

    const exchangeRates: Record<string, number> = {};
    exrates.forEach((exrate: any) => {
      if (exrate.CurrencyCode && exrate.Sell && exrate.Sell !== "-") {
        exchangeRates[exrate.CurrencyCode] = parseFloat(
          exrate.Sell.replace(/,/g, "")
        );
      }
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(exchangeRates));
    setExchangeRates(exchangeRates);
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
  }
}

export function convertAmount(
  amount: number,
  exchangeRates: Record<string, number>,
  currency: string
) {
  const rate = exchangeRates[currency];
  if (!rate) return "N/A";
  return (amount / rate).toFixed(2);
}

export const formatCurrency = (value: string | number) => {
  if (!value) return "";
  return Number(value).toLocaleString("vi-VN");
};
