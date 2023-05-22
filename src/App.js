import LogIn from "./Components/Pages/Login";
import ProductList from "./Components/Pages/ProductList";
import Registration from "./Components/Pages/Registration";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Components/Pages/RootLayout";

const route = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Registration /> },
      { path: "Login", element: <LogIn /> },
      { path: "product-page", element: <ProductList /> },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
