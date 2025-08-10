import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SupportedLanguage = 'en' | 'ta' | 'hi' | 'bn' | 'te' | 'mr' | 'gu' | 'kn' | 'ml';

export interface LanguageTexts {
  // Navigation/Sidebar
  dashboard: string;
  lordKrishna: string;
  srilaPrabhupada: string;
  audios: string;
  articles: string;
  vaishnavaCalendar: string;
  books: string;
  chantHareKrishna: string;
  contacts: string;
  freeMembership: string;
  richTextDemo: string;
  settings: string;
  
  // Common UI Elements
  search: string;
  menu: string;
  home: string;
  back: string;
  save: string;
  cancel: string;
  ok: string;
  yes: string;
  no: string;
  loading: string;
  error: string;
  success: string;
  
  // Settings Page
  settingsTitle: string;
  theme: string;
  language: string;
  display: string;
  chooseTheme: string;
  chooseLanguage: string;
  themeDescription: string;
  languageDescription: string;
  
  // Dashboard
  welcome: string;
  recentActivities: string;
  quickActions: string;
  exploreWisdom: string;
  
  // Hero Section
  chantWelcomeTitle: string;
  heroMainTitle: string;
  heroSubtitle1: string;
  heroSubtitle2: string;
  joinCommunityButton: string;
  signInButton: string;
  
  // Premium Features
  exclusiveFeatures: string;
  devoteeCommunity: string;
  devoteeCommunityDesc: string;
  joinCommunityAction: string;
  premiumContent: string;
  premiumContentDesc: string;
  explorePremiumAction: string;
  adminDashboard: string;
  adminDashboardDesc: string;
  adminPanelAction: string;
  
  // Community Section
  connectAndGrow: string;
  contactUs: string;
  contactUsDesc: string;
  membershipTitle: string;
  membershipDesc: string;
  customizeExperience: string;
  customizeExperienceDesc: string;
  
  // Footer
  footerQuote: string;
  footerQuoteAuthor: string;
  
  // Chant Section
  chantInstruction: string;
  chantPlayingMessage: string;
  hareKrishnaMantra: string;
  hareRamaMantra: string;
  
  // Feature Cards
  sacredAudios: string;
  spiritualArticles: string;
  spiritualTutorials: string;
  
  // Authentication
  login: string;
  logout: string;
  username: string;
  password: string;
  
  // Page Titles
  dashboardTitle: string;
  articlesTitle: string;
  krishnaPageTitle: string;
  srilaPrabhupadaTitle: string;
  audiosTitle: string;
  vaishnavaCalendarTitle: string;
  booksTitle: string;
  contactsTitle: string;
  freeMembershipTitle: string;
  richTextDemoTitle: string;
  settingsPageTitle: string;
  loginPageTitle: string;
  registerPageTitle: string;
  
  // Krishna Page Categories
  categoryArati: string;
  categoryHareKrishnaKirtan: string;
  categoryStories: string;
  categoryPhilosophy: string;
  categoryDiscussion: string;
  categoryImages: string;
  categoryVideos: string;
  
  // Audio Component
  musicGallery: string;
  discoverSacredSounds: string;
  immersiveAudioDescription: string;
  audioCategories: string;
  featuredAudio: string;
  premiumAudioExperience: string;
  highQualityAudioDescription: string;
  
