import { LanguageTexts, SupportedLanguage } from '../services/language.service';

export interface FeatureCard {
  id: string;
  titleKey: keyof LanguageTexts;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  iconClass: string;
  cardClass: string;
  route: string;
  tags: string[];
}

// English Feature Cards
export const FEATURE_CARDS_EN: FeatureCard[] = [
  {
    id: 'lordkrishna',
    titleKey: 'lordKrishna',
    title: 'Lord Sri Krishna',
    subtitle: 'The Supreme Personality of Godhead',
    description: 'Discover the divine pastimes, teachings, and eternal love of Lord Krishna. Experience the ultimate spiritual connection.',
    icon: 'person-circle',
    iconClass: 'krishna-icon',
    cardClass: 'krishna-card',
    route: '/lordkrishna',
    tags: ['Divine Stories', 'Sacred Teachings']
  },
  {
    id: 'srilaprabhupada',
    titleKey: 'srilaPrabhupada',
    title: 'Srila Prabhupada',
    subtitle: 'Founder-Acharya of ISKCON',
    description: 'Learn from the revolutionary spiritual master who brought Krishna consciousness to the Western world.',
    icon: 'person-circle',
    iconClass: 'prabhupada-icon',
    cardClass: 'prabhupada-card',
    route: '/srilaprabhupada',
    tags: ['Life Story', 'Teachings']
  },
  {
    id: 'audios',
    titleKey: 'sacredAudios',
    title: 'Sacred Audios',
    subtitle: 'Devotional Music & Lectures',
    description: 'Immerse yourself in divine kirtans, bhajans, and enlightening spiritual discourses from great saints.',
    icon: 'musical-notes',
    iconClass: 'audio-icon',
    cardClass: 'audio-card',
    route: '/audios',
    tags: ['Kirtans', 'Lectures', 'Bhajans']
  },
  {
    id: 'articles',
    titleKey: 'spiritualArticles',
    title: 'Spiritual Articles',
    subtitle: 'Ancient Wisdom for Modern Life',
    description: 'Read profound articles on philosophy, lifestyle, and practical application of Vedic principles in daily life.',
    icon: 'document-text',
    iconClass: 'articles-icon',
    cardClass: 'articles-card',
    route: '/articles',
    tags: ['Philosophy', 'Lifestyle']
  },
  {
    id: 'calendar',
    titleKey: 'vaishnavaCalendar',
    title: 'Vaishnava Calendar',
    subtitle: 'Sacred Festivals & Observances',
    description: 'Stay connected with important festivals, fasting days, and spiritual observances throughout the year.',
    icon: 'calendar',
    iconClass: 'calendar-icon',
    cardClass: 'calendar-card',
    route: '/calender',
    tags: ['Festivals', 'Fasting']
  },
  {
    id: 'tutorial',
    titleKey: 'spiritualTutorials',
    title: 'Spiritual Tutorials',
    subtitle: 'Learn Sacred Practices',
    description: 'Master the art of meditation, chanting, deity worship, and other essential spiritual practices.',
    icon: 'easel',
    iconClass: 'tutorial-icon',
    cardClass: 'tutorial-card',
    route: '/tutorial',
    tags: ['Meditation', 'Worship']
  },
  {
    id: 'chant',
    titleKey: 'chantHareKrishna',
    title: 'Chant Hare Krishna',
    subtitle: 'The Holy Names Meditation',
    description: 'Experience the transformative power of chanting the Hare Krishna maha-mantra with guided sessions.',
    icon: 'heart',
    iconClass: 'chant-icon',
    cardClass: 'chant-card',
    route: '/chant',
    tags: ['Guided Chanting', 'Meditation']
  }
];

