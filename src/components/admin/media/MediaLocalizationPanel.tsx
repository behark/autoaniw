'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { Button } from '@/components/ui/design-system/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/design-system/Tabs';
import { FaGlobe, FaPlus, FaCheck, FaTimes, FaLanguage, FaGlobeAmericas, FaRobot } from 'react-icons/fa';
import { SUPPORTED_LOCALES, LocaleInfo, DEFAULT_LOCALE } from '@/i18n/config';
import { MediaItem } from '@/types/media';

interface MediaLocalizedMetadata {
  title: string;
  altText: string;
  description: string;
}

interface MediaLocalizationMap {
  [locale: string]: MediaLocalizedMetadata;
}

interface MediaLocalizationPanelProps {
  media: MediaItem;
  onSave: (mediaId: string, localizations: MediaLocalizationMap) => Promise<void>;
  onCancel: () => void;
}

export default function MediaLocalizationPanel({ 
  media, 
  onSave, 
  onCancel 
}: MediaLocalizationPanelProps) {
  const { t, i18n } = useTranslation('media');
  const [activeLocale, setActiveLocale] = useState<string>(DEFAULT_LOCALE);
  const [localizations, setLocalizations] = useState<MediaLocalizationMap>({});
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isGeneratingTranslations, setIsGeneratingTranslations] = useState<boolean>(false);
  const [selectedLocales, setSelectedLocales] = useState<string[]>([]);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  // Initialize with any existing localizations from the media
  useEffect(() => {
    if (media?.localizations) {
      setLocalizations(media.localizations);
    } else {
      // Initialize with default locale data
      setLocalizations({
        [DEFAULT_LOCALE]: {
          title: media?.name || '',
          altText: media?.alt || '',
          description: media?.description || ''
        }
      });
    }
  }, [media]);
  
  // Function to update localization for specific locale and field
  const updateLocalization = (
    locale: string,
    field: keyof MediaLocalizedMetadata,
    value: string
  ) => {
    setLocalizations(prev => ({
      ...prev,
      [locale]: {
        ...(prev[locale] || { title: '', altText: '', description: '' }),
        [field]: value
      }
    }));
  };
  
  // Function to toggle locale selection
  const toggleLocaleSelection = (locale: string) => {
    setSelectedLocales(prev => 
      prev.includes(locale)
        ? prev.filter(l => l !== locale)
        : [...prev, locale]
    );
  };
  
  // Function to automatically generate translations for selected locales
  const generateTranslations = async () => {
    if (selectedLocales.length === 0) return;
    
    setIsGeneratingTranslations(true);
    
    try {
      // In a real implementation, this would call an API to generate translations
      // Here we simulate the API call with a timeout and random data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const sourceData = localizations[DEFAULT_LOCALE];
      
      // Create mock translations for demo purposes
      const newLocalizations = { ...localizations };
      
      for (const locale of selectedLocales) {
        if (locale === DEFAULT_LOCALE) continue;
        
        // Create a simulated translation with a prefix indicating the language
        const localeInfo = SUPPORTED_LOCALES.find(l => l.code === locale);
        const prefix = localeInfo?.flag || '';
        
        newLocalizations[locale] = {
          title: `${prefix} ${sourceData.title}`,
          altText: `${prefix} ${sourceData.altText}`,
          description: `${prefix} ${sourceData.description}`
        };
      }
      
      setLocalizations(newLocalizations);
    } catch (error) {
      console.error('Error generating translations:', error);
      setSaveError('Failed to generate translations');
    } finally {
      setIsGeneratingTranslations(false);
    }
  };
  
  // Function to handle saving all localizations
  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    
    try {
      await onSave(media.id, localizations);
      onCancel(); // Close the panel after successful save
    } catch (error) {
      console.error('Error saving localizations:', error);
      setSaveError('Failed to save localizations');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Calculate completion status for each locale
  const getLocaleCompletionStatus = (locale: string): 'complete' | 'incomplete' | 'notTranslated' => {
    const localeData = localizations[locale];
    if (!localeData) return 'notTranslated';
    
    const hasTitle = !!localeData.title?.trim();
    const hasAltText = !!localeData.altText?.trim();
    const hasDescription = !!localeData.description?.trim();
    
    if (hasTitle && hasAltText && hasDescription) return 'complete';
    if (hasTitle || hasAltText || hasDescription) return 'incomplete';
    return 'notTranslated';
  };
  
  // Status indicator component for each locale
  const LocaleStatusIndicator = ({ status }: { status: 'complete' | 'incomplete' | 'notTranslated' }) => {
    if (status === 'complete') {
      return <span className="inline-flex items-center text-success-600"><FaCheck className="mr-1" size={12} /> {t('localization.completeStatus')}</span>;
    } else if (status === 'incomplete') {
      return <span className="inline-flex items-center text-warning-500"><FaLanguage className="mr-1" size={12} /> {t('localization.incompleteStatus')}</span>;
    }
    return <span className="inline-flex items-center text-text-secondary"><FaTimes className="mr-1" size={12} /> {t('localization.notTranslated')}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          <FaGlobe className="inline-block mr-2" />
          {t('localization.title')}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isSaving}
          >
            {t('manager.actions.cancel')}
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? t('manager.actions.saving') : t('manager.actions.save')}
          </Button>
        </div>
      </div>
      
      {saveError && (
        <div className="p-3 bg-error-50 border border-error-200 text-error-700 rounded-md">
          {saveError}
        </div>
      )}
      
      <div className="flex">
        <div className="w-64 border-r border-border-default pr-4">
          <div className="mb-4">
            <h4 className="font-medium mb-2">{t('localization.defaultLanguage')}</h4>
            <div className="flex items-center p-2 bg-bg-subtle rounded-md">
              {SUPPORTED_LOCALES.find(locale => locale.code === DEFAULT_LOCALE)?.flag || '🌐'} 
              {SUPPORTED_LOCALES.find(locale => locale.code === DEFAULT_LOCALE)?.name || 'English'}
            </div>
          </div>
          
          <h4 className="font-medium mb-2">{t('localization.translationStatus')}</h4>
          <ul className="space-y-2">
            {SUPPORTED_LOCALES.map(locale => (
              <li 
                key={locale.code}
                className={`p-2 rounded-md cursor-pointer flex items-center justify-between ${activeLocale === locale.code ? 'bg-bg-subtle' : 'hover:bg-bg-muted'}`}
                onClick={() => setActiveLocale(locale.code)}
              >
                <div className="flex items-center">
                  <span className="mr-2">{locale.flag}</span>
                  <span>{locale.name}</span>
                </div>
                <LocaleStatusIndicator status={getLocaleCompletionStatus(locale.code)} />
              </li>
            ))}
          </ul>
          
          <div className="mt-6">
            <h4 className="font-medium mb-2">{t('localization.generateTranslations')}</h4>
            <div className="p-3 border border-border-default rounded-md space-y-3">
              <p className="text-sm text-text-secondary">
                Select languages to auto-generate translations
              </p>
              
              <div className="max-h-40 overflow-y-auto">
                {SUPPORTED_LOCALES.filter(locale => locale.code !== DEFAULT_LOCALE).map(locale => (
                  <div key={locale.code} className="flex items-center p-1">
                    <input
                      type="checkbox"
                      id={`select-${locale.code}`}
                      checked={selectedLocales.includes(locale.code)}
                      onChange={() => toggleLocaleSelection(locale.code)}
                      className="mr-2"
                    />
                    <label htmlFor={`select-${locale.code}`} className="flex items-center cursor-pointer">
                      <span className="mr-1">{locale.flag}</span>
                      <span>{locale.name}</span>
                    </label>
                  </div>
                ))}
              </div>
              
              <Button
                variant="secondary"
                className="w-full"
                onClick={generateTranslations}
                disabled={isGeneratingTranslations || selectedLocales.length === 0}
              >
                <FaRobot className="mr-1" />
                {isGeneratingTranslations ? 'Generating...' : 'Generate Translations'}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 pl-6">
          <div className="mb-4 flex items-center">
            <span className="text-lg font-medium mr-2">
              {SUPPORTED_LOCALES.find(locale => locale.code === activeLocale)?.flag || '🌐'} 
              {SUPPORTED_LOCALES.find(locale => locale.code === activeLocale)?.name || 'Unknown'}
            </span>
            {activeLocale !== DEFAULT_LOCALE && (
              <span className="text-sm text-text-secondary ml-2">
                (Translating from {SUPPORTED_LOCALES.find(locale => locale.code === DEFAULT_LOCALE)?.name})
              </span>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">
                {t('metadata.fields.title')}
                {activeLocale === DEFAULT_LOCALE && <span className="text-error-500 ml-1">*</span>}
              </label>
              <input
                type="text"
                value={localizations[activeLocale]?.title || ''}
                onChange={(e) => updateLocalization(activeLocale, 'title', e.target.value)}
                className="w-full border border-border-default rounded-md px-4 py-2"
                placeholder={t('metadata.placeholders.title')}
              />
            </div>
            
            <div>
              <label className="block font-medium mb-1">
                {t('metadata.fields.altText')}
                {activeLocale === DEFAULT_LOCALE && <span className="text-error-500 ml-1">*</span>}
              </label>
              <input
                type="text"
                value={localizations[activeLocale]?.altText || ''}
                onChange={(e) => updateLocalization(activeLocale, 'altText', e.target.value)}
                className="w-full border border-border-default rounded-md px-4 py-2"
                placeholder={t('metadata.placeholders.altText')}
              />
              <p className="text-xs text-text-secondary mt-1">
                {t('metadata.tooltips.altText')}
              </p>
            </div>
            
            <div>
              <label className="block font-medium mb-1">
                {t('metadata.fields.description')}
              </label>
              <textarea
                value={localizations[activeLocale]?.description || ''}
                onChange={(e) => updateLocalization(activeLocale, 'description', e.target.value)}
                className="w-full border border-border-default rounded-md px-4 py-2 h-32"
                placeholder={t('metadata.placeholders.description')}
              />
            </div>
            
            {activeLocale !== DEFAULT_LOCALE && (
              <div className="p-3 bg-bg-subtle rounded-md text-sm">
                <p className="flex items-center text-text-secondary">
                  <FaGlobeAmericas className="mr-2" />
                  Localized metadata helps improve international SEO and accessibility for your media across different languages.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
