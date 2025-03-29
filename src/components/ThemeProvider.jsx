"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/utils/themeToggler";

// Component to ensure theme is properly loaded before rendering children
export default function ThemeConsumer({ children }) {
  const { mode } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During server rendering or hydration, render with opacity 0
  if (!isClient) {
    return <div style={{ opacity: 0 }}>{children}</div>;
  }

  // Once on client, render normally with proper theme
  return <>{children}</>;
}
