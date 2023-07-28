import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Components/PAGES/RootLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogIn from "./Components/PAGES/Login";
import BookListing from "./Components/PAGES/BookListing";
import Registration from "./Components/PAGES/Registration";
import Product from "./Components/PAGES/Products";
import Categories from "./Components/PAGES/Categories";
import Users from "./Components/PAGES/Users";
import EditCategory from "./Components/PAGES/EditCategory";
import AddCategory from "./Components/PAGES/AddCategory";
import Products from "./Components/PAGES/Products";
import AddBook from "./Components/PAGES/AddBook";
import EditUser from "./Components/PAGES/EditUser";
import Cart from "./Components/PAGES/Cart";
import UpdateProfile from "./Components/PAGES/UpdateProfile";

const route = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Registration /> },
      { path: "Login", element: <LogIn /> },
      { path: "book-listing", element: <BookListing /> },

      { path: "products-page", element: <Products /> },
      { path: "add-book", element: <AddBook /> },

      { path: "users-page", element: <Users /> },
      { path: "edit-user/:user_id/:pw", element: <EditUser /> },

      { path: "categories-page", element: <Categories /> },
      { path: "add-category", element: <AddCategory /> },
      { path: "edit-category/:category_id", element: <EditCategory /> },

      { path: "cart-page", element: <Cart /> },

      { path: "update-profile", element: <UpdateProfile /> },
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
