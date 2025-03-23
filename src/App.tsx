import { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RemoteApp from "./RemoteApp";

const App = () => {
  return <RemoteApp />;
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);
