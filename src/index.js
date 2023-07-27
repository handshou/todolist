import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";
import MyProviders from "./context/MyProviders";
import App from "./routes/app";
import Login from "./routes/login";
import Register from "./routes/register";
import ProtectedApp from "./routes/protected";
import Todolist from "./routes/todolist";

import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "app",
        element: <ProtectedApp />,
        children: [
          {
            path: "/app/todolist",
            element: <Todolist />,
          },
        ],
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

document.title = "Todolist";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MyProviders>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </MyProviders>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
