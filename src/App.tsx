import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import SalaryConverter from "./components/ConverterDialog";
import { getExchangeRates } from "./utils/currency";
import "./index.css";
export const ExchangeRateContext = createContext<Record<string, number>>({});

const App = () => {
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
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);
