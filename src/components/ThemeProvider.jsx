"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/utils/themeToggler";
import { Box } from "@mui/material";

// Component to ensure theme is properly loaded before rendering children
export default function ThemeConsumer({ children }) {
  const { mode } = useTheme();
  const [isClient, setIsClient] = useState(false);

  // Set initial theme class on client-side hydration
  useEffect(() => {
    setIsClient(true);

    // Force dark mode class on body to prevent white flash
    document.documentElement.classList.add("dark-theme");
    document.body.style.backgroundColor = "#161d2e";

    // Cleanup function for when component unmounts
    return () => {
      document.documentElement.classList.remove("dark-theme");
    };
  }, []);

  // Update theme classes when mode changes
  useEffect(() => {
    if (!isClient) return;

    if (mode === "dark") {
      document.documentElement.classList.add("dark-theme");
      document.documentElement.classList.remove("light-theme");
      document.body.style.backgroundColor = "#161d2e";
    } else {
      document.documentElement.classList.add("light-theme");
      document.documentElement.classList.remove("dark-theme");
      document.body.style.backgroundColor = "#f8f9fa";
    }
  }, [mode, isClient]);

  // During server rendering or hydration, render with proper styling for dark mode
  if (!isClient) {
    return (
      <Box
        sx={{
          backgroundColor: "#161d2e",
          color: "#ffffff",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {children}
      </Box>
    );
  }

  // Once on client, render normally with proper theme
  return <>{children}</>;
}
