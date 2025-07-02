
import { useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translationManager, TranslationKey } from '@/lib/translations/translationManager';

export function useTranslation() {
  const { language } = useLanguage();

  const t = useCallback((key: TranslationKey): string => {
    translationManager.setLanguage(language);
    return translationManager.translate(key);
  }, [language]);

  const tWithFallback = useCallback((text: string): string => {
    return translationManager.translateWithFallback(text, language);
  }, [language]);

  return { t, tWithFallback, language };
}
