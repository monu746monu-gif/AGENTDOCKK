import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentDock",
  description: "One workspace. All AI agents. One shared project brain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}