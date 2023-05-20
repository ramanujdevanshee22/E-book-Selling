import Footer from "./Components/Footer";
import Header from "./Components/Header";
import LogIn from "./Pages/LogIn";
import ProductList from "./Pages/ProductList";
import Register from "./Pages/Register";
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
