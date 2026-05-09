export type ThemeName = "linear" | "notion" | "supabase";

export interface ThemeConfig {
  name: ThemeName;
  displayName: string;
  fontImports: string[]; // next/font/google font IDs (e.g., "Source_Serif_4")
  fontVariables: string[]; // CSS variable names (e.g., "--font-source-serif")
  rootClassName?: string; // additional root class (e.g., "supabase-root")
  sectionLabel?: string; // Sidebar section label (e.g., "메뉴")
  mainPadding: number; // main content padding in px
  header: {
    logoStyle: Record<string, string | number>;
    badgeStyle: Record<string, string | number>;
    badgeText: string;
    prefix?: React.ReactNode;
  };
}
