"use client";
import { Toaster as HotToaster } from "react-hot-toast";
import { useTheme } from "@/utils/themeToggler";

export default function Toaster() {
  const { mode } = useTheme();

  return (
    <HotToaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: mode === "dark" ? "#333" : "#fff",
          color: mode === "dark" ? "#fff" : "#333",
          borderRadius: "10px",
        },
        success: {
          iconTheme: {
            primary: "#10B981",
            secondary: "white",
          },
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: "white",
          },
        },
      }}
    />
  );
}
