import LogIn from "./Components/PAGES/Login";
import BookListing from "./Components/PAGES/BookListing";
import Registration from "./Components/PAGES/Registration";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Components/PAGES/RootLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "./Components/PAGES/Product";
import Categories from "./Components/PAGES/Categories";
import Users from "./Components/PAGES/Users";

const route = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Registration /> },
      { path: "Login", element: <LogIn /> },
      { path: "book-listing", element: <BookListing /> },
      { path: "products-page", element: <Product /> },
      { path: "users-page", element: <Users /> },
      { path: "categories-page", element: <Categories /> },
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
