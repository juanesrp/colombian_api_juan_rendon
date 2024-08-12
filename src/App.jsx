import { Route, Routes } from "react-router-dom";
import ColombiaDash from "./views/ColombiaDash/ColombiaDash";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/colombia_dash" element={<ColombiaDash />} />
    </Routes>
  );
}

export default App;
