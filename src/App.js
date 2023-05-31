import LogIn from "./Components/Pages/Login";
import ProductList from "./Components/Pages/ProductList";
import Registration from "./Components/Pages/Registration";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Components/Pages/RootLayout";
import AddProduct from "./Components/Pages/AddProduct";
import EditProduct from "./Components/Pages/EditProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookListing from "./Components/Pages/BookListing";

const route = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Registration /> },
      { path: "Login", element: <LogIn /> },
      { path: "product-page", element: <ProductList /> },
      { path: "product-page/add", element: <AddProduct /> },
      { path: "product-page/edit", element: <EditProduct /> },
      { path: "book-listing", element: <BookListing /> },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
