import Footer from "./Components/SECTIONS/Footer";
import Header from "./Components/SECTIONS/Header";
import LogIn from "./Components/PAGES/LogIn";
import ProductList from "./Components/PAGES/ProductList";
import Register from "./Components/PAGES/Registration";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Register /> */}
      <ProductList />

      <Footer />
    </div>
  );
}

export default App;
