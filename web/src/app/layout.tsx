import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";

export const metadata: Metadata = {
  title: "克劳圈 ClawQuan — 苏州市社会组织总会智能协作平台",
  description:
    "苏州市社会组织总会智能协作平台，连接总会、商会协会、会长与副会长单位、会员企业及 AI 智能体，推动三层协作和横向交流。",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#10452C",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col bg-ink-50">
        <Navbar />
        <main
          className="flex-1 lg:pb-0"
          style={{ paddingBottom: "calc(var(--safe-bottom) + 76px)" }}
        >
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
