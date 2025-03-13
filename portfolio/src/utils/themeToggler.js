"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CssBaseline from "@mui/material/CssBaseline";

// Create theme context
const ThemeContext = createContext({
  mode: "dark",
  toggleTheme: () => {},
});

// Create theme settings
const getThemeSettings = (mode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // Light mode palette
            primary: {
              main: "#FFA500",
            },
            secondary: {
              main: "#0d6efd",
            },
            background: {
              paper: "#f5f5f5",
              default: "#ffffff",
            },
          }
        : {
            // Dark mode palette
            primary: {
              main: "#FFA500",
            },
            secondary: {
              main: "#0d6efd",
            },
            background: {
              default: "#161d2e",
              paper: "#171c28",
            },
          }),
    },
    typography: {
      fontFamily: [
        "var(--font-montserrat)",
        "Roboto",
        "Arial",
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        '"Helvetica Neue"',
        "sans-serif",
      ].join(","),
      h1: {
        fontFamily: "var(--font-montserrat)",
        fontWeight: 700,
      },
      h2: {
        fontFamily: "var(--font-montserrat)",
        fontWeight: 700,
      },
      h3: {
        fontFamily: "var(--font-montserrat)",
        fontWeight: 600,
      },
      h4: {
        fontFamily: "var(--font-montserrat)",
        fontWeight: 600,
      },
      h5: {
        fontFamily: "var(--font-montserrat)",
        fontWeight: 500,
      },
      h6: {
        fontFamily: "var(--font-montserrat)",
        fontWeight: 500,
      },
      button: {
        fontFamily: "var(--font-montserrat)",
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
            fontFamily: "var(--font-montserrat)",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "var(--font-montserrat)",
          },
        },
      },
    },
  });
};

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Check for user's preferred color scheme
  const prefersDarkMode =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false;

  // Initialize state with user preference or default to light
  const [mode, setMode] = useState("light");

  // Effect to set initial theme based on user preference or localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else if (prefersDarkMode) {
      setMode("dark");
    }
  }, [prefersDarkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  // Generate theme based on current mode
  const theme = getThemeSettings(mode);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Create a toggle button component
export const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      color="inherit"
      aria-label="Toggle light/dark theme"
      sx={{
        p: 1,
        transition: "all 0.3s ease",
        borderRadius: "50%",
        background:
          mode === "light"
            ? "linear-gradient(145deg, #e6e6e6, #ffffff)"
            : "linear-gradient(145deg, #2d2d2d, #1a1a1a)",
        boxShadow:
          mode === "light"
            ? "4px 4px 8px #d9d9d9, -4px -4px 8px #ffffff"
            : "4px 4px 8px #0d0d0d, -4px -4px 8px #2d2d2d",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow:
            mode === "light"
              ? "6px 6px 10px #d9d9d9, -6px -6px 10px #ffffff"
              : "6px 6px 10px #0d0d0d, -6px -6px 10px #2d2d2d",
        },
        "&:active": {
          transform: "translateY(0)",
          boxShadow:
            "inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      {mode === "light" ? (
        <Brightness4Icon
          sx={{
            transition: "transform 0.5s ease",
            animation: "spin 0.5s",
            "@keyframes spin": {
              "0%": { transform: "rotate(-45deg)" },
              "100%": { transform: "rotate(0)" },
            },
          }}
        />
      ) : (
        <Brightness7Icon
          sx={{
            transition: "transform 0.5s ease",
            animation: "spin 0.5s",
            "@keyframes spin": {
              "0%": { transform: "rotate(45deg)" },
              "100%": { transform: "rotate(0)" },
            },
          }}
        />
      )}
    </IconButton>
  );
};
