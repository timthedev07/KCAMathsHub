import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TRPCProvider } from "../trpc/Provider";
import Script from "next/script";

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
    <html lang="en">
      {process.env.NODE_ENV === "development" ? (
        <Script src="http://localhost:8097"></Script>
      ) : (
        ""
      )}
      <body className={inter.className + ` bg-primary-bg text-text-color`}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