  // Articles Component Categories
  articlesCategoryHow: string;
  articlesCategoryWhy: string;
  articlesCategoryWhen: string;
  articlesCategoryWho: string;
  articlesCategoryWhere: string;
  articlesCategoryWhat: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<SupportedLanguage>('en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();
  
  private textsSubject = new BehaviorSubject<LanguageTexts>({} as LanguageTexts);
  public texts$ = this.textsSubject.asObservable();

  private languageTexts!: Record<SupportedLanguage, LanguageTexts>;

  constructor() {
    // Initialize language texts
    this.initializeLanguageTexts();
    
    // Set initial texts to English
    this.textsSubject.next(this.getEnglishTexts());
    
    // Load saved language from localStorage or default to English
    const savedLanguage = localStorage.getItem('selectedLanguage') as SupportedLanguage;
    if (savedLanguage && this.isValidLanguage(savedLanguage)) {
      this.setLanguage(savedLanguage);
    }
  }

  private initializeLanguageTexts(): void {
    this.languageTexts = {
      en: this.getEnglishTexts(),
      ta: this.getTamilTexts(),
      hi: this.getHindiTexts(),
      bn: this.getBengaliTexts(),
      te: this.getTeluguTexts(),
      mr: this.getMarathiTexts(),
      gu: this.getGujaratiTexts(),
      kn: this.getKannadaTexts(),
      ml: this.getMalayalamTexts()
    };
  }

  private getEnglishTexts(): LanguageTexts {
    return {
      // Navigation/Sidebar
      dashboard: 'Dashboard',
      lordKrishna: 'Lord Sri Krishna',
      srilaPrabhupada: 'Srila Prabhupada',
      audios: 'Audios',
      articles: 'Articles',
      vaishnavaCalendar: 'Vaishnava Calendar',
      books: 'Books',
      chantHareKrishna: 'Chant Hare Krishna',
      contacts: 'Contacts',
      freeMembership: 'Free Membership',
      richTextDemo: 'Rich Text Demo',
      settings: 'Settings',
      
      // Common UI Elements
      search: 'Search',
      menu: 'Menu',
      home: 'Home',
      back: 'Back',
      save: 'Save',
      cancel: 'Cancel',
      ok: 'OK',
      yes: 'Yes',
      no: 'No',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      
      // Settings Page
      settingsTitle: 'SETTINGS',
      theme: 'Theme',
      language: 'Language',
      display: 'Display',
      chooseTheme: 'Choose your preferred theme',
      chooseLanguage: 'Choose language',
      themeDescription: 'Changes will be applied immediately across the app',
      languageDescription: 'Changes will be applied after restarting the app',
      
      // Dashboard
      welcome: 'Welcome',
      recentActivities: 'Recent Activities',
      quickActions: 'Quick Actions',
      exploreWisdom: 'Explore Sacred Wisdom',
      
      // Hero Section
      chantWelcomeTitle: '✨ Welcome! Chant and Be Happy ✨',
      heroMainTitle: 'Welcome to Transcendental Journey',
      heroSubtitle1: 'Discover the timeless wisdom of Lord Krishna and revive your Krishna consciousness',
      heroSubtitle2: 'Continue your spiritual journey with personalized contents',
      joinCommunityButton: 'Join Our Spiritual Community',
      signInButton: 'Sign In to Your Account',
      
      // Premium Features
      exclusiveFeatures: 'Your Exclusive Features',
      devoteeCommunity: 'Devotee Community',
      devoteeCommunityDesc: 'Connect with fellow devotees, share experiences, and grow together in Krishna consciousness.',
      joinCommunityAction: 'Join Community',
      premiumContent: 'Premium Content',
      premiumContentDesc: 'Access exclusive lectures, rare recordings, and advanced spiritual courses from renowned teachers.',
      explorePremiumAction: 'Explore Premium',
      adminDashboard: 'Admin Dashboard',
      adminDashboardDesc: 'Manage users, content, and oversee the spiritual community with powerful admin tools.',
      adminPanelAction: 'Admin Panel',
      
      // Community Section
      connectAndGrow: 'Connect & Grow',
      contactUs: 'Contact Us',
      contactUsDesc: 'Get in touch with our spiritual advisors and community leaders for guidance.',
      membershipTitle: 'Free Membership',
      membershipDesc: 'Join our spiritual family and unlock additional features and content.',
      customizeExperience: 'Customize Experience',
      customizeExperienceDesc: 'Personalize your spiritual journey with custom themes and preferences.',
      
      // Footer
      footerQuote: 'The ultimate goal of life is to go back to Godhead, back to Krishna, and live eternally in bliss and knowledge.',
      footerQuoteAuthor: 'A.C. Bhaktivedanta Swami Prabhupada',
      
      // Chant Section
      chantInstruction: 'Tap the mantras above to hear Srila Prabhupada chanting',
      chantPlayingMessage: '🕉️ Sacred mantra is playing... Listen with devotion 🕉️',
      hareKrishnaMantra: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare',
      hareRamaMantra: 'Hare Rama Hare Rama Rama Rama Hare Hare',
      
      // Feature Cards
      sacredAudios: 'Sacred Audios',
      spiritualArticles: 'Spiritual Articles',
      spiritualTutorials: 'Spiritual Tutorials',
      
      // Authentication
      login: 'Login',
      logout: 'Logout',
      username: 'Username',
      password: 'Password',
      
      // Page Titles
      dashboardTitle: 'Dashboard',
      articlesTitle: 'Articles & Blogs',
      krishnaPageTitle: 'Chant Hare Krishna',
      srilaPrabhupadaTitle: 'Srila Prabhupada',
      audiosTitle: 'Sacred Audios',
      vaishnavaCalendarTitle: 'Vaishnava Calendar',
      booksTitle: 'Sacred Books',
      contactsTitle: 'Contact Us',
      freeMembershipTitle: 'Free Membership',
      richTextDemoTitle: 'Rich Text Demo',
      settingsPageTitle: 'Settings',
      loginPageTitle: 'Sign In',
      registerPageTitle: 'Join Community',
      
      // Krishna Page Categories
      categoryArati: 'Arati',
      categoryHareKrishnaKirtan: 'Hare Krishna Kirtan',
      categoryStories: 'Stories',
      categoryPhilosophy: 'Philosophy',
      categoryDiscussion: 'Discussion',
      categoryImages: 'Images',
      categoryVideos: 'Videos',
      
      // Audio Component
      musicGallery: 'Music Gallery',
      discoverSacredSounds: 'Discover Sacred Sounds',
      immersiveAudioDescription: 'Immerse yourself in divine melodies and spiritual audio content',
      audioCategories: 'Audio Categories',
      featuredAudio: 'Featured Audio',
      premiumAudioExperience: 'Premium Audio Experience',
      highQualityAudioDescription: 'High-quality spiritual audio content curated for your journey',
      
      // Articles Component Categories
      articlesCategoryHow: 'How to...?',
      articlesCategoryWhy: 'Why...?',
      articlesCategoryWhen: 'When...?',
      articlesCategoryWho: 'Who...?',
      articlesCategoryWhere: 'Where...?',
      articlesCategoryWhat: 'What...?'
    };
  }

  private getTamilTexts(): LanguageTexts {
    return {
      // Navigation/Sidebar
      dashboard: 'டாஷ்போர்டு',
      lordKrishna: 'ஸ்ரீ கிருஷ்ணர்',
      srilaPrabhupada: 'ஸ்ரீல பிரபுபாதர்',
      audios: 'ஆடியோக்கள்',
      articles: 'கட்டுரைகள்',
      vaishnavaCalendar: 'வைஷ்ணவ நாட்காட்டி',
      books: 'புத்தகங்கள்',
      chantHareKrishna: 'ஹரே கிருஷ்ணா ஜபம்',
      contacts: 'தொடர்புகள்',
      freeMembership: 'இலவச உறுப்பினர்',
      richTextDemo: 'ரிச் டெக்ஸ்ட் டெமோ',
      settings: 'அமைப்புகள்',
      
      // Common UI Elements
      search: 'தேடல்',
      menu: 'மெனு',
      home: 'முகப்பு',
      back: 'பின்',
      save: 'சேமி',
      cancel: 'ரத்து',
      ok: 'சரி',
      yes: 'ஆம்',
      no: 'இல்லை',
      loading: 'ஏற்றுகிறது...',
      error: 'பிழை',
      success: 'வெற்றி',
      
      // Settings Page
      settingsTitle: 'அமைப்புகள்',
      theme: 'தீம்',
      language: 'மொழி',
      display: 'காட்சி',
      chooseTheme: 'உங்கள் விருப்பமான தீம் தேர்ந்தெடுக்கவும்',
      chooseLanguage: 'மொழி தேர்ந்தெடுக்கவும்',
      themeDescription: 'மாற்றங்கள் உடனடியாக ஆப் முழுவதும் பயன்படுத்தப்படும்',
      languageDescription: 'ஆப்பை மீண்டும் தொடங்கிய பிறகு மாற்றங்கள் பயன்படுத்தப்படும்',
      
      // Dashboard
      welcome: 'வரவேற்கிறோம்',
      recentActivities: 'சமீபத்திய செயல்பாடுகள்',
      quickActions: 'விரைவு செயல்கள்',
      exploreWisdom: 'புனித ஞானத்தை ஆராயுங்கள்',
      
      // Hero Section
      chantWelcomeTitle: '✨ வரவேற்கிறோம்! ஜபியுங்கள் மற்றும் மகிழ்ச்சியாக இருங்கள் ✨',
      heroMainTitle: 'ஆன்மீக பயணத்திற்கு வரவேற்கிறோம்',
      heroSubtitle1: 'பகவான் கிருஷ்ணரின் நித்ய ஞானத்தை கண்டறிந்து உங்கள் கிருஷ்ண சைதன்யத்தை புதுப்பிக்கவும்',
      heroSubtitle2: 'தனிப்பட்ட உள்ளடக்கங்களுடன் உங்கள் ஆன்மீக பயணத்தை தொடருங்கள்',
      joinCommunityButton: 'எங்கள் ஆன்மீக சமூகத்தில் சேருங்கள்',
      signInButton: 'உங்கள் கணக்கில் உள்நுழைக',
      
      // Premium Features
      exclusiveFeatures: 'உங்கள் பிரத்தியேக அம்சங்கள்',
      devoteeCommunity: 'பக்தர் சமூகம்',
      devoteeCommunityDesc: 'சக பக்தர்களுடன் இணைக்கவும், அனுபவங்களை பகிர்ந்து கொள்ளவும், கிருஷ்ண சைதன்யத்தில் ஒன்றாக வளரவும்.',
      joinCommunityAction: 'சமூகத்தில் சேர',
      premiumContent: 'பிரீமியம் உள்ளடக்கம்',
      premiumContentDesc: 'புகழ்பெற்ற ஆசிரியர்களின் பிரத்தியேக விரிவுரைகள், அரிய பதிவுகள் மற்றும் மேம்பட்ட ஆன்மீக பாடங்களை அணுகவும்.',
      explorePremiumAction: 'பிரீமியம் அம்சங்களை ஆராயுங்கள்',
      adminDashboard: 'நிர்வாக டாஷ்போர்டு',
      adminDashboardDesc: 'சக்திவாய்ந்த நிர்வாக கருவிகளுடன் பயனர்கள், உள்ளடக்கம் மற்றும் ஆன்மீக சமூகத்தை நிர்வகிக்கவும்.',
      adminPanelAction: 'நிர்வாக பேனல்',
      
      // Community Section
      connectAndGrow: 'இணைக்கவும் & வளரவும்',
      contactUs: 'எங்களை தொடர்பு கொள்ளுங்கள்',
      contactUsDesc: 'வழிகாட்டுதலுக்காக எங்கள் ஆன்மீக ஆலோசகர்கள் மற்றும் சமூக தலைவர்களுடன் தொடர்பு கொள்ளுங்கள்.',
      membershipTitle: 'இலவச உறுப்பினர்',
      membershipDesc: 'எங்கள் ஆன்மீக குடும்பத்தில் சேர்ந்து கூடுதல் அம்சங்கள் மற்றும் உள்ளடக்கத்தை திறக்கவும்.',
      customizeExperience: 'அனுபவத்தை தனிப்பயனாக்கவும்',
      customizeExperienceDesc: 'தனிப்பயன் தீம்கள் மற்றும் விருப்பங்களுடன் உங்கள் ஆன்மீக பயணத்தை தனிப்பயனாக்கவும்.',
      
      // Footer
      footerQuote: 'வாழ்க்கையின் இறுதி இலக்கு கடவுளிடம் திரும்பி செல்வது, கிருஷ்ணரிடம் திரும்பி செல்வது மற்றும் ஆனந்தம் மற்றும் ஞானத்தில் நித்யமாக வாழ்வது.',
      footerQuoteAuthor: 'ஏ.சி. பக்திவேதாந்த ஸ்வாமி பிரபுபாதர்',
      
      // Chant Section
      chantInstruction: 'ஸ்ரீல பிரபுபாதரின் ஜபத்தை கேட்க மேலே உள்ள மந்திரங்களை தொடவும்',
      chantPlayingMessage: '🕉️ புனித மந்திரம் ஒலிக்கிறது... பக்தியுடன் கேளுங்கள் 🕉️',
      hareKrishnaMantra: 'ஹரே கிருஷ்ணா ஹரே கிருஷ்ணா கிருஷ்ணா கிருஷ்ணா ஹரே ஹரே',
      hareRamaMantra: 'ஹரே ராமா ஹரே ராமா ராமா ராமா ஹரே ஹரே',
      
      // Feature Cards
      sacredAudios: 'புனித ஆடியோக்கள்',
      spiritualArticles: 'ஆன்மீக கட்டுரைகள்',
      spiritualTutorials: 'ஆன்மீக பயிற்சி',
      
      // Authentication
      login: 'உள்நுழை',
      logout: 'வெளியேறு',
      username: 'பயனர் பெயர்',
      password: 'கடவுச்சொல்',
      
      // Page Titles
      dashboardTitle: 'டாஷ்போர்டு',
      articlesTitle: 'கட்டுரைகள் & வலைப்பதிவுகள்',
      krishnaPageTitle: 'ஹரே கிருஷ்ணா ஜபம்',
      srilaPrabhupadaTitle: 'ஸ்ரீல பிரபுபாதர்',
      audiosTitle: 'புனித ஆடியோக்கள்',
      vaishnavaCalendarTitle: 'வைஷ்ணவ நாட்காட்டி',
      booksTitle: 'புனித நூல்கள்',
      contactsTitle: 'எங்களை தொடர்பு கொள்ளுங்கள்',
      freeMembershipTitle: 'இலவச உறுப்பினர்',
      richTextDemoTitle: 'ரிச் டெக்ஸ்ட் டெமோ',
      settingsPageTitle: 'அமைப்புகள்',
      loginPageTitle: 'உள்நுழைக',
      registerPageTitle: 'சமூகத்தில் சேருங்கள்',
      
      // Krishna Page Categories
      categoryArati: 'ஆரத்தி',
      categoryHareKrishnaKirtan: 'ஹரே கிருஷ்ணா கீர்த்தன்',
      categoryStories: 'கதைகள்',
      categoryPhilosophy: 'தத்துவம்',
      categoryDiscussion: 'விவாதம்',
      categoryImages: 'படங்கள்',
      categoryVideos: 'வீடியோக்கள்',
      
      // Audio Component
      musicGallery: 'இசை கேலரி',
      discoverSacredSounds: 'புனித ஒலிகளை கண்டறியுங்கள்',
      immersiveAudioDescription: 'தெய்வீக இசை மற்றும் ஆன்மீக ஆடியோ உள்ளடக்கத்தில் மூழ்குங்கள்',
      audioCategories: 'ஆடியோ வகைகள்',
      featuredAudio: 'சிறப்பு ஆடியோ',
      premiumAudioExperience: 'பிரீமியம் ஆடியோ அனுபவம்',
      highQualityAudioDescription: 'உங்கள் பயணத்திற்காக தேர்ந்தெடுக்கப்பட்ட உயர்தர ஆன்மீக ஆடியோ உள்ளடக்கம்',
      
      // Articles Component Categories
      articlesCategoryHow: 'எப்படி...?',
      articlesCategoryWhy: 'ஏன்...?',
      articlesCategoryWhen: 'எப்போது...?',
      articlesCategoryWho: 'யார்...?',
      articlesCategoryWhere: 'எங்கே...?',
      articlesCategoryWhat: 'என்ன...?'
    };
  }

  private getHindiTexts(): LanguageTexts {
    return {
      // Navigation/Sidebar
      dashboard: 'डैशबोर्ड',
      lordKrishna: 'भगवान श्री कृष्ण',
      srilaPrabhupada: 'श्रील प्रभुपाद',
      audios: 'ऑडियो',
      articles: 'लेख',
      vaishnavaCalendar: 'वैष्णव कैलेंडर',
      books: 'पुस्तकें',
      chantHareKrishna: 'हरे कृष्ण जाप',
      contacts: 'संपर्क',
      freeMembership: 'मुफ्त सदस्यता',
      richTextDemo: 'रिच टेक्स्ट डेमो',
      settings: 'सेटिंग्स',
      
      // Common UI Elements
      search: 'खोजें',
      menu: 'मेनू',
      home: 'होम',
      back: 'वापस',
      save: 'सेव',
      cancel: 'रद्द',
      ok: 'ठीक',
      yes: 'हां',
      no: 'नहीं',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
      
      // Settings Page
      settingsTitle: 'सेटिंग्स',
      theme: 'थीम',
      language: 'भाषा',
      display: 'डिस्प्ले',
      chooseTheme: 'अपनी पसंदीदा थीम चुनें',
      chooseLanguage: 'भाषा चुनें',
      themeDescription: 'परिवर्तन तुरंत पूरे ऐप में लागू होंगे',
      languageDescription: 'ऐप को फिर से शुरू करने के बाद परिवर्तन लागू होंगे',
      
      // Dashboard
      welcome: 'स्वागत',
      recentActivities: 'हाल की गतिविधियां',
      quickActions: 'त्वरित कार्य',
      exploreWisdom: 'पवित्र ज्ञान का अन्वेषण करें',
      
      // Hero Section
      chantWelcomeTitle: '✨ स्वागत! जाप करें और खुश रहें ✨',
      heroMainTitle: 'पारलौकिक यात्रा में आपका स्वागत है',
      heroSubtitle1: 'भगवान कृष्ण की शाश्वत बुद्धि की खोज करें और अपनी कृष्ण चेतना को पुनर्जीवित करें',
      heroSubtitle2: 'व्यक्तिगत सामग्री के साथ अपनी आध्यात्मिक यात्रा जारी रखें',
      joinCommunityButton: 'हमारे आध्यात्मिक समुदाय में शामिल हों',
      signInButton: 'अपने खाते में साइन इन करें',
      
      // Premium Features
      exclusiveFeatures: 'आपकी विशेष सुविधाएं',
      devoteeCommunity: 'भक्त समुदाय',
      devoteeCommunityDesc: 'साथी भक्तों से जुड़ें, अनुभव साझा करें, और कृष्ण चेतना में एक साथ बढ़ें।',
      joinCommunityAction: 'समुदाय में शामिल हों',
      premiumContent: 'प्रीमियम सामग्री',
      premiumContentDesc: 'प्रसिद्ध शिक्षकों से विशेष व्याख्यान, दुर्लभ रिकॉर्डिंग और उन्नत आध्यात्मिक पाठ्यक्रमों तक पहुंच।',
      explorePremiumAction: 'प्रीमियम का अन्वेषण करें',
      adminDashboard: 'एडमिन डैशबोर्ड',
      adminDashboardDesc: 'शक्तिशाली एडमिन टूल्स के साथ उपयोगकर्ताओं, सामग्री और आध्यात्मिक समुदाय का प्रबंधन करें।',
      adminPanelAction: 'एडमिन पैनल',
      
      // Community Section
      connectAndGrow: 'जुड़ें और बढ़ें',
      contactUs: 'हमसे संपर्क करें',
      contactUsDesc: 'मार्गदर्शन के लिए हमारे आध्यात्मिक सलाहकारों और समुदायिक नेताओं से संपर्क करें।',
      membershipTitle: 'मुफ्त सदस्यता',
      membershipDesc: 'हमारे आध्यात्मिक परिवार में शामिल हों और अतिरिक्त सुविधाओं और सामग्री को अनलॉक करें।',
      customizeExperience: 'अनुभव को अनुकूलित करें',
      customizeExperienceDesc: 'कस्टम थीम और प्राथमिकताओं के साथ अपनी आध्यात्मिक यात्रा को व्यक्तिगत बनाएं।',
      
      // Footer
      footerQuote: 'जीवन का अंतिम लक्ष्य भगवान के पास वापस जाना, कृष्ण के पास वापस जाना और आनंद और ज्ञान में शाश्वत रूप से जीना है।',
      footerQuoteAuthor: 'ए.सी. भक्तिवेदांत स्वामी प्रभुपाद',
      
      // Chant Section
      chantInstruction: 'श्रील प्रभुपाद का जाप सुनने के लिए ऊपर के मंत्रों को स्पर्श करें',
      chantPlayingMessage: '🕉️ पवित्र मंत्र बज रहा है... भक्ति के साथ सुनें 🕉️',
      hareKrishnaMantra: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे',
      hareRamaMantra: 'हरे राम हरे राम राम राम हरे हरे',
      
      // Feature Cards
      sacredAudios: 'पवित्र ऑडियो',
      spiritualArticles: 'आध्यात्मिक लेख',
      spiritualTutorials: 'आध्यात्मिक ट्यूटोरियल',
      
      // Authentication
      login: 'लॉगिन',
      logout: 'लॉगआउट',
      username: 'उपयोगकर्ता नाम',
      password: 'पासवर्ड',
      
      // Page Titles
      dashboardTitle: 'डैशबोर्ड',
      articlesTitle: 'लेख और ब्लॉग',
      krishnaPageTitle: 'हरे कृष्ण जाप',
      srilaPrabhupadaTitle: 'श्रील प्रभुपाद',
      audiosTitle: 'पवित्र ऑडियो',
      vaishnavaCalendarTitle: 'वैष्णव कैलेंडर',
      booksTitle: 'पवित्र पुस्तकें',
      contactsTitle: 'हमसे संपर्क करें',
      freeMembershipTitle: 'मुफ्त सदस्यता',
      richTextDemoTitle: 'रिच टेक्स्ट डेमो',
      settingsPageTitle: 'सेटिंग्स',
      loginPageTitle: 'साइन इन',
      registerPageTitle: 'समुदाय में शामिल हों',
      
      // Krishna Page Categories
      categoryArati: 'आरती',
      categoryHareKrishnaKirtan: 'हरे कृष्ण कीर्तन',
      categoryStories: 'कहानियां',
      categoryPhilosophy: 'दर्शन',
      categoryDiscussion: 'चर्चा',
      categoryImages: 'चित्र',
      categoryVideos: 'वीडियो',
      
      // Audio Component
      musicGallery: 'संगीत गैलरी',
      discoverSacredSounds: 'पवित्र ध्वनियों की खोज करें',
      immersiveAudioDescription: 'दिव्य संगीत और आध्यात्मिक ऑडियो सामग्री में डूब जाएं',
      audioCategories: 'ऑडियो श्रेणियां',
      featuredAudio: 'विशेष ऑडियो',
      premiumAudioExperience: 'प्रीमियम ऑडियो अनुभव',
      highQualityAudioDescription: 'आपकी यात्रा के लिए तैयार की गई उच्च गुणवत्ता वाली आध्यात्मिक ऑडियो सामग्री',
      
      // Articles Component Categories
      articlesCategoryHow: 'कैसे...?',
      articlesCategoryWhy: 'क्यों...?',
      articlesCategoryWhen: 'कब...?',
      articlesCategoryWho: 'कौन...?',
      articlesCategoryWhere: 'कहाँ...?',
      articlesCategoryWhat: 'क्या...?'
    };
  }

  private getBengaliTexts(): LanguageTexts {
    return {
      // Navigation/Sidebar
      dashboard: 'ড্যাশবোর্ড',
      lordKrishna: 'ভগবান শ্রী কৃষ্ণ',
      srilaPrabhupada: 'শ্রীল প্রভুপাদ',
      audios: 'অডিও',
      articles: 'প্রবন্ধ',
      vaishnavaCalendar: 'বৈষ্ণব পঞ্জিকা',
      books: 'বই',
      chantHareKrishna: 'হরে কৃষ্ণ জপ',
      contacts: 'যোগাযোগ',
      freeMembership: 'বিনামূল্যে সদস্যতা',
      richTextDemo: 'রিচ টেক্সট ডেমো',
      settings: 'সেটিংস',
      
      // Common UI Elements
      search: 'অনুসন্ধান',
      menu: 'মেনু',
      home: 'হোম',
      back: 'পিছনে',
      save: 'সংরক্ষণ',
      cancel: 'বাতিল',
      ok: 'ঠিক আছে',
      yes: 'হ্যাঁ',
      no: 'না',
      loading: 'লোড হচ্ছে...',
      error: 'ত্রুটি',
      success: 'সফল',
      
      // Settings Page
      settingsTitle: 'সেটিংস',
      theme: 'থিম',
      language: 'ভাষা',
      display: 'প্রদর্শন',
      chooseTheme: 'আপনার পছন্দের থিম বেছে নিন',
      chooseLanguage: 'ভাষা নির্বাচন করুন',
      themeDescription: 'পরিবর্তন সাথে সাথে পুরো অ্যাপে প্রয়োগ হবে',
      languageDescription: 'অ্যাপ পুনরায় চালু করার পর পরিবর্তন প্রয়োগ হবে',
      
      // Dashboard
      welcome: 'স্বাগতম',
      recentActivities: 'সাম্প্রতিক কার্যক্রম',
      quickActions: 'দ্রুত কার্যক্রম',
      exploreWisdom: 'পবিত্র জ্ঞান অন্বেষণ করুন',
      
      // Hero Section
      chantWelcomeTitle: '✨ স্বাগতম! জপ করুন এবং খুশি থাকুন ✨',
      heroMainTitle: 'আধ্যাত্মিক যাত্রায় স্বাগতম',
      heroSubtitle1: 'ভগবান কৃষ্ণের চিরন্তন জ্ঞান আবিষ্কার করুন এবং আপনার কৃষ্ণ চেতনা পুনরুজ্জীবিত করুন',
      heroSubtitle2: 'ব্যক্তিগত বিষয়বস্তু সহ আপনার আধ্যাত্মিক যাত্রা অব্যাহত রাখুন',
      joinCommunityButton: 'আমাদের আধ্যাত্মিক সম্প্রদায়ে যোগ দিন',
      signInButton: 'আপনার অ্যাকাউন্টে সাইন ইন করুন',
      
      // Premium Features
      exclusiveFeatures: 'আপনার একচেটিয়া বৈশিষ্ট্য',
      devoteeCommunity: 'ভক্ত সম্প্রদায়',
      devoteeCommunityDesc: 'সহ ভক্তদের সাথে সংযোগ করুন, অভিজ্ঞতা ভাগ করুন এবং কৃষ্ণ চেতনায় একসাথে বৃদ্ধি পান।',
      joinCommunityAction: 'সম্প্রদায়ে যোগ দিন',
      premiumContent: 'প্রিমিয়াম সামগ্রী',
      premiumContentDesc: 'বিখ্যাত শিক্ষকদের একচেটিয়া বক্তৃতা, বিরল রেকর্ডিং এবং উন্নত আধ্যাত্মিক কোর্স অ্যাক্সেস করুন।',
      explorePremiumAction: 'প্রিমিয়াম অন্বেষণ',
      adminDashboard: 'অ্যাডমিন ড্যাশবোর্ড',
      adminDashboardDesc: 'শক্তিশালী অ্যাডমিন টুলস দিয়ে ব্যবহারকারী, সামগ্রী এবং আধ্যাত্মিক সম্প্রদায় পরিচালনা করুন।',
      adminPanelAction: 'অ্যাডমিন প্যানেল',
      
      // Community Section
      connectAndGrow: 'সংযোগ ও বৃদ্ধি',
      contactUs: 'আমাদের সাথে যোগাযোগ করুন',
      contactUsDesc: 'নির্দেশনার জন্য আমাদের আধ্যাত্মিক উপদেষ্টা এবং সম্প্রদায়ের নেতাদের সাথে যোগাযোগ করুন।',
      membershipTitle: 'বিনামূল্যে সদস্যতা',
      membershipDesc: 'আমাদের আধ্যাত্মিক পরিবারে যোগ দিন এবং অতিরিক্ত বৈশিষ্ট্য ও সামগ্রী আনলক করুন।',
      customizeExperience: 'অভিজ্ঞতা কাস্টমাইজ করুন',
      customizeExperienceDesc: 'কাস্টম থিম এবং পছন্দ দিয়ে আপনার আধ্যাত্মিক যাত্রা ব্যক্তিগতকরণ করুন।',
      
      // Footer
      footerQuote: 'জীবনের চূড়ান্ত লক্ষ্য হল ভগবানের কাছে ফিরে যাওয়া, কৃষ্ণের কাছে ফিরে যাওয়া এবং আনন্দ ও জ্ঞানে চিরকাল বাস করা।',
      footerQuoteAuthor: 'এ.সি. ভক্তিবেদান্ত স্বামী প্রভুপাদ',
      
      // Chant Section
      chantInstruction: 'শ্রীল প্রভুপাদের জপ শুনতে উপরের মন্ত্রগুলি স্পর্শ করুন',
      chantPlayingMessage: '🕉️ পবিত্র মন্ত্র বাজছে... ভক্তি সহকারে শুনুন 🕉️',
      hareKrishnaMantra: 'হরে কৃষ্ণ হরে কৃষ্ণ কৃষ্ণ কৃষ্ণ হরে হরে',
      hareRamaMantra: 'হরে রাম হরে রাম রাম রাম হরে হরে',
      
      // Feature Cards
      sacredAudios: 'পবিত্র অডিও',
      spiritualArticles: 'আধ্যাত্মিক প্রবন্ধ',
      spiritualTutorials: 'আধ্যাত্মিক টিউটোরিয়াল',
      
      // Authentication
      login: 'লগইন',
      logout: 'লগআউট',
      username: 'ব্যবহারকারীর নাম',
      password: 'পাসওয়ার্ড',
      
      // Page Titles
      dashboardTitle: 'ড্যাশবোর্ড',
      articlesTitle: 'প্রবন্ধ ও ব্লগ',
      krishnaPageTitle: 'হরে কৃষ্ণ জপ',
      srilaPrabhupadaTitle: 'শ্রীল প্রভুপাদ',
      audiosTitle: 'পবিত্র অডিও',
      vaishnavaCalendarTitle: 'বৈষ্ণব পঞ্জিকা',
      booksTitle: 'পবিত্র বই',
      contactsTitle: 'আমাদের সাথে যোগাযোগ করুন',
      freeMembershipTitle: 'বিনামূল্যে সদস্যতা',
      richTextDemoTitle: 'রিচ টেক্সট ডেমো',
      settingsPageTitle: 'সেটিংস',
      loginPageTitle: 'সাইন ইন',
      registerPageTitle: 'সম্প্রদায়ে যোগ দিন',
      
      // Krishna Page Categories
      categoryArati: 'আরতি',
      categoryHareKrishnaKirtan: 'হরে কৃষ্ণ কীর্তন',
      categoryStories: 'গল্প',
      categoryPhilosophy: 'দর্শন',
      categoryDiscussion: 'আলোচনা',
      categoryImages: 'ছবি',
      categoryVideos: 'ভিডিও',
      
      // Audio Component
      musicGallery: 'সঙ্গীত গ্যালারি',
      discoverSacredSounds: 'পবিত্র শব্দ আবিষ্কার করুন',
      immersiveAudioDescription: 'দিব্য সুর এবং আধ্যাত্মিক অডিও সামগ্রীতে নিমজ্জিত হন',
      audioCategories: 'অডিও বিভাগ',
      featuredAudio: 'বিশেষ অডিও',
      premiumAudioExperience: 'প্রিমিয়াম অডিও অভিজ্ঞতা',
      highQualityAudioDescription: 'আপনার যাত্রার জন্য নির্বাচিত উচ্চ মানের আধ্যাত্মিক অডিও সামগ্রী',
      
      // Articles Component Categories
      articlesCategoryHow: 'কীভাবে...?',
      articlesCategoryWhy: 'কেন...?',
      articlesCategoryWhen: 'কখন...?',
      articlesCategoryWho: 'কে...?',
      articlesCategoryWhere: 'কোথায়...?',
      articlesCategoryWhat: 'কী...?'
    };
  }

  private getTeluguTexts(): LanguageTexts {
    return {
      ...this.getEnglishTexts(),
      // Navigation/Sidebar
      dashboard: 'డాష్‌బోర్డ్',
      lordKrishna: 'భగవాన్ శ్రీ కృష్ణ',
      srilaPrabhupada: 'శ్రీల ప్రభుపాద',
      audios: 'ఆడియోలు',
      articles: 'వ్యాసాలు',
      vaishnavaCalendar: 'వైష్ణవ క్యాలెండర్',
      books: 'పుస్తకాలు',
      chantHareKrishna: 'హరే కృష్ణ జపం',
      contacts: 'సంప్రదింపులు',
      freeMembership: 'ఉచిత సభ్యత్వం',
      richTextDemo: 'రిచ్ టెక్స్ట్ డెమో',
      settings: 'సెట్టింగ్స్',
      
      // Common UI Elements
      search: 'వెతుకు',
      menu: 'మెనూ',
      home: 'హోమ్',
      back: 'వెనుకకు',
      save: 'సేవ్',
      cancel: 'రద్దు',
      ok: 'సరే',
      yes: 'అవును',
      no: 'లేదు',
      loading: 'లోడవుతోంది...',
      error: 'లోపం',
      success: 'విజయం',
      
      // Settings Page
      settingsTitle: 'సెట్టింగ్స్',
      theme: 'థీమ్',
      language: 'భాష',
      display: 'ప్రదర్శన',
      chooseTheme: 'మీ ఇష్టమైన థీమ్ ఎంచుకోండి',
      chooseLanguage: 'భాష ఎంచుకోండి',
      themeDescription: 'మార్పులు వెంటనే మొత్తం యాప్‌లో వర్తించబడతాయి',
      languageDescription: 'యాప్‌ను మళ్లీ ప్రారంభించిన తర్వాత మార్పులు వర్తించబడతాయి',
      
      // Dashboard
      welcome: 'స్వాగతం',
      recentActivities: 'ఇటీవలి కార్యకలాపాలు',
      quickActions: 'వేగవంతమైన చర్యలు',
      exploreWisdom: 'పవిత్ర జ్ఞానాన్ని అన్వేషించండి',
      
      // Feature Cards
      sacredAudios: 'పవిత్ర ఆడియోలు',
      spiritualArticles: 'ఆధ్యాత్మిక వ్యాసాలు',
      spiritualTutorials: 'ఆధ్యాత్మిక ట్యుటోరియల్స్',
      
      // Authentication
      login: 'లాగిన్',
      logout: 'లాగవుట్',
      username: 'వినియోగదారు పేరు',
      password: 'పాస్‌వర్డ్',
      
      // Page Titles
      dashboardTitle: 'డాష్‌బోర్డ్',
      articlesTitle: 'వ్యాసాలు & బ్లాగులు',
      krishnaPageTitle: 'హరే కృష్ణ జపం',
      srilaPrabhupadaTitle: 'శ్రీల ప్రభుపాద',
      audiosTitle: 'పవిత్ర ఆడియోలు',
      vaishnavaCalendarTitle: 'వైష్ణవ క్యాలెండర్',
      booksTitle: 'పవిత్ర పుస్తకాలు',
      contactsTitle: 'మాను సంప్రదించండి',
      freeMembershipTitle: 'ఉచిత సభ్యత్వం',
      richTextDemoTitle: 'రిచ్ టెక్స్ట్ డెమో',
      settingsPageTitle: 'సెట్టింగ్స్',
      loginPageTitle: 'సైన్ ఇన్',
      registerPageTitle: 'కమ్యూనిటీలో చేరండి',
      
      // Krishna Page Categories
      categoryArati: 'ఆరతి',
      categoryHareKrishnaKirtan: 'హరే కృష్ణ కీర్తన',
      categoryStories: 'కథలు',
      categoryPhilosophy: 'తత్వశాస్త్రం',
      categoryDiscussion: 'చర్చ',
      categoryImages: 'చిత్రాలు',
      categoryVideos: 'వీడియోలు',
      
      // Audio Component
      musicGallery: 'సంగీత గ్యాలరీ',
      discoverSacredSounds: 'పవిత్ర శబ్దాలను కనుగొనండి',
      immersiveAudioDescription: 'దైవిక సంగీతం మరియు ఆధ్యాత్మిక ఆడియో కంటెంట్‌లో మునిగిపోండి',
      audioCategories: 'ఆడియో వర్గాలు',
      featuredAudio: 'ప్రత్యేక ఆడియో',
      premiumAudioExperience: 'ప్రీమియం ఆడియో అనుభవం',
      highQualityAudioDescription: 'మీ ప్రయాణం కోసం తెరచుకున్న అధిక నాణ్యత ఆధ్యాత్మిక ఆడియో కంటెంట్',
      
      // Articles Component Categories
      articlesCategoryHow: 'ఎలా...?',
      articlesCategoryWhy: 'ఎందుకు...?',
      articlesCategoryWhen: 'ఎప్పుడు...?',
      articlesCategoryWho: 'ఎవరు...?',
      articlesCategoryWhere: 'ఎక్కడ...?',
      articlesCategoryWhat: 'ఏమిటి...?'
    };
  }

  private getMarathiTexts(): LanguageTexts {
    return {
      ...this.getEnglishTexts(),
      // Navigation/Sidebar
      dashboard: 'डॅशबोर्ड',
      lordKrishna: 'भगवान श्री कृष्ण',
      srilaPrabhupada: 'श्रील प्रभुपाद',
      audios: 'ऑडिओ',
      articles: 'लेख',
      vaishnavaCalendar: 'वैष्णव कॅलेंडर',
      books: 'पुस्तके',
      chantHareKrishna: 'हरे कृष्ण जप',
      contacts: 'संपर्क',
      freeMembership: 'मोफत सदस्यत्व',
      richTextDemo: 'रिच टेक्स्ट डेमो',
      settings: 'सेटिंग्ज',
      
      // Krishna Page Categories
      categoryArati: 'आरती',
      categoryHareKrishnaKirtan: 'हरे कृष्ण कीर्तन',
      categoryStories: 'कथा',
      categoryPhilosophy: 'तत्त्वज्ञान',
      categoryDiscussion: 'चर्चा',
      categoryImages: 'चित्रे',
      categoryVideos: 'व्हिडिओ',
      
      // Audio Component
      musicGallery: 'संगीत गॅलरी',
      discoverSacredSounds: 'पवित्र आवाज शोधा',
      immersiveAudioDescription: 'दैवी संगीत आणि आध्यात्मिक ऑडिओ सामग्रीमध्ये बुडून जा',
      audioCategories: 'ऑडिओ श्रेणी',
      featuredAudio: 'विशेष ऑडिओ',
      premiumAudioExperience: 'प्रीमियम ऑडिओ अनुभव',
      highQualityAudioDescription: 'आपल्या प्रवासासाठी तयार केलेली उच्च दर्जाची आध्यात्मिक ऑडिओ सामग्री',
      
      // Articles Component Categories
      articlesCategoryHow: 'कसे...?',
      articlesCategoryWhy: 'का...?',
      articlesCategoryWhen: 'केव्हा...?',
      articlesCategoryWho: 'कोण...?',
      articlesCategoryWhere: 'कुठे...?',
      articlesCategoryWhat: 'काय...?'
    };
  }

  private getGujaratiTexts(): LanguageTexts {
    return {
      ...this.getEnglishTexts(),
      // Navigation/Sidebar
      dashboard: 'ડેશબોર્ડ',
      lordKrishna: 'ભગવાન શ્રી કૃષ્ણ',
      srilaPrabhupada: 'શ્રીલ પ્રભુપાદ',
      audios: 'ઓડિયો',
      articles: 'લેખો',
      vaishnavaCalendar: 'વૈષ્ણવ કેલેન્ડર',
      books: 'પુસ્તકો',
      chantHareKrishna: 'હરે કૃષ્ણ જપ',
      contacts: 'સંપર્કો',
      freeMembership: 'મફત સભ્યપદ',
      richTextDemo: 'રિચ ટેક્સ્ટ ડેમો',
      settings: 'સેટિંગ્સ',
      
      // Krishna Page Categories
      categoryArati: 'આરતી',
      categoryHareKrishnaKirtan: 'હરે કૃષ્ણ કીર્તન',
      categoryStories: 'વાર્તાઓ',
      categoryPhilosophy: 'ફિલસૂફી',
      categoryDiscussion: 'ચર્ચા',
      categoryImages: 'ચિત્રો',
      categoryVideos: 'વિડિયો',
      
      // Audio Component
      musicGallery: 'સંગીત ગેલેરી',
      discoverSacredSounds: 'પવિત્ર અવાજો શોધો',
      immersiveAudioDescription: 'દિવ્ય સંગીત અને આધ્યાત્મિક ઓડિઓ સામગ્રીમાં ડૂબી જાઓ',
      audioCategories: 'ઓડિઓ શ્રેણીઓ',
      featuredAudio: 'વિશેષ ઓડિઓ',
      premiumAudioExperience: 'પ્રીમિયમ ઓડિઓ અનુભવ',
      highQualityAudioDescription: 'તમારી યાત્રા માટે તૈયાર કરેલ ઉચ્ચ ગુણવત્તાવાળી આધ્યાત્મિક ઓડિઓ સામગ્રી',
      
      // Articles Component Categories
      articlesCategoryHow: 'કેવી રીતે...?',
      articlesCategoryWhy: 'શા માટે...?',
      articlesCategoryWhen: 'ક્યારે...?',
      articlesCategoryWho: 'કોણ...?',
      articlesCategoryWhere: 'ક્યાં...?',
      articlesCategoryWhat: 'શું...?'
    };
  }

  private getKannadaTexts(): LanguageTexts {
    return {
      ...this.getEnglishTexts(),
      // Navigation/Sidebar
      dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      lordKrishna: 'ಭಗವಾನ್ ಶ್ರೀ ಕೃಷ್ಣ',
      srilaPrabhupada: 'ಶ್ರೀಲ ಪ್ರಭುಪಾದ',
      audios: 'ಆಡಿಯೋಗಳು',
      articles: 'ಲೇಖನಗಳು',
      vaishnavaCalendar: 'ವೈಷ್ಣವ ಕ್ಯಾಲೆಂಡರ್',
      books: 'ಪುಸ್ತಕಗಳು',
      chantHareKrishna: 'ಹರೇ ಕೃಷ್ಣ ಜಪ',
      contacts: 'ಸಂಪರ್ಕಗಳು',
      freeMembership: 'ಉಚಿತ ಸದಸ್ಯತ್ವ',
      richTextDemo: 'ರಿಚ್ ಟೆಕ್ಸ್ಟ್ ಡೆಮೋ',
      settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
      
      // Krishna Page Categories
      categoryArati: 'ಆರತಿ',
      categoryHareKrishnaKirtan: 'ಹರೇ ಕೃಷ್ಣ ಕೀರ್ತನೆ',
      categoryStories: 'ಕಥೆಗಳು',
      categoryPhilosophy: 'ತತ್ತ್ವಶಾಸ್ತ್ರ',
      categoryDiscussion: 'ಚರ್ಚೆ',
      categoryImages: 'ಚಿತ್ರಗಳು',
      categoryVideos: 'ವೀಡಿಯೋಗಳು',
      
      // Audio Component
      musicGallery: 'ಸಂಗೀತ ಗ್ಯಾಲರಿ',
      discoverSacredSounds: 'ಪವಿತ್ರ ಶಬ್ದಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
      immersiveAudioDescription: 'ದಿವ್ಯ ಸಂಗೀತ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಆಡಿಯೋ ವಿಷಯದಲ್ಲಿ ಮುಳುಗಿ',
      audioCategories: 'ಆಡಿಯೋ ವರ್ಗಗಳು',
      featuredAudio: 'ವಿಶೇಷ ಆಡಿಯೋ',
      premiumAudioExperience: 'ಪ್ರೀಮಿಯಂ ಆಡಿಯೋ ಅನುಭವ',
      highQualityAudioDescription: 'ನಿಮ್ಮ ಪ್ರಯಾಣಕ್ಕಾಗಿ ತಯಾರಿಸಿದ ಉನ್ನತ ದರ್ಜೆಯ ಆಧ್ಯಾತ್ಮಿಕ ಆಡಿಯೋ ವಿಷಯ',
      
      // Articles Component Categories
      articlesCategoryHow: 'ಹೇಗೆ...?',
      articlesCategoryWhy: 'ಏಕೆ...?',
      articlesCategoryWhen: 'ಯಾವಾಗ...?',
      articlesCategoryWho: 'ಯಾರು...?',
      articlesCategoryWhere: 'ಎಲ್ಲಿ...?',
      articlesCategoryWhat: 'ಏನು...?'
    };
  }

  private getMalayalamTexts(): LanguageTexts {
    return {
      ...this.getEnglishTexts(),
      // Navigation/Sidebar
      dashboard: 'ഡാഷ്‌ബോർഡ്',
      lordKrishna: 'ഭഗവാൻ ശ്രീ കൃഷ്ണൻ',
      srilaPrabhupada: 'ശ്രീല പ്രഭുപാദ',
      audios: 'ഓഡിയോകൾ',
      articles: 'ലേഖനങ്ങൾ',
      vaishnavaCalendar: 'വൈഷ്ണവ കലണ്ടർ',
      books: 'പുസ്തകങ്ങൾ',
      chantHareKrishna: 'ഹരേ കൃഷ്ണ ജപം',
      contacts: 'കോൺടാക്റ്റുകൾ',
      freeMembership: 'സൗജന്യ അംഗത്വം',
      richTextDemo: 'റിച്ച് ടെക്സ്റ്റ് ഡെമോ',
      settings: 'സെറ്റിംഗുകൾ',
      
      // Krishna Page Categories
      categoryArati: 'ആരതി',
      categoryHareKrishnaKirtan: 'ഹരേ കൃഷ്ണ കീർത്തനം',
      categoryStories: 'കഥകൾ',
      categoryPhilosophy: 'തത്ത്വശാസ്ത്രം',
      categoryDiscussion: 'ചർച്ച',
      categoryImages: 'ചിത്രങ്ങൾ',
      categoryVideos: 'വീഡിയോകൾ',
      
      // Audio Component
      musicGallery: 'സംഗീത ഗാലറി',
      discoverSacredSounds: 'പവിത്ര ശബ്ദങ്ങൾ കണ്ടെത്തുക',
      immersiveAudioDescription: 'ദിവ്യ സംഗീതത്തിലും ആധ്യാത്മിക ഓഡിയോ ഉള്ളടക്കത്തിലും മുഴുകുക',
      audioCategories: 'ഓഡിയോ വിഭാഗങ്ങൾ',
      featuredAudio: 'പ്രത്യേക ഓഡിയോ',
      premiumAudioExperience: 'പ്രീമിയം ഓഡിയോ അനുഭവം',
      highQualityAudioDescription: 'നിങ്ങളുടെ യാത്രയ്ക്കായി തയ്യാറാക്കിയ ഉയർന്ന നിലവാരമുള്ള ആധ്യാത്മിക ഓഡിയോ ഉള്ളടക്കം',
      
      // Articles Component Categories
      articlesCategoryHow: 'എങ്ങനെ...?',
      articlesCategoryWhy: 'എന്തുകൊണ്ട്...?',
      articlesCategoryWhen: 'എപ്പോൾ...?',
      articlesCategoryWho: 'ആര്...?',
      articlesCategoryWhere: 'എവിടെ...?',
      articlesCategoryWhat: 'എന്ത്...?'
    };
  }

  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguageSubject.value;
  }

