"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ar" | "en";
type Theme = "light" | "dark";

interface AppContextType {
  language: Language;
  theme: Theme;
  toggleLanguage: () => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");
  const [theme, setTheme] = useState<Theme>("light");

  // Load saved preferences on client mount
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Language;
    const savedTheme = localStorage.getItem("theme") as Theme;

    if (savedLang) {
      setLanguage(savedLang);
    } else {
      localStorage.setItem("lang", "ar");
    }

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      localStorage.setItem("theme", prefersDark ? "dark" : "light");
    }
  }, []);

  // Sync preferences with HTML document settings
  useEffect(() => {
    const root = document.documentElement;
    
    // Theme sync
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    
    // Language sync
    root.setAttribute("lang", language);
    root.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    localStorage.setItem("lang", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <AppContext.Provider value={{ language, theme, toggleLanguage, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
