import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/shared/Header";
import CoinPage from "./pages/CoinPage";
import HomePage from "./pages/HomePage";
import './App.css'
import Alert from "./components/error/Alert";

function App() {
  return (
    <BrowserRouter>
      <div className="app light">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
