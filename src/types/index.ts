export type Locale = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';
export type AppPhase = 'envelope' | 'gate' | 'invitation';

export interface TranslationValue {
  ar: string;
  en: string;
}

export interface TimelineEvent {
  time: TranslationValue;
  title: TranslationValue;
  description: TranslationValue;
  icon: string;
  position: 'left' | 'right';
}

export interface GalleryImage {
  src: string;
  alt: TranslationValue;
  span: 'tall' | 'normal';
}

export interface RSVPData {
  name: string;
  attending: boolean | null;
  guestCount: number;
  notes: string;
}
