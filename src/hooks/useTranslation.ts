import { useCallback } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import translations from '@/translations';

export function useTranslation() {
  const locale = useAppStore((s) => s.locale);

  const t = useCallback(
    (key: string): string => {
      const translation = translations[key];
      if (!translation) {
        console.warn(`Missing translation: ${key}`);
        return key;
      }
      return translation[locale];
    },
    [locale]
  );

  return { t, locale };
}
