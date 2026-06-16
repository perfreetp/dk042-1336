import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Alerts from "@/pages/Alerts";
import Preparation from "@/pages/Preparation";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/preparation" element={<Preparation />} />
      </Routes>
    </Router>
  );
}