  setLanguage(language: SupportedLanguage): void {
    if (this.isValidLanguage(language)) {
      this.currentLanguageSubject.next(language);
      this.textsSubject.next(this.getTextsForLanguage(language));
      
      // Save to localStorage for persistence
      localStorage.setItem('selectedLanguage', language);
    }
  }

  getTexts(): LanguageTexts {
    return this.textsSubject.value;
  }

  getText(key: keyof LanguageTexts): string {
    const texts = this.getTexts();
    return texts[key] || key;
  }

  private getTextsForLanguage(language: SupportedLanguage): LanguageTexts {
    const texts = this.languageTexts[language];
    
    // If language is not fully implemented, fall back to English for missing keys
    if (language !== 'en') {
      const englishTexts = this.languageTexts.en;
      return { ...englishTexts, ...texts };
    }
    
    return texts;
  }

  private isValidLanguage(language: string): language is SupportedLanguage {
    return ['en', 'ta', 'hi', 'bn', 'te', 'mr', 'gu', 'kn', 'ml'].includes(language);
  }

  // Method to get available languages for dropdown
  getAvailableLanguages() {
    return [
      { value: 'en', label: 'English' },
      { value: 'ta', label: 'Tamil - தமிழ்' },
      { value: 'hi', label: 'Hindi - हिन्दी' },
      { value: 'bn', label: 'Bengali - বাংলা' },
      { value: 'te', label: 'Telugu - తెలుగు' },
      { value: 'mr', label: 'Marathi - मराठी' },
      { value: 'gu', label: 'Gujarati - ગુજરાતી' },
      { value: 'kn', label: 'Kannada - ಕನ್ನಡ' },
      { value: 'ml', label: 'Malayalam - മലയാളം' }
    ];
  }  // Method to add new texts dynamically (useful for future database integration)
  addTexts(language: SupportedLanguage, texts: Partial<LanguageTexts>): void {
    this.languageTexts[language] = { ...this.languageTexts[language], ...texts };
    
    // Update current texts if this is the active language
    if (this.getCurrentLanguage() === language) {
      this.textsSubject.next(this.getTextsForLanguage(language));
    }
  }
}
