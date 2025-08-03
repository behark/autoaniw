/**
 * Internationalization Configuration
 * 
 * This module sets up internationalization (i18n) for the AutoAni platform
 * using next-i18next. It supports localized content for media metadata, alt text,
 * and UI elements throughout the application.
 */

import { InitOptions } from 'i18next';

export const DEFAULT_LOCALE = 'en';

// Supported locales in the application
export const SUPPORTED_LOCALES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪', dir: 'rtl' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

/**
 * Default i18next configuration
 */
export const i18nConfig: InitOptions = {
  // List of supported locales
  supportedLngs: SUPPORTED_LOCALES.map(locale => locale.code),
  
  // Default locale
  fallbackLng: DEFAULT_LOCALE,
  
  // Split translations into multiple files - each namespace
  // represents a separate translation file
  ns: [
    'common',      // Common UI elements
    'media',       // Media manager translations
    'vehicles',    // Vehicle-related translations
    'admin',       // Admin dashboard translations
    'metadata',    // For media metadata fields
    'validators'   // Form validation messages
  ],
  
  // Default namespace used if not specified
  defaultNS: 'common',
  
  // Use HTML for formatted strings
  react: {
    useSuspense: false,
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'p']
  },
  
  // Detect user language
  detection: {
    order: ['cookie', 'localStorage', 'navigator', 'path'],
    lookupCookie: 'autoani-locale',
    lookupLocalStorage: 'autoaniLocale',
    caches: ['cookie', 'localStorage']
  },
  
  // Interpolation configuration
  interpolation: {
    escapeValue: false, // React already safeguards from XSS
    format: function(value, format, lng) {
      // Custom formatter for dates, currencies, etc.
      if (format === 'uppercase') return value.toUpperCase();
      if (format === 'lowercase') return value.toLowerCase();
      if (format === 'capitalize') return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
      return value;
    }
  }
};

/**
 * Locale metadata with display information and text direction
 */
export interface LocaleInfo {
  code: string;
  name: string;
  flag: string;
  dir?: 'ltr' | 'rtl';
}

/**
 * Get locale information by code
 */
export function getLocaleInfo(code: string): LocaleInfo {
  return SUPPORTED_LOCALES.find(locale => locale.code === code) || 
    { code, name: code, flag: '🌐' };
}

/**
 * Get text direction for a locale
 */
export function getLocaleDirection(code: string): 'ltr' | 'rtl' {
  const locale = SUPPORTED_LOCALES.find(locale => locale.code === code);
  return locale?.dir || 'ltr';
}

/**
 * Format date according to locale
 */
export function formatLocalizedDate(
  date: Date | string,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(
    locale, 
    options || { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
  ).format(dateObj);
}

/**
 * Format number according to locale
 */
export function formatLocalizedNumber(
  number: number,
  locale: string,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(
    locale,
    options
  ).format(number);
}

/**
 * Format currency according to locale
 */
export function formatLocalizedCurrency(
  amount: number,
  locale: string,
  currency: string = 'USD'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount);
}