// Tamil Feature Cards
export const FEATURE_CARDS_TA: FeatureCard[] = [
  {
    id: 'lordkrishna',
    titleKey: 'lordKrishna',
    title: 'ஸ்ரீ கிருஷ்ணர்',
    subtitle: 'பரம்பொருள்',
    description: 'பகவான் கிருஷ்ணரின் திவ்ய லீலைகள், போதனைகள் மற்றும் நித்ய அன்பை கண்டறியுங்கள். உச்சமான ஆன்மீக தொடர்பை அனுபவியுங்கள்.',
    icon: 'person-circle',
    iconClass: 'krishna-icon',
    cardClass: 'krishna-card',
    route: '/lordkrishna',
    tags: ['திவ்ய கதைகள்', 'புனித போதனைகள்']
  },
  {
    id: 'srilaprabhupada',
    titleKey: 'srilaPrabhupada',
    title: 'ஸ்ரீல பிரபுபாதர்',
    subtitle: 'இஸ்கான் நிறுவனர் ஆசார்யார்',
    description: 'மேற்கத்திய உலகிற்கு கிருஷ்ண சைதன்யத்தை கொண்டு வந்த புரட்சிகர ஆன்மீக குருவிடமிருந்து கற்றுக்கொள்ளுங்கள்.',
    icon: 'person-circle',
    iconClass: 'prabhupada-icon',
    cardClass: 'prabhupada-card',
    route: '/srilaprabhupada',
    tags: ['வாழ்க்கை வரலாறு', 'போதனைகள்']
  },
  {
    id: 'audios',
    titleKey: 'sacredAudios',
    title: 'புனித ஆடியோக்கள்',
    subtitle: 'பக்தி இசை மற்றும் உரைகள்',
    description: 'திவ்ய கீர்த்தனைகள், பஜனைகள் மற்றும் மகான்களின் ஞான உரைகளில் மூழ்கியிருங்கள்.',
    icon: 'musical-notes',
    iconClass: 'audio-icon',
    cardClass: 'audio-card',
    route: '/audios',
    tags: ['கீர்த்தனைகள்', 'உரைகள்', 'பஜனைகள்']
  },
  {
    id: 'articles',
    titleKey: 'spiritualArticles',
    title: 'ஆன்மீக கட்டுரைகள்',
    subtitle: 'நவீன வாழ்க்கைக்கு பண்டைய ஞானம்',
    description: 'தத்துவம், வாழ்க்கை முறை மற்றும் அன்றாட வாழ்க்கையில் வேத கொள்கைகளின் நடைமுறை பயன்பாடு பற்றிய ஆழமான கட்டுரைகளை படியுங்கள்.',
    icon: 'document-text',
    iconClass: 'articles-icon',
    cardClass: 'articles-card',
    route: '/articles',
    tags: ['தத்துவம்', 'வாழ்க்கை முறை']
  },
  {
    id: 'calendar',
    titleKey: 'vaishnavaCalendar',
    title: 'வைஷ்ணவ நாட்காட்டி',
    subtitle: 'புனித பண்டிகைகள் மற்றும் விரதங்கள்',
    description: 'ஆண்டு முழுவதும் முக்கியமான பண்டிகைகள், உபவாச நாட்கள் மற்றும் ஆன்மீக அனுசரிப்புகளுடன் தொடர்பில் இருங்கள்.',
    icon: 'calendar',
    iconClass: 'calendar-icon',
    cardClass: 'calendar-card',
    route: '/calender',
    tags: ['பண்டிகைகள்', 'உபவாசம்']
  },
  {
    id: 'tutorial',
    titleKey: 'spiritualTutorials',
    title: 'ஆன்மீக பயிற்சி',
    subtitle: 'புனித நடைமுறைகளை கற்றுக்கொள்ளுங்கள்',
    description: 'தியானம், ஜபம், தெய்வ ஆராதனை மற்றும் பிற அத்தியாவசிய ஆன்மீக நடைமுறைகளின் கலையில் தேர்ச்சி பெறுங்கள்.',
    icon: 'easel',
    iconClass: 'tutorial-icon',
    cardClass: 'tutorial-card',
    route: '/tutorial',
    tags: ['தியானம்', 'ஆராதனை']
  },
  {
    id: 'chant',
    titleKey: 'chantHareKrishna',
    title: 'ஹரே கிருஷ்ணா ஜபம்',
    subtitle: 'புனித நாம ஜபம்',
    description: 'வழிகாட்டல் அமர்வுகளுடன் ஹரே கிருஷ்ணா மகா மந்திரத்தின் மாற்றும் சக்தியை அனுபவியுங்கள்.',
    icon: 'heart',
    iconClass: 'chant-icon',
    cardClass: 'chant-card',
    route: '/chant',
    tags: ['வழிகாட்டல் ஜபம்', 'தியானம்']
  }
];

// Hindi Feature Cards
export const FEATURE_CARDS_HI: FeatureCard[] = [
  {
    id: 'lordkrishna',
    titleKey: 'lordKrishna',
    title: 'भगवान श्री कृष्ण',
    subtitle: 'परम पुरुषोत्तम',
    description: 'भगवान कृष्ण की दिव्य लीलाओं, शिक्षाओं और शाश्वत प्रेम की खोज करें। परम आध्यात्मिक संबंध का अनुभव करें।',
    icon: 'person-circle',
    iconClass: 'krishna-icon',
    cardClass: 'krishna-card',
    route: '/lordkrishna',
    tags: ['दिव्य कथाएं', 'पवित्र शिक्षाएं']
  },
  {
    id: 'srilaprabhupada',
    titleKey: 'srilaPrabhupada',
    title: 'श्रील प्रभुपाद',
    subtitle: 'इस्कॉन के संस्थापक आचार्य',
    description: 'उस क्रांतिकारी आध्यात्मिक गुरु से सीखें जो पश्चिमी दुनिया में कृष्ण चेतना लेकर आए।',
    icon: 'person-circle',
    iconClass: 'prabhupada-icon',
    cardClass: 'prabhupada-card',
    route: '/srilaprabhupada',
    tags: ['जीवन कथा', 'शिक्षाएं']
  },
  {
    id: 'audios',
    titleKey: 'sacredAudios',
    title: 'पवित्र ऑडियो',
    subtitle: 'भक्ति संगीत और प्रवचन',
    description: 'दिव्य कीर्तन, भजन और महान संतों के ज्ञानवर्धक आध्यात्मिक प्रवचनों में डूब जाएं।',
    icon: 'musical-notes',
    iconClass: 'audio-icon',
    cardClass: 'audio-card',
    route: '/audios',
    tags: ['कीर्तन', 'प्रवचन', 'भजन']
  },
  {
    id: 'articles',
    titleKey: 'spiritualArticles',
    title: 'आध्यात्मिक लेख',
    subtitle: 'आधुनिक जीवन के लिए प्राचीन ज्ञान',
    description: 'दर्शन, जीवनशैली और दैनिक जीवन में वैदिक सिद्धांतों के व्यावहारिक अनुप्रयोग पर गहन लेख पढ़ें।',
    icon: 'document-text',
    iconClass: 'articles-icon',
    cardClass: 'articles-card',
    route: '/articles',
    tags: ['दर्शन', 'जीवनशैली']
  },
  {
    id: 'calendar',
    titleKey: 'vaishnavaCalendar',
    title: 'वैष्णव कैलेंडर',
    subtitle: 'पवित्र त्योहार और व्रत',
    description: 'साल भर के महत्वपूर्ण त्योहारों, व्रत दिनों और आध्यात्मिक पालनाओं से जुड़े रहें।',
    icon: 'calendar',
    iconClass: 'calendar-icon',
    cardClass: 'calendar-card',
    route: '/calender',
    tags: ['त्योहार', 'व्रत']
  },
  {
    id: 'tutorial',
    titleKey: 'spiritualTutorials',
    title: 'आध्यात्मिक ट्यूटोरियल',
    subtitle: 'पवित्र प्रथाएं सीखें',
    description: 'ध्यान, जप, देवता पूजा और अन्य आवश्यक आध्यात्मिक प्रथाओं की कला में महारत हासिल करें।',
    icon: 'easel',
    iconClass: 'tutorial-icon',
    cardClass: 'tutorial-card',
    route: '/tutorial',
    tags: ['ध्यान', 'पूजा']
  },
  {
    id: 'chant',
    titleKey: 'chantHareKrishna',
    title: 'हरे कृष्ण जाप',
    subtitle: 'पवित्र नाम जप',
    description: 'निर्देशित सत्रों के साथ हरे कृष्ण महा मंत्र की परिवर्तनकारी शक्ति का अनुभव करें।',
    icon: 'heart',
    iconClass: 'chant-icon',
    cardClass: 'chant-card',
    route: '/chant',
    tags: ['निर्देशित जप', 'ध्यान']
  }
];

