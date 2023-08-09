import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider, type MantineThemeOverride } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { HelmetProvider } from "react-helmet-async";

const mantineTheme: MantineThemeOverride = {
  colors: {
    purple: [
      "#BE009A",
      "#9B007E",
      "#7F0067",
      "#680055",
      "#560046",
      "#390030",
      "#270722",
      "#25001F",
      "#23001C",
      "#1B0016",
    ],
    gold: [
      "#FEFCF9",
      "#F7EBD2",
      "#F1DCAE",
      "#ECCE8E",
      "#E7C06E",
      "#E2B351",
      "#DDA836",
      "#D49C24",
      "#BF8C20",
      "#AC7E1D",
    ],
    sage: [
      "#F5F5F0",
      "#E2E4D6",
      "#D1D4BD",
      "#C2C6A7",
      "#B3B891",
      "#A5AB7D",
      "#989F6B",
      "#8B915E",
      "#7D8355",
      "#70764C",
    ],
    black: [
      "#15170E",
      "#13150D",
      "#12130C",
      "#10110B",
      "#0F100A",
      "#0D0E09",
      "#0C0D08",
      "#0B0C07",
      "#0A0B06",
      "#090906",
    ],
  },
  primaryColor: "purple",
  primaryShade: { light: 4 },
  fontFamily: "Quicksand",
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={mantineTheme} withGlobalStyles withNormalizeCSS>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </MantineProvider>
  </React.StrictMode>
);
