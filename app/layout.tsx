import { GeistSans } from "geist/font/sans";
import "./globals.css";
import SettingsButtons from "@/components/SettingsButtons";
import Link from "next/link";
import MainLogo from "@/components/MainLogo";
import AuthButton from "@/components/AuthButton";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import NavigationButtons from "@/components/NavigationButtons";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <AppRouterCacheProvider>
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-8 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                  <Link href="/">
                    <div className="flex gap-4 justify-center items-center">
                      <MainLogo />
                      <div className="text-xl">Octopus CEO - Dashboard</div>
                    </div>
                  </Link>
                  <div className="flex gap-4 justify-center items-center">
                    <NavigationButtons />
                  </div>
                  <div className="flex gap-4 justify-center items-center">
                    <SettingsButtons />
                    <AuthButton />
                  </div>
                  {/* {isSupabaseConnected && <AuthButton />} */}
                </div>
              </nav>

              {children}

              <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
                <p>
                  Powered by{" "}
                  <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    Supabase
                  </a>
                </p>
              </footer>
            </div>

          </main>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