// Bengali Feature Cards
export const FEATURE_CARDS_BN: FeatureCard[] = [
  {
    id: 'lordkrishna',
    titleKey: 'lordKrishna',
    title: 'ভগবান শ্রী কৃষ্ণ',
    subtitle: 'পরম পুরুষোত্তম',
    description: 'ভগবান কৃষ্ণের দিব্য লীলা, শিক্ষা এবং শাশ্বত প্রেম আবিষ্কার করুন। পরম আধ্যাত্মিক সংযোগ অনুভব করুন।',
    icon: 'person-circle',
    iconClass: 'krishna-icon',
    cardClass: 'krishna-card',
    route: '/lordkrishna',
    tags: ['দিব্য কাহিনী', 'পবিত্র শিক্ষা']
  },
  {
    id: 'srilaprabhupada',
    titleKey: 'srilaPrabhupada',
    title: 'শ্রীল প্রভুপাদ',
    subtitle: 'ইসকনের প্রতিষ্ঠাতা আচার্য',
    description: 'সেই বিপ্লবী আধ্যাত্মিক গুরুর কাছ থেকে শিখুন যিনি পশ্চিমা বিশ্বে কৃষ্ণ চেতনা নিয়ে এসেছিলেন।',
    icon: 'person-circle',
    iconClass: 'prabhupada-icon',
    cardClass: 'prabhupada-card',
    route: '/srilaprabhupada',
    tags: ['জীবনী', 'শিক্ষা']
  },
  {
    id: 'audios',
    titleKey: 'sacredAudios',
    title: 'পবিত্র অডিও',
    subtitle: 'ভক্তিমূলক সঙ্গীত ও বক্তৃতা',
    description: 'দিব্য কীর্তন, ভজন এবং মহান সাধকদের জ্ঞানদায়ক আধ্যাত্মিক প্রবচনে নিমজ্জিত হন।',
    icon: 'musical-notes',
    iconClass: 'audio-icon',
    cardClass: 'audio-card',
    route: '/audios',
    tags: ['কীর্তন', 'প্রবচন', 'ভজন']
  },
  {
    id: 'articles',
    titleKey: 'spiritualArticles',
    title: 'আধ্যাত্মিক প্রবন্ধ',
    subtitle: 'আধুনিক জীবনের জন্য প্রাচীন জ্ঞান',
    description: 'দর্শন, জীবনযাত্রা এবং দৈনন্দিন জীবনে বৈদিক নীতিমালার ব্যবহারিক প্রয়োগ সম্পর্কে গভীর প্রবন্ধ পড়ুন।',
    icon: 'document-text',
    iconClass: 'articles-icon',
    cardClass: 'articles-card',
    route: '/articles',
    tags: ['দর্শন', 'জীবনযাত্রা']
  },
  {
    id: 'calendar',
    titleKey: 'vaishnavaCalendar',
    title: 'বৈষ্ণব পঞ্জিকা',
    subtitle: 'পবিত্র উৎসব ও ব্রত',
    description: 'বছরব্যাপী গুরুত্বপূর্ণ উৎসব, উপবাসের দিন এবং আধ্যাত্মিক পালনীয় বিষয়গুলির সাথে যুক্ত থাকুন।',
    icon: 'calendar',
    iconClass: 'calendar-icon',
    cardClass: 'calendar-card',
    route: '/calender',
    tags: ['উৎসব', 'উপবাস']
  },
  {
    id: 'tutorial',
    titleKey: 'spiritualTutorials',
    title: 'আধ্যাত্মিক টিউটোরিয়াল',
    subtitle: 'পবিত্র অনুশীলন শিখুন',
    description: 'ধ্যান, জপ, দেবতার পূজা এবং অন্যান্য অপরিহার্য আধ্যাত্মিক অনুশীলনের কলায় দক্ষতা অর্জন করুন।',
    icon: 'easel',
    iconClass: 'tutorial-icon',
    cardClass: 'tutorial-card',
    route: '/tutorial',
    tags: ['ধ্যান', 'পূজা']
  },
  {
    id: 'chant',
    titleKey: 'chantHareKrishna',
    title: 'হরে কৃষ্ণ জপ',
    subtitle: 'পবিত্র নাম জপ',
    description: 'নির্দেশিত সেশনের সাথে হরে কৃষ্ণ মহামন্ত্রের রূপান্তরকারী শক্তি অনুভব করুন।',
    icon: 'heart',
    iconClass: 'chant-icon',
    cardClass: 'chant-card',
    route: '/chant',
    tags: ['নির্দেশিত জপ', 'ধ্যান']
  }
];

