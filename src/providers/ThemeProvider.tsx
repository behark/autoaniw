'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type Theme = 'light' | 'dark' | 'system';
type BrandTheme = 'autoani' | 'custom';

interface ThemeContextType {
  theme: Theme;
  brandTheme: BrandTheme;
  setTheme: (theme: Theme) => void;
  setBrandTheme: (brandTheme: BrandTheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultBrandTheme?: BrandTheme;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultBrandTheme = 'autoani',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [brandTheme, setBrandTheme] = useState<BrandTheme>(defaultBrandTheme);
  const [mounted, setMounted] = useState(false);

  // When mounted on client, set the theme based on local storage if available
  useEffect(() => {
    setMounted(true);
    
    // Check for theme in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    // Check for brandTheme in localStorage
    const savedBrandTheme = localStorage.getItem('brandTheme') as BrandTheme | null;
    if (savedBrandTheme) {
      setBrandTheme(savedBrandTheme);
    }
    
    // Apply the theme to the HTML element
    updateThemeClass(savedTheme || defaultTheme, savedBrandTheme || defaultBrandTheme);
  }, [defaultTheme, defaultBrandTheme]);

  // Save theme to localStorage and update document whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      updateThemeClass(theme, brandTheme);
    }
  }, [theme, brandTheme, mounted]);

  // Update the theme CSS class on the HTML element
  const updateThemeClass = (currentTheme: Theme, currentBrandTheme: BrandTheme) => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark');
    
    // Remove all brand theme classes
    root.classList.remove('autoani-theme', 'custom-theme');
    
    // Add the current theme class
    if (currentTheme === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.add('light');
      }
    } else {
      root.classList.add(currentTheme);
    }
    
    // Add the current brand theme class
    root.classList.add(`${currentBrandTheme}-theme`);
  };

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'light';
      
      // If system, toggle based on system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
    });
  };

  // Context value
  const value = {
    theme,
    brandTheme,
    setTheme,
    setBrandTheme,
    toggleTheme
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      <NextThemesProvider
        attribute="class"
        defaultTheme={theme}
        enableSystem
      >
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
