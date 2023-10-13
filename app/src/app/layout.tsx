import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TRPCProvider } from "../trpc/Provider";
import { AppLayout } from "../components/AppLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KCAMathsHub",
  description:
    "A community-based platform for providing peer-assistance with Math school work and questions; currently available internally at KCA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-primary-bg text-text-color">
      <body className={inter.className}>
        <TRPCProvider>
          <AppLayout>{children}</AppLayout>
        </TRPCProvider>
      </body>
    </html>
  );
}