// Telugu Feature Cards
export const FEATURE_CARDS_TE: FeatureCard[] = [
  {
    id: 'lordkrishna',
    titleKey: 'lordKrishna',
    title: 'భగవాన్ శ్రీ కృష్ణ',
    subtitle: 'పరమ పురుషోత్తమ',
    description: 'భగవాన్ కృష్ణుడి దివ్య లీలలు, బోధనలు మరియు శాశ్వత ప్రేమను కనుగొనండి. అత్యున్నత ఆధ్యాత్మిక అనుబంధాన్ని అనుభవించండి.',
    icon: 'person-circle',
    iconClass: 'krishna-icon',
    cardClass: 'krishna-card',
    route: '/lordkrishna',
    tags: ['దివ్య కథలు', 'పవిత్ర బోధనలు']
  },
  {
    id: 'srilaprabhupada',
    titleKey: 'srilaPrabhupada',
    title: 'శ్రీల ప్రభుపాద',
    subtitle: 'ఇస్కాన్ వ్యవస్థాపక ఆచార్య',
    description: 'పాశ్చాత్య ప్రపంచానికి కృష్ణ చైతన్యాన్ని తీసుకొచ్చిన విప్లవాత్మక ఆధ్యాత్మిక గురువు నుండి నేర్చుకోండి.',
    icon: 'person-circle',
    iconClass: 'prabhupada-icon',
    cardClass: 'prabhupada-card',
    route: '/srilaprabhupada',
    tags: ['జీవిత చరిత్ర', 'బోధనలు']
  },
  {
    id: 'audios',
    titleKey: 'sacredAudios',
    title: 'పవిత్ర ఆడియోలు',
    subtitle: 'భక్తి సంగీతం మరియు ప్రవచనలు',
    description: 'దివ్య కీర్తనలు, భజనలు మరియు మహాత్ముల జ్ఞానవర్థక ఆధ్యాత్మిక ప్రవచనలలో లీనమవ్వండి.',
    icon: 'musical-notes',
    iconClass: 'audio-icon',
    cardClass: 'audio-card',
    route: '/audios',
    tags: ['కీర్తనలు', 'ప్రవచనలు', 'భజనలు']
  },
  {
    id: 'articles',
    titleKey: 'spiritualArticles',
    title: 'ఆధ్యాత్మిక వ్యాసాలు',
    subtitle: 'ఆధునిక జీవితానికి పురాతన జ్ఞానం',
    description: 'తత్వశాస్త్రం, జీవనశైలి మరియు దైనందిన జీవితంలో వేద సిద్ధాంతాల ఆచరణాత్మక అనువర్తనంపై లోతైన వ్యాసాలను చదవండి.',
    icon: 'document-text',
    iconClass: 'articles-icon',
    cardClass: 'articles-card',
    route: '/articles',
    tags: ['తత్వశాస్త్రం', 'జీవనశైలి']
  },
  {
    id: 'calendar',
    titleKey: 'vaishnavaCalendar',
    title: 'వైష్ణవ క్యాలెండర్',
    subtitle: 'పవిత్ర పండుగలు మరియు వ్రతాలు',
    description: 'సంవత్సరం పొడవునా ముఖ్యమైన పండుగలు, ఉపవాస దినాలు మరియు ఆధ్యాత్మిక ఆచరణలతో అనుసంధానంలో ఉండండి.',
    icon: 'calendar',
    iconClass: 'calendar-icon',
    cardClass: 'calendar-card',
    route: '/calender',
    tags: ['పండుగలు', 'ఉపవాసం']
  },
  {
    id: 'tutorial',
    titleKey: 'spiritualTutorials',
    title: 'ఆధ్యాత్మిక ట్యుటోరియల్స్',
    subtitle: 'పవిత్ర ఆచరణలను నేర్చుకోండి',
    description: 'ధ్యానం, జపం, దేవతా పూజ మరియు ఇతర అవసరమైన ఆధ్యాత్మిక ఆచరణల కళలో నైపుణ్యం సాధించండి.',
    icon: 'easel',
    iconClass: 'tutorial-icon',
    cardClass: 'tutorial-card',
    route: '/tutorial',
    tags: ['ధ్యానం', 'పూజ']
  },
  {
    id: 'chant',
    titleKey: 'chantHareKrishna',
    title: 'హరే కృష్ణ జపం',
    subtitle: 'పవిత్ర నామ జపం',
    description: 'మార్గదర్శక సెషన్లతో హరే కృష్ణ మహామంత్రం యొక్క రూపాంతర శక్తిని అనుభవించండి.',
    icon: 'heart',
    iconClass: 'chant-icon',
    cardClass: 'chant-card',
    route: '/chant',
    tags: ['మార్గదర్శక జపం', 'ధ్యానం']
  }
];

