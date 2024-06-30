"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </ThemeProvider>
  );
};
export default Providers;
