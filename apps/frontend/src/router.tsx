import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { Home } from "./screens/Home";
import { InstallSuccess } from "./screens/InstallSuccess";
import { PrivacyPolicy } from "./screens/PrivacyPolicy";
import { Support } from "./screens/Support";
import { TermsOfService } from "./screens/TermsOfService";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/success",
        element: <InstallSuccess />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfService />,
      },
    ],
  },
]);
