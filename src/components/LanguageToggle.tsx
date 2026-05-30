import { useAppStore } from '@/stores/useAppStore';

export default function LanguageToggle() {
  const { locale, toggleLocale } = useAppStore();

  return (
    <button
      onClick={toggleLocale}
      className={`
        w-10 h-10 rounded-full
        border border-gold
        flex items-center justify-center
        text-gold text-sm font-medium
        transition-all duration-300
        hover:bg-gold/10
      `}
      aria-label={`Switch to ${locale === 'ar' ? 'English' : 'Arabic'}`}
    >
      {locale === 'ar' ? 'EN' : 'AR'}
    </button>
  );
}
