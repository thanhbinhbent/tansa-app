import ReactDOM from "react-dom/client";

import "./index.css";
import SalaryConverter from "./components/ConverterDialog";

const App = () => (
  <div className="container">
    <SalaryConverter />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
