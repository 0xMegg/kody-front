import { cookies } from "next/headers";
import { Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/theme/ThemeContext";
import { resolveThemeName, THEME_COOKIE_KEY } from "@/lib/theme/cookie";
import "@/lib/theme/tokens.css";
import MainShell from "./MainShell";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  weight: ["400", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
});

export default async function UnifiedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const initialTheme = resolveThemeName(
    cookieStore.get(THEME_COOKIE_KEY)?.value,
  );

  return (
    <ThemeProvider initialTheme={initialTheme}>
      <MainShell
        fontClasses={`${sourceSerif.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </MainShell>
    </ThemeProvider>
  );
}
