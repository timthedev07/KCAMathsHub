import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppLayout } from "../components/AppLayout";
import { AppLoadingProvider } from "../components/TopLoadingBar";
import { TRPCProvider } from "../trpc/Provider";
import "./globals.css";
import { getServerSession } from "../lib/authoptions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KCAMathsHub",
  description:
    "A community-based platform for providing peer-assistance with Math school work and questions; currently available internally at KCA.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en" className="bg-primary-bg dark text-text-color">
      <body className={inter.className}>
        <TRPCProvider>
          <AppLoadingProvider>
            <AppLayout session={session}>{children}</AppLayout>
          </AppLoadingProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
