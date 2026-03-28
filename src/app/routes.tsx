import { createBrowserRouter } from "react-router";
import { Landing } from "./screens/Landing";
import { Discover } from "./screens/Discover";
import { AppLayout } from "./components/AppLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: Landing },
      { path: "discover", Component: Discover },
      // Additional screens will be added one by one after testing
    ],
  },
]);