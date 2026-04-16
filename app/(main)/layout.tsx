import { Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/theme/ThemeContext";
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

export default function UnifiedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <MainShell
        fontClasses={`${sourceSerif.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </MainShell>
    </ThemeProvider>
  );
}
