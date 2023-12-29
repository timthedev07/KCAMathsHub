import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppLayout } from "../components/AppLayout";
import { PageProgressBarProvider } from "../components/contexts/ProgressProvider";
import SessionProvider from "../components/contexts/SessionProvider";
import { getServerSession } from "../lib/authoptions";
import { getMetadata } from "../lib/getMetadata";
import { TRPCProvider } from "../trpc/Provider";
import "./globals.css";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = getMetadata({
  description:
    "A community-based platform for providing peer-assistance with Math school work and questions; currently available internally at KCA.",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html
      lang="en"
      className="bg-primary-bg dark text-text-color overflow-hidden"
    >
      <head>
        <meta
          name="google-site-verification"
          content="ou31BwzL6hYs78yHQZrfEFRvZIBWxVoPkErFfm0f2z4"
        />
      </head>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <TRPCProvider>
            <PageProgressBarProvider>
              <AppLayout session={session}>{children}</AppLayout>
            </PageProgressBarProvider>
          </TRPCProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
