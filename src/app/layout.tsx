import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"


const roboto = Roboto({ subsets: ['latin'], weight: ['100','300','400','500', '700','900'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} select-none`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
      </ThemeProvider>
      </body>
    </html>
  )
}