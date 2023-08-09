import { AppShell as MantineAppShell } from "@mantine/core";
import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const footerLinks: { link: string; label: string }[] = [
  {
    link: "/privacy-policy",
    label: "Privacy Policy",
  },
  {
    link: "/terms-of-service",
    label: "Terms of Service",
  },
  {
    link: "/support",
    label: "Support",
  },
];

export function AppShell() {
  const location = useLocation();

  const showHeader = useMemo(() => location.pathname !== "/", [location]);
  const mainPadding = useMemo(() => (showHeader ? "1rem" : 0), [showHeader]);

  return (
    <MantineAppShell
      padding="md"
      fixed={false}
      header={showHeader ? <Header links={[]} /> : undefined}
      footer={<Footer links={footerLinks} />}
      styles={(theme) => ({
        root: {
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh)",
        },
        body: {
          flex: 1,
        },
        main: {
          backgroundColor: theme.colors.gray[0],
          padding: mainPadding,
        },
      })}
    >
      <Outlet />
    </MantineAppShell>
  );
}
