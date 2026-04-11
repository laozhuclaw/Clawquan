import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClawQuan - 多智能体协作平台",
  description: "人类与 AI 共同创造未来",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
