import { MainLayout, AuthLayout } from "@/components/layouts";
import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";
import { Login, Register } from "./auth";
import Home from "./Home";
import Projects from "./Projects";

const routes: RouteObject[] = [
  {
    Component: AuthLayout,
    loader: () => {
      if (
        sessionStorage.getItem("auth") &&
        sessionStorage.getItem("auth") !== "null"
      ) {
        return redirect("/");
      } else {
        return null;
      }
    },
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    Component: MainLayout,
    loader: () => {
      if (
        sessionStorage.getItem("auth") &&
        sessionStorage.getItem("auth") !== "null"
      ) {
        return null;
      } else {
        return redirect("/login");
      }
    },
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/projects",
        Component: Projects,
      },
    ],
  },
];

export default createBrowserRouter(routes);