// Marathi Feature Cards
export const FEATURE_CARDS_MR: FeatureCard[] = [
  {
    id: 'lordkrishna',
    titleKey: 'lordKrishna',
    title: 'भगवान श्री कृष्ण',
    subtitle: 'परम पुरुषोत्तम',
    description: 'भगवान कृष्णाच्या दिव्य लीला, शिकवणी आणि शाश्वत प्रेमाचा शोध घ्या. परम आध्यात्मिक संबंधाचा अनुभव घ्या.',
    icon: 'person-circle',
    iconClass: 'krishna-icon',
    cardClass: 'krishna-card',
    route: '/lordkrishna',
    tags: ['दिव्य कथा', 'पवित्र शिकवणी']
  },
  {
    id: 'srilaprabhupada',
    titleKey: 'srilaPrabhupada',
    title: 'श्रील प्रभुपाद',
    subtitle: 'इस्कॉनचे संस्थापक आचार्य',
    description: 'पाश्चात्य जगात कृष्ण चेतना आणून देणाऱ्या क्रांतिकारी आध्यात्मिक गुरूकडून शिका.',
    icon: 'person-circle',
    iconClass: 'prabhupada-icon',
    cardClass: 'prabhupada-card',
    route: '/srilaprabhupada',
    tags: ['जीवन चरित्र', 'शिकवणी']
  },
  {
    id: 'audios',
    titleKey: 'sacredAudios',
    title: 'पवित्र ऑडिओ',
    subtitle: 'भक्ती संगीत आणि प्रवचन',
    description: 'दिव्य कीर्तन, भजन आणि महान संतांच्या ज्ञानदायी आध्यात्मिक प्रवचनांमध्ये रमा.',
    icon: 'musical-notes',
    iconClass: 'audio-icon',
    cardClass: 'audio-card',
    route: '/audios',
    tags: ['कीर्तन', 'प्रवचन', 'भजन']
  },
  {
    id: 'articles',
    titleKey: 'spiritualArticles',
    title: 'आध्यात्मिक लेख',
    subtitle: 'आधुनिक जीवनासाठी प्राचीन शहाणपण',
    description: 'तत्वज्ञान, जीवनशैली आणि दैनंदिन जीवनात वैदिक तत्वांच्या व्यावहारिक वापरावर सखोल लेख वाचा.',
    icon: 'document-text',
    iconClass: 'articles-icon',
    cardClass: 'articles-card',
    route: '/articles',
    tags: ['तत्वज्ञान', 'जीवनशैली']
  },
  {
    id: 'calendar',
    titleKey: 'vaishnavaCalendar',
    title: 'वैष्णव कॅलेंडर',
    subtitle: 'पवित्र सण आणि व्रत',
    description: 'वर्षभर महत्वाचे सण, उपवासाचे दिवस आणि आध्यात्मिक पालनांशी जुळवून राहा.',
    icon: 'calendar',
    iconClass: 'calendar-icon',
    cardClass: 'calendar-card',
    route: '/calender',
    tags: ['सण', 'उपवास']
  },
  {
    id: 'tutorial',
    titleKey: 'spiritualTutorials',
    title: 'आध्यात्मिक ट्यूटोरियल',
    subtitle: 'पवित्र प्रथा शिका',
    description: 'ध्यान, जप, देवता पूजा आणि इतर आवश्यक आध्यात्मिक प्रथांच्या कलेत प्रभुत्व मिळवा.',
    icon: 'easel',
    iconClass: 'tutorial-icon',
    cardClass: 'tutorial-card',
    route: '/tutorial',
    tags: ['ध्यान', 'पूजा']
  },
  {
    id: 'chant',
    titleKey: 'chantHareKrishna',
    title: 'हरे कृष्ण जप',
    subtitle: 'पवित्र नाम जप',
    description: 'मार्गदर्शित सत्रांसह हरे कृष्ण महामंत्राच्या परिवर्तनकारी शक्तीचा अनुभव घ्या.',
    icon: 'heart',
    iconClass: 'chant-icon',
    cardClass: 'chant-card',
    route: '/chant',
    tags: ['मार्गदर्शित जप', 'ध्यान']
  }
];

