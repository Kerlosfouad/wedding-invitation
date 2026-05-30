import type { TranslationValue } from '@/types';

const translations: Record<string, TranslationValue> = {
  // Envelope
  envelope_click: {
    ar: 'اضغط لفتح الدعوة',
    en: 'Click to open invitation',
  },
  envelope_invite: {
    ar: 'نحن نحب أن ندعوكم',
    en: 'We invite you to',
  },
  envelope_bismillah: {
    ar: 'بسم الله الرحمن الرحيم',
    en: 'In the name of Allah',
  },

  // Guest Gate
  gate_welcome: {
    ar: 'أهلاً بك في دعوتنا الخاصة',
    en: 'Welcome To Our Special Invitation',
  },
  gate_subtitle: {
    ar: 'أدخل اسمك لتفتح دعوتك',
    en: 'Enter your name to open your invitation',
  },
  gate_placeholder: {
    ar: 'أدخل اسمك',
    en: 'Enter Your Name',
  },
  gate_button: {
    ar: 'افتح دعوتك',
    en: 'Open Invitation',
  },

  // Navigation
  nav_initials: {
    ar: 'أ \u0026 س',
    en: 'A \u0026 S',
  },

  // Hero
  hero_bismillah: {
    ar: 'حفلة زفاف',
    en: 'Wedding Celebration',
  },
  hero_invite: {
    ar: 'بدعوة كريمة، وفرحة عظيمة، يسعدنا دعوتكم لحضور حفل زفافنا',
    en: 'With a generous invitation and great joy, we are pleased to invite you to our wedding celebration',
  },
  hero_groom: {
    ar: 'أحمد',
    en: 'Ahmed',
  },
  hero_bride: {
    ar: 'سارة',
    en: 'Sarah',
  },
  hero_date: {
    ar: 'الخميس، 15 يناير 2026',
    en: 'Thursday, January 15, 2026',
  },
  hero_location: {
    ar: 'فندق الفيصلية، الرياض',
    en: 'Al Faisaliah Hotel, Riyadh',
  },

  // Story
  story_names: {
    ar: 'أحمد \u0026 سارة',
    en: 'Ahmed \u0026 Sarah',
  },
  story_text: {
    ar: 'من لقاء صدفة إلى قصة حب، ومن قصة حب إلى وعد العمر. نحن أحمد وسارة، ونحن متحمسون لمشاركة هذه اللحظة السعيدة معكم.',
    en: 'From a chance meeting to a love story, and from a love story to a lifelong promise. We are Ahmed and Sarah, and we are thrilled to share this happy moment with you.',
  },

  // Timeline
  timeline_title: {
    ar: 'برنامج اليوم',
    en: 'Event Timeline',
  },
  timeline_reception_time: {
    ar: '6:00 مساءً',
    en: '6:00 PM',
  },
  timeline_reception_title: {
    ar: 'استقبال الضيوف',
    en: 'Guest Reception',
  },
  timeline_reception_desc: {
    ar: 'استقبال الضيوف والترحيب بهم',
    en: 'Welcoming and greeting the guests',
  },
  timeline_ceremony_time: {
    ar: '7:00 مساءً',
    en: '7:00 PM',
  },
  timeline_ceremony_title: {
    ar: 'بداية الحفل',
    en: 'Ceremony Start',
  },
  timeline_ceremony_desc: {
    ar: 'الخطبة والعقد والاحتفال الرسمي',
    en: 'The engagement, contract, and official celebration',
  },
  timeline_dinner_time: {
    ar: '8:30 مساءً',
    en: '8:30 PM',
  },
  timeline_dinner_title: {
    ar: 'العشاء',
    en: 'Dinner',
  },
  timeline_dinner_desc: {
    ar: 'عشاء فاخر مع أشهى المأكولات',
    en: 'A luxurious dinner with the finest cuisine',
  },
  timeline_photo_time: {
    ar: '9:30 مساءً',
    en: '9:30 PM',
  },
  timeline_photo_title: {
    ar: 'التصوير',
    en: 'Photography',
  },
  timeline_photo_desc: {
    ar: 'جلسة تصوير جماعية مع العروسين',
    en: 'Group photography session with the couple',
  },
  timeline_celebration_time: {
    ar: '10:00 مساءً',
    en: '10:00 PM',
  },
  timeline_celebration_title: {
    ar: 'الاحتفال',
    en: 'Celebration',
  },
  timeline_celebration_desc: {
    ar: 'الرقص والاحتفال حتى منتصف الليل',
    en: 'Dancing and celebrating until midnight',
  },

  // Countdown
  countdown_greeting: {
    ar: 'يسعدنا حضورك يا',
    en: 'We are delighted to have you,',
  },
  countdown_greeting_fallback: {
    ar: 'يسعدنا حضورك',
    en: 'We are delighted to have you',
  },
  countdown_label: {
    ar: 'متبقي على زفافنا',
    en: 'Countdown to our wedding',
  },
  countdown_days: {
    ar: 'أيام',
    en: 'Days',
  },
  countdown_hours: {
    ar: 'ساعات',
    en: 'Hours',
  },
  countdown_minutes: {
    ar: 'دقائق',
    en: 'Minutes',
  },
  countdown_seconds: {
    ar: 'ثواني',
    en: 'Seconds',
  },
  countdown_date: {
    ar: '15 يناير 2026',
    en: 'January 15, 2026',
  },

  // Location
  location_title: {
    ar: 'مكان الحفل',
    en: 'Venue Location',
  },
  location_hotel: {
    ar: 'فندق الفيصلية',
    en: 'Al Faisaliah Hotel',
  },
  location_address: {
    ar: 'برج الفيصلية، طريق الملك فهد، الرياض',
    en: 'Al Faisaliah Tower, King Fahd Road, Riyadh',
  },
  location_time: {
    ar: 'الخميس، 15 يناير 2026 - 6:00 مساءً',
    en: 'Thursday, January 15, 2026 - 6:00 PM',
  },
  location_maps: {
    ar: 'فتح في الخرائط',
    en: 'Open in Maps',
  },
  location_copy: {
    ar: 'نسخ العنوان',
    en: 'Copy Address',
  },
  location_copied: {
    ar: 'تم النسخ!',
    en: 'Copied!',
  },

  // Dress Code
  dress_title: {
    ar: 'الملابس',
    en: 'Dress Code',
  },
  dress_men: {
    ar: 'الرجال',
    en: 'Men',
  },
  dress_men_desc: {
    ar: 'ثوب أبيض نظيف مع بشت ذهبي أو أسود. يفضل اللون الأبيض والأسود.',
    en: 'Clean white thobe with gold or black bisht. White and black are preferred.',
  },
  dress_women: {
    ar: 'النساء',
    en: 'Women',
  },
  dress_women_desc: {
    ar: 'فستان سهرة أنيق بألوان داكنة أو ذهبية. يفضل البنفسجي والأحمر الداكن والذهبي.',
    en: 'Elegant evening gown in dark or gold colors. Purple, dark red, and gold are preferred.',
  },

  // Gallery
  gallery_title: {
    ar: 'معرض الصور',
    en: 'Photo Gallery',
  },

  // RSVP
  rsvp_title: {
    ar: 'تأكيد الحضور',
    en: 'RSVP',
  },
  rsvp_name: {
    ar: 'الاسم الكامل',
    en: 'Full Name',
  },
  rsvp_name_placeholder: {
    ar: 'أدخل اسمك الكامل',
    en: 'Enter your full name',
  },
  rsvp_attending: {
    ar: 'هل ستحضر؟',
    en: 'Will you attend?',
  },
  rsvp_yes: {
    ar: 'نعم، سأحضر',
    en: "Yes, I'll attend",
  },
  rsvp_no: {
    ar: 'لا، أعتذر',
    en: "No, I can't",
  },
  rsvp_guests: {
    ar: 'عدد الضيوف',
    en: 'Number of Guests',
  },
  rsvp_notes: {
    ar: 'ملاحظات',
    en: 'Notes',
  },
  rsvp_notes_placeholder: {
    ar: 'أي ملاحظات خاصة...',
    en: 'Any special notes...',
  },
  rsvp_submit: {
    ar: 'إرسال',
    en: 'Submit',
  },
  rsvp_thanks: {
    ar: 'شكراً لك!',
    en: 'Thank You!',
  },
  rsvp_thanks_msg: {
    ar: 'تم استلام ردك بنجاح. نتطلع لرؤيتك!',
    en: 'Your response has been received. We look forward to seeing you!',
  },

  // Thank You / Footer
  footer_thanks: {
    ar: 'شكراً لكم',
    en: 'Thank You',
  },
  footer_message: {
    ar: 'نقدر حبكم ومشاركتكم فرحتنا. نتمنى أن نراكم يوم زفافنا للاحتفال معاً!',
    en: 'We appreciate your love and sharing our joy. We hope to see you on our wedding day to celebrate together!',
  },
  footer_signature: {
    ar: 'مع حب، أحمد وسارة',
    en: 'With love, Ahmed \u0026 Sarah',
  },
  footer_brand: {
    ar: 'Powered by Marhaba',
    en: 'Powered by Marhaba',
  },
};

export default translations;
