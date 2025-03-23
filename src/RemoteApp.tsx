import { createContext, useEffect, useState } from "react";
import SalaryConverter from "./components/ConverterDialog";
import { getExchangeRates } from "./utils/currency";
import "./index.css";
export const ExchangeRateContext = createContext<Record<string, number>>({});

export default function RemoteApp() {
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    getExchangeRates(setExchangeRates);
  }, []);

  return (
    <ExchangeRateContext.Provider value={exchangeRates}>
      <SalaryConverter />
    </ExchangeRateContext.Provider>
  );
}