// Gujarati Feature Cards
export const FEATURE_CARDS_GU: FeatureCard[] = [
  {
    id: 'lordkrishna',
    titleKey: 'lordKrishna',
    title: 'ભગવાન શ્રી કૃષ્ણ',
    subtitle: 'પરમ પુરુષોત્તમ',
    description: 'ભગવાન કૃષ્ણની દિવ્ય લીલાઓ, શિક્ષાઓ અને શાશ્વત પ્રેમની શોધ કરો. પરમ આધ્યાત્મિક જોડાણનો અનુભવ કરો.',
    icon: 'person-circle',
    iconClass: 'krishna-icon',
    cardClass: 'krishna-card',
    route: '/lordkrishna',
    tags: ['દિવ્ય કથાઓ', 'પવિત્ર શિક્ષાઓ']
  },
  {
    id: 'srilaprabhupada',
    titleKey: 'srilaPrabhupada',
    title: 'શ્રીલ પ્રભુપાદ',
    subtitle: 'ઇસ્કોનના સ્થાપક આચાર્ય',
    description: 'પશ્ચિમી વિશ્વમાં કૃષ્ણ ચેતના લાવનાર ક્રાંતિકારી આધ્યાત્મિક ગુરુ પાસેથી શીખો.',
    icon: 'person-circle',
    iconClass: 'prabhupada-icon',
    cardClass: 'prabhupada-card',
    route: '/srilaprabhupada',
    tags: ['જીવન કથા', 'શિક્ષાઓ']
  },
  {
    id: 'audios',
    titleKey: 'sacredAudios',
    title: 'પવિત્ર ઓડિયો',
    subtitle: 'ભક્તિ સંગીત અને પ્રવચનો',
    description: 'દિવ્ય કીર્તનો, ભજનો અને મહાન સંતોના જ્ઞાનદાયક આધ્યાત્મિક પ્રવચનોમાં લીન થાઓ.',
    icon: 'musical-notes',
    iconClass: 'audio-icon',
    cardClass: 'audio-card',
    route: '/audios',
    tags: ['કીર્તનો', 'પ્રવચનો', 'ભજનો']
  },
  {
    id: 'articles',
    titleKey: 'spiritualArticles',
    title: 'આધ્યાત્મિક લેખો',
    subtitle: 'આધુનિક જીવન માટે પ્રાચીન જ્ઞાન',
    description: 'તત્વજ્ઞાન, જીવનશૈલી અને દૈનિક જીવનમાં વૈદિક સિદ્ધાંતોના વ્યવહારિક ઉપયોગ પર ગહન લેખો વાંચો.',
    icon: 'document-text',
    iconClass: 'articles-icon',
    cardClass: 'articles-card',
    route: '/articles',
    tags: ['તત્વજ્ઞાન', 'જીવનશૈલી']
  },
  {
    id: 'calendar',
    titleKey: 'vaishnavaCalendar',
    title: 'વૈષ્ણવ કેલેન્ડર',
    subtitle: 'પવિત્ર તહેવારો અને વ્રતો',
    description: 'વર્ષભર મહત્વના તહેવારો, ઉપવાસના દિવસો અને આધ્યાત્મિક પાલનો સાથે જોડાયેલા રહો.',
    icon: 'calendar',
    iconClass: 'calendar-icon',
    cardClass: 'calendar-card',
    route: '/calender',
    tags: ['તહેવારો', 'ઉપવાસ']
  },
  {
    id: 'tutorial',
    titleKey: 'spiritualTutorials',
    title: 'આધ્યાત્મિક ટ્યુટોરિયલ્સ',
    subtitle: 'પવિત્ર પ્રથાઓ શીખો',
    description: 'ધ્યાન, જપ, દેવતાની પૂજા અને અન્ય આવશ્યક આધ્યાત્મિક પ્રથાઓની કળામાં નિપુણતા મેળવો.',
    icon: 'easel',
    iconClass: 'tutorial-icon',
    cardClass: 'tutorial-card',
    route: '/tutorial',
    tags: ['ધ્યાન', 'પૂજા']
  },
  {
    id: 'chant',
    titleKey: 'chantHareKrishna',
    title: 'હરે કૃષ્ણ જપ',
    subtitle: 'પવિત્ર નામ જપ',
    description: 'માર્ગદર્શિત સત્રો સાથે હરે કૃષ્ણ મહામંત્રની પરિવર્તનકારી શક્તિનો અનુભવ કરો.',
    icon: 'heart',
    iconClass: 'chant-icon',
    cardClass: 'chant-card',
    route: '/chant',
    tags: ['માર્ગદર્શિત જપ', 'ધ્યાન']
  }
];

