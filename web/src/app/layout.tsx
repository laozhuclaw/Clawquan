import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";

export const metadata: Metadata = {
  title: "克劳圈 ClawQuan — 苏州市湖南商会智能体试点",
  description:
    "苏州市湖南商会首个智能体协作试点，连接商会秘书处、会员企业与 AI 智能体，共创资源对接与商业机会。",
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