// Kannada Feature Cards
export const FEATURE_CARDS_KN: FeatureCard[] = [
  {
    id: 'lordkrishna',
    titleKey: 'lordKrishna',
    title: 'ಭಗವಾನ್ ಶ್ರೀ ಕೃಷ್ಣ',
    subtitle: 'ಪರಮ ಪುರುಷೋತ್ತಮ',
    description: 'ಭಗವಾನ್ ಕೃಷ್ಣನ ದಿವ್ಯ ಲೀಲೆಗಳು, ಬೋಧನೆಗಳು ಮತ್ತು ಶಾಶ್ವತ ಪ್ರೀತಿಯನ್ನು ಅನ್ವೇಷಿಸಿ. ಅತ್ಯುನ್ನತ ಆಧ್ಯಾತ್ಮಿಕ ಸಂಪರ್ಕವನ್ನು ಅನುಭವಿಸಿ.',
    icon: 'person-circle',
    iconClass: 'krishna-icon',
    cardClass: 'krishna-card',
    route: '/lordkrishna',
    tags: ['ದಿವ್ಯ ಕಥೆಗಳು', 'ಪವಿತ್ರ ಬೋಧನೆಗಳು']
  },
  {
    id: 'srilaprabhupada',
    titleKey: 'srilaPrabhupada',
    title: 'ಶ್ರೀಲ ಪ್ರಭುಪಾದ',
    subtitle: 'ಇಸ್ಕಾನ್ ಸ್ಥಾಪಕ ಆಚಾರ್ಯ',
    description: 'ಪಾಶ್ಚಾತ್ಯ ಪ್ರಪಂಚಕ್ಕೆ ಕೃಷ್ಣ ಪ್ರಜ್ಞೆಯನ್ನು ತಂದ ಕ್ರಾಂತಿಕಾರಿ ಆಧ್ಯಾತ್ಮಿಕ ಗುರುವಿನಿಂದ ಕಲಿಯಿರಿ.',
    icon: 'person-circle',
    iconClass: 'prabhupada-icon',
    cardClass: 'prabhupada-card',
    route: '/srilaprabhupada',
    tags: ['ಜೀವನ ಚರಿತ್ರೆ', 'ಬೋಧನೆಗಳು']
  },
  {
    id: 'audios',
    titleKey: 'sacredAudios',
    title: 'ಪವಿತ್ರ ಆಡಿಯೋಗಳು',
    subtitle: 'ಭಕ್ತಿ ಸಂಗೀತ ಮತ್ತು ಉಪನ್ಯಾಸಗಳು',
    description: 'ದಿವ್ಯ ಕೀರ್ತನೆಗಳು, ಭಜನೆಗಳು ಮತ್ತು ಮಹಾನ್ ಸಂತರ ಜ್ಞಾನದಾಯಕ ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರವಚನಗಳಲ್ಲಿ ಮುಳುಗಿರಿ.',
    icon: 'musical-notes',
    iconClass: 'audio-icon',
    cardClass: 'audio-card',
    route: '/audios',
    tags: ['ಕೀರ್ತನೆಗಳು', 'ಪ್ರವಚನಗಳು', 'ಭಜನೆಗಳು']
  },
  {
    id: 'articles',
    titleKey: 'spiritualArticles',
    title: 'ಆಧ್ಯಾತ್ಮಿಕ ಲೇಖನಗಳು',
    subtitle: 'ಆಧುನಿಕ ಜೀವನಕ್ಕಾಗಿ ಪ್ರಾಚೀನ ಜ್ಞಾನ',
    description: 'ತತ್ವಶಾಸ್ತ್ರ, ಜೀವನಶೈಲಿ ಮತ್ತು ದೈನಂದಿನ ಜೀವನದಲ್ಲಿ ವೈದಿಕ ತತ್ವಗಳ ಪ್ರಾಯೋಗಿಕ ಅನ್ವಯದ ಬಗ್ಗೆ ಆಳವಾದ ಲೇಖನಗಳನ್ನು ಓದಿ.',
    icon: 'document-text',
    iconClass: 'articles-icon',
    cardClass: 'articles-card',
    route: '/articles',
    tags: ['ತತ್ವಶಾಸ್ತ್ರ', 'ಜೀವನಶೈಲಿ']
  },
  {
    id: 'calendar',
    titleKey: 'vaishnavaCalendar',
    title: 'ವೈಷ್ಣವ ಕ್ಯಾಲೆಂಡರ್',
    subtitle: 'ಪವಿತ್ರ ಹಬ್ಬಗಳು ಮತ್ತು ವ್ರತಗಳು',
    description: 'ವರ್ಷದುದ್ದಕ್ಕೂ ಮುಖ್ಯವಾದ ಹಬ್ಬಗಳು, ಉಪವಾಸ ದಿನಗಳು ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಆಚರಣೆಗಳೊಂದಿಗೆ ಸಂಪರ್ಕದಲ್ಲಿರಿ.',
    icon: 'calendar',
    iconClass: 'calendar-icon',
    cardClass: 'calendar-card',
    route: '/calender',
    tags: ['ಹಬ್ಬಗಳು', 'ಉಪವಾಸ']
  },
  {
    id: 'tutorial',
    titleKey: 'spiritualTutorials',
    title: 'ಆಧ್ಯಾತ್ಮಿಕ ಟ್ಯುಟೋರಿಯಲ್‌ಗಳು',
    subtitle: 'ಪವಿತ್ರ ಅಭ್ಯಾಸಗಳನ್ನು ಕಲಿಯಿರಿ',
    description: 'ಧ್ಯಾನ, ಜಪ, ದೇವತಾ ಪೂಜೆ ಮತ್ತು ಇತರ ಅಗತ್ಯವಾದ ಆಧ್ಯಾತ್ಮಿಕ ಅಭ್ಯಾಸಗಳ ಕಲೆಯಲ್ಲಿ ಪ್ರಾವೀಣ್ಯತೆ ಗಳಿಸಿ.',
    icon: 'easel',
    iconClass: 'tutorial-icon',
    cardClass: 'tutorial-card',
    route: '/tutorial',
    tags: ['ಧ್ಯಾನ', 'ಪೂಜೆ']
  },
  {
    id: 'chant',
    titleKey: 'chantHareKrishna',
    title: 'ಹರೇ ಕೃಷ್ಣ ಜಪ',
    subtitle: 'ಪವಿತ್ರ ನಾಮ ಜಪ',
    description: 'ಮಾರ್ಗದರ್ಶಿ ಸೆಷನ್‌ಗಳೊಂದಿಗೆ ಹರೇ ಕೃಷ್ಣ ಮಹಾಮಂತ್ರದ ರೂಪಾಂತರಿತ ಶಕ್ತಿಯನ್ನು ಅನುಭವಿಸಿ.',
    icon: 'heart',
    iconClass: 'chant-icon',
    cardClass: 'chant-card',
    route: '/chant',
    tags: ['ಮಾರ್ಗದರ್ಶಿ ಜಪ', 'ಧ್ಯಾನ']
  }
];

// Malayalam Feature Cards
export const FEATURE_CARDS_ML: FeatureCard[] = [
  {
    id: 'lordkrishna',
    titleKey: 'lordKrishna',
    title: 'ഭഗവാൻ ശ്രീ കൃഷ്ണൻ',
    subtitle: 'പരമ പുരുഷോത്തമൻ',
    description: 'ഭഗവാൻ കൃഷ്ണന്റെ ദിവ്യ ലീലകൾ, ബോധനകൾ, നിത്യ സ്നേഹം എന്നിവ അന്വേഷിക്കുക. പരമമായ ആത്മീയ ബന്ധം അനുഭവിക്കുക.',
    icon: 'person-circle',
    iconClass: 'krishna-icon',
    cardClass: 'krishna-card',
    route: '/lordkrishna',
    tags: ['ദിവ്യ കഥകൾ', 'പവിത്ര ബോധനകൾ']
  },
  {
    id: 'srilaprabhupada',
    titleKey: 'srilaPrabhupada',
    title: 'ശ്രീല പ്രഭുപാദ',
    subtitle: 'ഇസ്കോൺ സ്ഥാപക ആചാര്യൻ',
    description: 'പാശ്ചാത്യ ലോകത്തിനു കൃഷ്ണചൈതന്യം കൊണ്ടുവന്ന വിപ്ലവകാരിയായ ആത്മീയ ഗുരുവിനിൽ നിന്നു പഠിക്കുക.',
    icon: 'person-circle',
    iconClass: 'prabhupada-icon',
    cardClass: 'prabhupada-card',
    route: '/srilaprabhupada',
    tags: ['ജീവിത ചരിത്രം', 'ബോധനകൾ']
  },
  {
    id: 'audios',
    titleKey: 'sacredAudios',
    title: 'പവിത്ര ഓഡിയോകൾ',
    subtitle: 'ഭക്തി സംഗീതവും പ്രഭാഷണങ്ങളും',
    description: 'ദിവ്യ കീർത്തനങ്ങൾ, ഭജനങ്ങൾ, മഹാന്മാരുടെ ജ്ഞാനദായകമായ ആത്മീയ പ്രസംഗങ്ങൾ എന്നിവയിൽ മുഴുകുക.',
    icon: 'musical-notes',
    iconClass: 'audio-icon',
    cardClass: 'audio-card',
    route: '/audios',
    tags: ['കീർത്തനങ്ങൾ', 'പ്രഭാഷണങ്ങൾ', 'ഭജനങ്ങൾ']
  },
  {
    id: 'articles',
    titleKey: 'spiritualArticles',
    title: 'ആത്മീയ ലേഖനങ്ങൾ',
    subtitle: 'ആധുനിക ജീവിതത്തിനുള്ള പുരാതന ജ്ഞാനം',
    description: 'തത്വശാസ്ത്രം, ജീവിതശൈലി, ദൈനംദിന ജീവിതത്തിൽ വൈദിക തത്വങ്ങളുടെ പ്രായോഗിക പ്രയോഗം എന്നിവയെക്കുറിച്ചുള്ള ആഴത്തിലുള്ള ലേഖനങ്ങൾ വായിക്കുക.',
    icon: 'document-text',
    iconClass: 'articles-icon',
    cardClass: 'articles-card',
    route: '/articles',
    tags: ['തത്വശാസ്ത്രം', 'ജീവിതശൈലി']
  },
  {
    id: 'calendar',
    titleKey: 'vaishnavaCalendar',
    title: 'വൈഷ്ണവ കലണ്ടർ',
    subtitle: 'പവിത്ര ഉത്സവങ്ങളും നോമ്പുകളും',
    description: 'വർഷം മുഴുവൻ പ്രധാനപ്പെട്ട ഉത്സവങ്ങൾ, ഉപവാസ ദിനങ്ങൾ, ആത്മീയ ആചരണങ്ങൾ എന്നിവയുമായി ബന്ധത്തിൽ നിൽക്കുക.',
    icon: 'calendar',
    iconClass: 'calendar-icon',
    cardClass: 'calendar-card',
    route: '/calender',
    tags: ['ഉത്സവങ്ങൾ', 'ഉപവാസം']
  },
  {
    id: 'tutorial',
    titleKey: 'spiritualTutorials',
    title: 'ആത്മീയ ട്യൂട്ടോറിയലുകൾ',
    subtitle: 'പവിത്ര പരിശീലനങ്ങൾ പഠിക്കുക',
    description: 'ധ്യാനം, ജപം, ദേവതാ പൂജ, മറ്റു അത്യാവശ്യ ആത്മീയ പരിശീലനങ്ങൾ എന്നിവയുടെ കലയിൽ വൈദഗ്ധ്യം നേടുക.',
    icon: 'easel',
    iconClass: 'tutorial-icon',
    cardClass: 'tutorial-card',
    route: '/tutorial',
    tags: ['ധ്യാനം', 'പൂജ']
  },
  {
    id: 'chant',
    titleKey: 'chantHareKrishna',
    title: 'ഹരേ കൃഷ്ണ ജപം',
    subtitle: 'പവിത്ര നാമ ജപം',
    description: 'മാർഗദർശിത സെഷനുകളോടൊപ്പം ഹരേ കൃഷ്ണ മഹാമന്ത്രത്തിന്റെ രൂപാന്തരപ്പെടുത്തുന്ന ശക്തി അനുഭവിക്കുക.',
    icon: 'heart',
    iconClass: 'chant-icon',
    cardClass: 'chant-card',
    route: '/chant',
    tags: ['മാർഗദർശിത ജപം', 'ധ്യാനം']
  }
];

// Get feature cards based on language
export function getFeatureCardsByLanguage(language: SupportedLanguage): FeatureCard[] {
  switch (language) {
    case 'ta':
      return FEATURE_CARDS_TA;
    case 'hi':
      return FEATURE_CARDS_HI;
    case 'bn':
      return FEATURE_CARDS_BN;
    case 'te':
      return FEATURE_CARDS_TE;
    case 'mr':
      return FEATURE_CARDS_MR;
    case 'gu':
      return FEATURE_CARDS_GU;
    case 'kn':
      return FEATURE_CARDS_KN;
    case 'ml':
      return FEATURE_CARDS_ML;
    case 'en':
    default:
      return FEATURE_CARDS_EN;
  }
}

// Backward compatibility
export const FEATURE_CARDS = FEATURE_CARDS_EN;
