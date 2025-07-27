import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonMenuButton, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonButton,
  IonIcon,
  IonProgressBar,
  IonFab,
  IonFabButton,
  IonAlert,
  IonToast,
  IonPopover
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  flowerOutline, 
  refreshOutline,
  languageOutline,
  closeOutline
} from 'ionicons/icons';
import { ThemeService, ThemeType } from '../services/theme.service';
import { Subscription } from 'rxjs';

// Language types and interface
export type LanguageType = 'english' | 'tamil' | 'hindi' | 'telugu' | 'kannada' | 'malayalam' | 'marathi' | 'gujarati' | 'bengali' | 'punjabi' | 'urdu';

export interface LanguageOption {
  key: LanguageType;
  flag: string;
  name: string;
  description: string;
}

export interface LanguageContent {
  pageTitle: string;
  currentRound: string;
  roundsCompleted: string;
  mahaRounds: string;
  progressText: string;
  dailyGoal: string;
  dailyGoalProgress: string;
  chantText: string;
  chantSubtext: string;
  mahamantra1: string;
  mahamantra2: string;
  resetCurrentRoundToast: string;
  resetRoundsCompletedToast: string;
  resetMahaRoundsToast: string;
  resetAllProgressToast: string;
  roundCompleteToast: string;
  mahaRoundCompleteToast: string;
  resetAllConfirmTitle: string;
  resetAllConfirmMessage: string;
}

@Component({
  selector: 'app-chant',
  templateUrl: './chant.page.html',
  styleUrls: ['./chant.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonMenuButton, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons,
    IonButton,
    IonIcon,
    IonProgressBar,
    IonFab,
    IonFabButton,
    IonAlert,
    IonToast,
    IonPopover,
    CommonModule, 
    FormsModule
  ]
})
export class ChantPage implements OnInit, OnDestroy {
  @HostBinding('class') get themeClass() {
    return this.currentTheme;
  }

  // Theme management
  currentTheme: ThemeType = 'theme-royal';
  private themeSubscription: Subscription = new Subscription();

  // Language management
  currentLanguage: LanguageType = 'english';
  isLanguageSelectorOpen: boolean = false;
  presentingElement: HTMLElement | undefined = undefined;
  
  // Language options for the selector
  languageOptions: LanguageOption[] = [
    { key: 'english', flag: '🇬🇧', name: 'English', description: 'Mahamantra Chanting' },
    { key: 'tamil', flag: '🇮🇳', name: 'தமிழ்', description: 'மகாமந்திர ஜபம்' },
    { key: 'hindi', flag: '🇮🇳', name: 'हिंदी', description: 'महामंत्र जप' },
    { key: 'telugu', flag: '🇮🇳', name: 'తెలుగు', description: 'మహామంత్ర జపం' },
    { key: 'kannada', flag: '🇮🇳', name: 'ಕನ್ನಡ', description: 'ಮಹಾಮಂತ್ರ ಜಪ' },
    { key: 'malayalam', flag: '🇮🇳', name: 'മലയാളം', description: 'മഹാമന്ത്ര ജപം' },
    { key: 'marathi', flag: '🇮🇳', name: 'मराठी', description: 'महामंत्र जप' },
    { key: 'gujarati', flag: '🇮🇳', name: 'ગુજરાતી', description: 'મહામંત્ર જપ' },
    { key: 'bengali', flag: '🇮🇳', name: 'বাংলা', description: 'মহামন্ত্র জপ' },
    { key: 'punjabi', flag: '🇮🇳', name: 'ਪੰਜਾਬੀ', description: 'ਮਹਾਮੰਤਰ ਜਪ' },
    { key: 'urdu', flag: '🇵🇰', name: 'اردو', description: 'مہامنتر جپ' }
  ];
  
  // Language content arrays
  private languageContent: Record<LanguageType, LanguageContent> = {
    english: {
      pageTitle: '🕉️ Mahamantra Chanting',
      currentRound: 'Current Round',
      roundsCompleted: 'Rounds Completed',
      mahaRounds: 'Maha Rounds',
      progressText: 'chants in current round',
      dailyGoal: 'Daily Goal (16 Rounds)',
      dailyGoalProgress: 'rounds completed',
      chantText: 'CHANT',
      chantSubtext: 'Hare Krishna',
      mahamantra1: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare',
      mahamantra2: 'Hare Rama Hare Rama Rama Rama Hare Hare',
      resetCurrentRoundToast: '🔄 Current round reset! 🙏',
      resetRoundsCompletedToast: '🔄 Rounds completed reset! 🙏',
      resetMahaRoundsToast: '🔄 Maha rounds reset! 🙏',
      resetAllProgressToast: '🔄 All progress reset successfully! 🙏',
      roundCompleteToast: '🎉 Congratulations! Lord Krishna is pleased with you!! 🙏',
      mahaRoundCompleteToast: '🌟 Congratulations! Sri Prabhupada is pleased with you!! 🙏✨',
      resetAllConfirmTitle: 'Reset All Progress',
      resetAllConfirmMessage: 'Are you sure you want to reset ALL your chanting progress? This will reset Current Round, Rounds Completed, and Maha Rounds. This action cannot be undone.'
    },
    tamil: {
      pageTitle: '🕉️ மகாமந்திர ஜபம்',
      currentRound: 'தற்போதைய சுற்று',
      roundsCompleted: 'முடிந்த சுற்றுகள்',
      mahaRounds: 'மகா சுற்றுகள்',
      progressText: 'தற்போதைய சுற்றில் ஜபங்கள்',
      dailyGoal: 'தினசரி இலக்கு (16 சுற்றுகள்)',
      dailyGoalProgress: 'சுற்றுகள் முடிந்தது',
      chantText: 'ஜபம்',
      chantSubtext: 'ஹரே கிருஷ்ணா',
      mahamantra1: 'ஹரே கிருஷ்ணா ஹரே கிருஷ்ணா கிருஷ்ணா கிருஷ்ணா ஹரே ஹரே',
      mahamantra2: 'ஹரே ராமா ஹரே ராமா ராமா ராமா ஹரே ஹரே',
      resetCurrentRoundToast: '🔄 தற்போதைய சுற்று மீட்டமைக்கப்பட்டது! 🙏',
      resetRoundsCompletedToast: '🔄 முடிந்த சுற்றுகள் மீட்டமைக்கப்பட்டது! 🙏',
      resetMahaRoundsToast: '🔄 மகா சுற்றுகள் மீட்டமைக்கப்பட்டது! 🙏',
      resetAllProgressToast: '🔄 அனைத்து முன்னேற்றமும் வெற்றிகரமாக மீட்டமைக்கப்பட்டது! 🙏',
      roundCompleteToast: '🎉 வாழ்த்துக்கள்! கிருஷ்ண பகவான் உங்களை மகிழ்வித்துள்ளார்!! 🙏',
      mahaRoundCompleteToast: '🌟 வாழ்த்துக்கள்! ஸ்ரீல பிரபுபாதர் உங்களை மகிழ்வித்துள்ளார்!! 🙏✨',
      resetAllConfirmTitle: 'அனைத்து முன்னேற்றத்தையும் மீட்டமை',
      resetAllConfirmMessage: 'உங்கள் அனைத்து ஜப முன்னேற்றத்தையும் மீட்டமைக்க நீங்கள் உறுதியாக இருக்கிறீர்களா? இது தற்போதைய சுற்று, முடிந்த சுற்றுகள் மற்றும் மகா சுற்றுகளை மீட்டமைக்கும். இந்த செயலை செயல்தவிர்க்க முடியாது.'
    },
    hindi: {
      pageTitle: '🕉️ महामंत्र जप',
      currentRound: 'वर्तमान चक्र',
      roundsCompleted: 'पूर्ण चक्र',
      mahaRounds: 'महा चक्र',
      progressText: 'वर्तमान चक्र में जप',
      dailyGoal: 'दैनिक लक्ष्य (16 चक्र)',
      dailyGoalProgress: 'चक्र पूर्ण',
      chantText: 'जप',
      chantSubtext: 'हरे कृष्ण',
      mahamantra1: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे',
      mahamantra2: 'हरे राम हरे राम राम राम हरे हरे',
      resetCurrentRoundToast: '🔄 वर्तमान चक्र रीसेट हो गया! 🙏',
      resetRoundsCompletedToast: '🔄 पूर्ण चक्र रीसेट हो गए! 🙏',
      resetMahaRoundsToast: '🔄 महा चक्र रीसेट हो गए! 🙏',
      resetAllProgressToast: '🔄 सभी प्रगति सफलतापूर्वक रीसेट हो गई! 🙏',
      roundCompleteToast: '🎉 बधाई हो! भगवान कृष्ण आपसे प्रसन्न हैं!! 🙏',
      mahaRoundCompleteToast: '🌟 बधाई हो! श्रील प्रभुपाद आपसे प्रसन्न हैं!! 🙏✨',
      resetAllConfirmTitle: 'सभी प्रगति रीसेट करें',
      resetAllConfirmMessage: 'क्या आप वाकई अपनी सभी जप प्रगति को रीसेट करना चाहते हैं? यह वर्तमान चक्र, पूर्ण चक्र और महा चक्र को रीसेट कर देगा। यह क्रिया पूर्ववत नहीं की जा सकती।'
    },
    telugu: {
      pageTitle: '🕉️ మహామంత్ర జపం',
      currentRound: 'ప్రస్తుత చక్రం',
      roundsCompleted: 'పూర్తయిన చక్రాలు',
      mahaRounds: 'మహా చక్రాలు',
      progressText: 'ప్రస్తుత చక్రంలో జపాలు',
      dailyGoal: 'దైనందిన లక్ష్యం (16 చక్రాలు)',
      dailyGoalProgress: 'చక్రాలు పూర్తయింది',
      chantText: 'జపం',
      chantSubtext: 'హరే కృష్ణ',
      mahamantra1: 'హరే కృష్ణ హరే కృష్ణ కృష్ణ కృష్ణ హరే హరే',
      mahamantra2: 'హరే రామ హరే రామ రామ రామ హరే హరే',
      resetCurrentRoundToast: '🔄 ప్రస్తుత చక్రం రీసెట్ అయింది! 🙏',
      resetRoundsCompletedToast: '🔄 పూర్తయిన చక్రాలు రీసెట్ అయ్యాయి! 🙏',
      resetMahaRoundsToast: '🔄 మహా చక్రాలు రీసెట్ అయ్యాయి! 🙏',
      resetAllProgressToast: '🔄 అన్ని ప్రగతి విజయవంతంగా రీసెట్ అయింది! 🙏',
      roundCompleteToast: '🎉 అభినందనలు! శ్రీ కృష్ణ భగవాన్ మీతో సంతోషంగా ఉన్నారు!! 🙏',
      mahaRoundCompleteToast: '🌟 అభినందనలు! శ్రీ ప్రభుపాద్ మీతో సంతోషంగా ఉన్నారు!! 🙏✨',
      resetAllConfirmTitle: 'అన్ని ప్రగతిని రీసెట్ చేయండి',
      resetAllConfirmMessage: 'మీరు మీ అన్ని జప ప్రగతిని రీసెట్ చేయాలనుకుంటున్నారా? ఇది ప్రస్తుత చక్రం, పూర్తయిన చక్రాలు మరియు మహా చక్రాలను రీసెట్ చేస్తుంది. ఈ చర్యను తిరిగి తీసుకోలేము.'
    },
    kannada: {
      pageTitle: '🕉️ ಮಹಾಮಂತ್ರ ಜಪ',
      currentRound: 'ಪ್ರಸ್ತುತ ಚಕ್ರ',
      roundsCompleted: 'ಪೂರ್ಣಗೊಂಡ ಚಕ್ರಗಳು',
      mahaRounds: 'ಮಹಾ ಚಕ್ರಗಳು',
      progressText: 'ಪ್ರಸ್ತುತ ಚಕ್ರದಲ್ಲಿ ಜಪಗಳು',
      dailyGoal: 'ದೈನಂದಿನ ಗುರಿ (16 ಚಕ್ರಗಳು)',
      dailyGoalProgress: 'ಚಕ್ರಗಳು ಪೂರ್ಣಗೊಂಡವು',
      chantText: 'ಜಪ',
      chantSubtext: 'ಹರೇ ಕೃಷ್ಣ',
      mahamantra1: 'ಹರೇ ಕೃಷ್ಣ ಹರೇ ಕೃಷ್ಣ ಕೃಷ್ಣ ಕೃಷ್ಣ ಹರೇ ಹರೇ',
      mahamantra2: 'ಹರೇ ರಾಮ ಹರೇ ರಾಮ ರಾಮ ರಾಮ ಹರೇ ಹರೇ',
      resetCurrentRoundToast: '🔄 ಪ್ರಸ್ತುತ ಚಕ್ರವನ್ನು ಮರುಸೆಟ್ ಮಾಡಲಾಗಿದೆ! 🙏',
      resetRoundsCompletedToast: '🔄 ಪೂರ್ಣಗೊಂಡ ಚಕ್ರಗಳನ್ನು ಮರುಸೆಟ್ ಮಾಡಲಾಗಿದೆ! 🙏',
      resetMahaRoundsToast: '🔄 ಮಹಾ ಚಕ್ರಗಳನ್ನು ಮರುಸೆಟ್ ಮಾಡಲಾಗಿದೆ! 🙏',
      resetAllProgressToast: '🔄 ಎಲ್ಲಾ ಪ್ರಗತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಮರುಸೆಟ್ ಮಾಡಲಾಗಿದೆ! 🙏',
      roundCompleteToast: '🎉 ಅಭಿನಂದನೆಗಳು! ಶ್ರೀ ಕೃಷ್ಣ ಭಗವಾನ್ ನಿಮ್ಮಿಂದ ಸಂತೋಷಗೊಂಡಿದ್ದಾರೆ!! 🙏',
      mahaRoundCompleteToast: '🌟 ಅಭಿನಂದನೆಗಳು! ಶ್ರೀಲ ಪ್ರಭುಪಾದ ನಿಮ್ಮಿಂದ ಸಂತೋಷಗೊಂಡಿದ್ದಾರೆ!! 🙏✨',
      resetAllConfirmTitle: 'ಎಲ್ಲಾ ಪ್ರಗತಿಯನ್ನು ಮರುಸೆಟ್ ಮಾಡಿ',
      resetAllConfirmMessage: 'ನೀವು ನಿಮ್ಮ ಎಲ್ಲಾ ಜಪ ಪ್ರಗತಿಯನ್ನು ಮರುಸೆಟ್ ಮಾಡಲು ಖಚಿತವಾಗಿದ್ದೀರಾ? ಇದು ಪ್ರಸ್ತುತ ಚಕ್ರ, ಪೂರ್ಣಗೊಂಡ ಚಕ್ರಗಳು ಮತ್ತು ಮಹಾ ಚಕ್ರಗಳನ್ನು ಮರುಸೆಟ್ ಮಾಡುತ್ತದೆ. ಈ ಕ್ರಿಯೆಯನ್ನು ಹಿಂದಿರುಗಿಸಲಾಗುವುದಿಲ್ಲ.'
    },
    malayalam: {
      pageTitle: '🕉️ മഹാമന്ത്ര ജപം',
      currentRound: 'നിലവിലെ ചക്രം',
      roundsCompleted: 'പൂർത്തിയായ ചക്രങ്ങൾ',
      mahaRounds: 'മഹാ ചക്രങ്ങൾ',
      progressText: 'നിലവിലെ ചക്രത്തിൽ ജപങ്ങൾ',
      dailyGoal: 'ദൈനംദിന ലക്ഷ്യം (16 ചക്രങ്ങൾ)',
      dailyGoalProgress: 'ചക്രങ്ങൾ പൂർത്തിയായി',
      chantText: 'ജപം',
      chantSubtext: 'ഹരേ കൃഷ്ണ',
      mahamantra1: 'ഹരേ കൃഷ്ണ ഹരേ കൃഷ്ണ കൃഷ്ണ കൃഷ്ണ ഹരേ ഹരേ',
      mahamantra2: 'ഹരേ രാമ ഹരേ രാമ രാമ രാമ ഹരേ ഹരേ',
      resetCurrentRoundToast: '🔄 നിലവിലെ ചക്രം റീസെറ്റ് ചെയ്തു! 🙏',
      resetRoundsCompletedToast: '🔄 പൂർത്തിയായ ചക്രങ്ങൾ റീസെറ്റ് ചെയ്തു! 🙏',
      resetMahaRoundsToast: '🔄 മഹാ ചക്രങ്ങൾ റീസെറ്റ് ചെയ്തു! 🙏',
      resetAllProgressToast: '🔄 എല്ലാ പുരോഗതിയും വിജയകരമായി റീസെറ്റ് ചെയ്തു! 🙏',
      roundCompleteToast: '🎉 അഭിനന്ദനങ്ങൾ! ശ്രീ കൃഷ്ണ ഭഗവാൻ നിങ്ങളിൽ സന്തോഷത്തിലാണ്!! 🙏',
      mahaRoundCompleteToast: '🌟 അഭിനന്ദനങ്ങൾ! ശ്രീല പ്രഭുപാദ് നിങ്ങളിൽ സന്തോഷത്തിലാണ്!! 🙏✨',
      resetAllConfirmTitle: 'എല്ലാ പുരോഗതിയും റീസെറ്റ് ചെയ്യുക',
      resetAllConfirmMessage: 'നിങ്ങൾ നിങ്ങളുടെ എല്ലാ ജപ പുരോഗതിയും റീസെറ്റ് ചെയ്യാൻ ഉറപ്പാണോ? ഇത് നിലവിലെ ചക്രം, പൂർത്തിയായ ചക്രങ്ങൾ, മഹാ ചക്രങ്ങൾ എന്നിവയെ റീസെറ്റ് ചെയ്യും. ഈ പ്രവർത്തനം പിൻവലിക്കാൻ കഴിയില്ല.'
    },
    marathi: {
      pageTitle: '🕉️ महामंत्र जप',
      currentRound: 'वर्तमान चक्र',
      roundsCompleted: 'पूर्ण झालेले चक्रे',
      mahaRounds: 'महा चक्रे',
      progressText: 'वर्तमान चक्रात जप',
      dailyGoal: 'दैनिक लक्ष्य (16 चक्रे)',
      dailyGoalProgress: 'चक्रे पूर्ण झाली',
      chantText: 'जप',
      chantSubtext: 'हरे कृष्ण',
      mahamantra1: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे',
      mahamantra2: 'हरे राम हरे राम राम राम हरे हरे',
      resetCurrentRoundToast: '🔄 वर्तमान चक्र रीसेट झाले! 🙏',
      resetRoundsCompletedToast: '🔄 पूर्ण झालेले चक्रे रीसेट झाली! 🙏',
      resetMahaRoundsToast: '🔄 महा चक्रे रीसेट झाली! 🙏',
      resetAllProgressToast: '🔄 सर्व प्रगती यशस्वीरित्या रीसेट झाली! 🙏',
      roundCompleteToast: '🎉 अभिनंदन! भगवान कृष्ण आपल्यावर आनंदित आहेत!! 🙏',
      mahaRoundCompleteToast: '🌟 अभिनंदन! श्रील प्रभुपाद आपल्यावर आनंदित आहेत!! 🙏✨',
      resetAllConfirmTitle: 'सर्व प्रगती रीसेट करा',
      resetAllConfirmMessage: 'आपण आपल्या सर्व जप प्रगती रीसेट करू इच्छिता का? हे वर्तमान चक्र, पूर्ण झालेले चक्रे आणि महा चक्रे रीसेट करेल. ही क्रिया पूर्ववत केली जाऊ शकत नाही.'
    },
    bengali: {
      pageTitle: '🕉️ মহামন্ত্র জপ',
      currentRound: 'বর্তমান চক্র',
      roundsCompleted: 'সম্পন্ন চক্র',
      mahaRounds: 'মহা চক্র',
      progressText: 'বর্তমান চক্রে জপ',
      dailyGoal: 'দৈনিক লক্ষ্য (16 চক্র)',
      dailyGoalProgress: 'চক্র সম্পন্ন',
      chantText: 'জপ',
      chantSubtext: 'হরে কৃষ্ণ',
      mahamantra1: 'হরে কৃষ্ণ হরে কৃষ্ণ কৃষ্ণ কৃষ্ণ হরে হরে',
      mahamantra2: 'হরে রাম হরে রাম রাম রাম হরে হরে',
      resetCurrentRoundToast: '🔄 বর্তমান চক্র রিসেট হয়েছে! 🙏',
      resetRoundsCompletedToast: '🔄 সম্পন্ন চক্র রিসেট হয়েছে! 🙏',
      resetMahaRoundsToast: '🔄 মহা চক্র রিসেট হয়েছে! 🙏',
      resetAllProgressToast: '🔄 সমস্ত প্রগতি সফলভাবে রিসেট হয়েছে! 🙏',
      roundCompleteToast: '🎉 অভিনন্দন! ভগবান কৃষ্ণ আপনার উপর আনন্দিত! 🙏',
      mahaRoundCompleteToast: '🌟 অভিনন্দন! শ্রীল প্রভুপাদ আপনার উপর আনন্দিত! 🙏✨',
      resetAllConfirmTitle: 'সমস্ত প্রগতি রিসেট করুন',
      resetAllConfirmMessage: 'আপনি কি আপনার সমস্ত জপ প্রগতি রিসেট করতে নিশ্চিত? এটি বর্তমান চক্র, সম্পন্ন চক্র এবং মহা চক্র রিসেট করবে। এই ক্রিয়া পূর্বাবস্থায় ফিরিয়ে নেওয়া যাবে না।'
    },
    gujarati: {
      pageTitle: '🕉️ મહામંત્ર જપ',
      currentRound: 'વર્તમાન ચક્ર',
      roundsCompleted: 'પૂર્ણ થયેલ ચક્રો',
      mahaRounds: 'મહા ચક્રો',
      progressText: 'વર્તમાન ચક્રમાં જપ',
      dailyGoal: 'દૈનિક લક્ષ્ય (16 ચક્રો)',
      dailyGoalProgress: 'ચક્રો પૂર્ણ થયેલ',
      chantText: 'જપ',
      chantSubtext: 'હરે કૃષ્ણ',
      mahamantra1: 'હરે કૃષ્ણ હરે કૃષ્ણ કૃષ્ણ કૃષ્ણ હરે હરે',
      mahamantra2: 'હરે રામ હરે રામ રામ રામ હરે હરે',
      resetCurrentRoundToast: '🔄 વર્તમાન ચક્ર રીસેટ થયું! 🙏',
      resetRoundsCompletedToast: '🔄 પૂર્ણ થયેલ ચક્રો રીસેટ થયા! 🙏',
      resetMahaRoundsToast: '🔄 મહા ચક્રો રીસેટ થયા! 🙏',
      resetAllProgressToast: '🔄 તમામ પ્રગતિ સફળતાપૂર્વક રીસેટ થઈ! 🙏',
      roundCompleteToast: '🎉 અભિનંદન! ભગવાન કૃષ્ણ તમારા પર આનંદિત છે!! 🙏',
      mahaRoundCompleteToast: '🌟 અભિનંદન! શ્રીલ પ્રભુપાદ તમારા પર આનંદિત છે!! 🙏✨',
      resetAllConfirmTitle: 'તમામ પ્રગતિ રીસેટ કરો',
      resetAllConfirmMessage: 'શું તમે તમારી તમામ જપ પ્રગતિને રીસેટ કરવા માટે ખાતરી છો? આ વર્તમાન ચક્ર, પૂર્ણ થયેલ ચક્રો અને મહા ચક્રોને રીસેટ કરશે. આ ક્રિયા પાછી ખેંચી શકાતી નથી.'
    },
    punjabi: {
      pageTitle: '🕉️ ਮਹਾਮੰਤ੍ਰ ਜਪ',
      currentRound: 'ਮੌਜੂਦਾ ਚੱਕਰ',
      roundsCompleted: 'ਪੂਰੇ ਹੋਏ ਚੱਕਰ',
      mahaRounds: 'ਮਹਾ ਚੱਕਰ',
      progressText: 'ਮੌਜੂਦਾ ਚੱਕਰ ਵਿੱਚ ਜਪ',
      dailyGoal: 'ਦੈਨੀਕ લક્ષ્ય (16 ਚੱਕਰ)',
      dailyGoalProgress: 'ਚੱਕਰ ਪੂਰੇ ਹੋਏ',
      chantText: 'ਜਪ',
      chantSubtext: 'ਹਰੇ ਕ੍ਰਿਸ਼ਨਾ',
      mahamantra1: 'ਹਰੇ ਕ੍ਰਿਸ਼ਨਾ ਹਰੇ ਕ੍ਰਿਸ਼ਨਾ ਕ੍ਰਿਸ਼ਨਾ ਕ੍ਰਿਸ਼ਨਾ ਹਰੇ ਹਰੇ',
      mahamantra2: 'ਹਰੇ ਰਾਮ ਹਰੇ ਰਾਮ ਰਾਮ ਰਾਮ ਹਰੇ ਹਰੇ',
      resetCurrentRoundToast: '🔄 ਮੌਜੂਦਾ ਚੱਕਰ ਰੀਸੈਟ ਹੋ ਗਿਆ! 🙏',
      resetRoundsCompletedToast: '🔄 ਪੂਰੇ ਹੋਏ ਚੱਕਰ ਰੀਸੈਟ ਹੋ ਗਏ! 🙏',
      resetMahaRoundsToast: '🔄 ਮਹਾ ਚੱਕਰ ਰੀਸੈਟ ਹੋ ਗਏ! 🙏',
      resetAllProgressToast: '🔄 ਸਾਰੀ ਪ੍ਰਗਤੀ ਸਫਲਤਾਪੂਰਵਕ ਰੀਸੈਟ ਹੋ ਗਈ! 🙏',
      roundCompleteToast: '🎉 ਬਧਾਈ ਹੋ! ਭਗਵਾਨ ਕ੍ਰਿਸ਼ਨਾ ਤੁਹਾਡੇ ਉੱਤੇ ਖੁਸ਼ ਹਨ!! 🙏',
      mahaRoundCompleteToast: '🌟 ਬਧਾਈ ਹੋ! ਸ਼੍ਰੀਲ ਪ੍ਰਭੁਪਾਦ ਤੁਹਾਡੇ ਉੱਤੇ ਖੁਸ਼ ਹਨ!! 🙏✨',
      resetAllConfirmTitle: 'ਸਾਰੀ ਪ੍ਰਗਤੀ ਰੀਸੈਟ ਕਰੋ',
      resetAllConfirmMessage: 'ਕੀ ਤੁਸੀਂ ਆਪਣੀ ਸਾਰੀ ਜਪ ਪ੍ਰਗਤੀ ਨੂੰ ਰੀਸੈਟ ਕਰਨ ਲਈ ਯਕੀਨੀ ਹੋ? ਇਹ ਮੌਜੂਦਾ ਚੱਕਰ, ਪੂਰੇ ਹੋਏ ਚੱਕਰ ਅਤੇ ਮਹਾ ਚੱਕਰ ਨੂੰ ਰੀਸੈਟ ਕਰੇਗਾ। ਇਹ ਕਾਰਵਾਈ ਵਾਪਸ ਨਹੀਂ ਲਿਆਈ ਜਾ ਸਕਦੀ।'
    },
    urdu: {
      pageTitle: '🕉️ مہامنترا جاپ',
      currentRound: 'موجودہ چکر',
      roundsCompleted: 'مکمل چکر',
      mahaRounds: 'مہا چکر',
      progressText: 'موجودہ چکر میں جاپ',
      dailyGoal: 'روزانہ ہدف (16 چکر)',
      dailyGoalProgress: 'چکر مکمل ہوئے',
      chantText: 'جاپ',
      chantSubtext: 'ہرے کرشنا',
      mahamantra1: 'ہرے کرشنا ہرے کرشنا کرشنا کرشنا ہرے ہرے',
      mahamantra2: 'ہرے رام ہرے رام رام رام ہرے ہرے',
      resetCurrentRoundToast: '🔄 موجودہ چکر ری سیٹ ہو گیا! 🙏',
      resetRoundsCompletedToast: '🔄 مکمل چکر ری سیٹ ہو گئے! 🙏',
      resetMahaRoundsToast: '🔄 مہا چکر ری سیٹ ہو گئے! 🙏',
      resetAllProgressToast: '🔄 تمام ترقی کامیابی سے ری سیٹ ہو گئی! 🙏',
      roundCompleteToast: '🎉 مبارک ہو! خدا کرشنا آپ پر خوش ہیں!! 🙏',
      mahaRoundCompleteToast: '🌟 مبارک ہو! شریل پرابھوپاد آپ پر خوش ہیں!! 🙏✨',
      resetAllConfirmTitle: 'تمام ترقی ری سیٹ کریں',
      resetAllConfirmMessage: 'کیا آپ واقعی اپنی تمام جاپ ترقی کو ری سیٹ کرنا چاہتے ہیں؟ یہ موجودہ چکر، مکمل چکر اور مہا چکر کو ری سیٹ کرے گا۔ یہ عمل واپس نہیں لیا جا سکتا۔'
    }
  };

  // Current content (computed from selected language)
  get content(): LanguageContent {
    return this.languageContent[this.currentLanguage];
  }

  // Chanting counters
  currentRound: number = 0;
  roundsCompleted: number = 0;
  mahaRounds: number = 0;

  // Radial progress properties
  circumference: number = 0;
  strokeDashoffset: number = 0;
  radius: number = 100; // Updated SVG circle radius for larger button

  // UI state
  showResetAlert: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';

  // Alert button configuration
  alertButtons = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        this.showResetAlert = false;
      }
    },
    {
      text: 'Yes, Reset',
      role: 'confirm',
      handler: () => {
        this.resetProgress();
      }
    }
  ];

  // Toast button configuration
  toastButtons = [
    {
      text: '🙏',
      role: 'cancel'
    }
  ];

  constructor(private themeService: ThemeService) {
    addIcons({
      flowerOutline,
      refreshOutline,
      languageOutline,
      closeOutline
    });
  }

  ngOnInit() {
    // Initialize presenting element for modal
    this.presentingElement = document.querySelector('.ion-page') as HTMLElement;
    
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(
      theme => this.currentTheme = theme
    );

    // Load language preference
    this.loadLanguagePreference();

    // Initialize radial progress
    this.circumference = 2 * Math.PI * this.radius;
    this.updateProgress();
    
    // Load saved progress from localStorage
    this.loadProgress();
  }

  ngOnDestroy() {
    // Clean up theme subscription
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  // Main chanting method
  chant() {
    this.currentRound++;

    // Check if round completed (108 chants)
    if (this.currentRound >= 108) {
      this.roundsCompleted++;
      this.currentRound = 0;
      
      // Show round completion message
      this.toastMessage = this.content.roundCompleteToast;
      this.showToast = true;

      // Check if 16 rounds completed (Maha Round)
      if (this.roundsCompleted >= 16) {
        this.mahaRounds++;
        this.roundsCompleted = 0;
        
        // Show Maha Round completion message
        setTimeout(() => {
          this.toastMessage = this.content.mahaRoundCompleteToast;
          this.showToast = true;
        }, 3500);
      }
    }

    // Update radial progress
    this.updateProgress();
    
    // Save progress
    this.saveProgress();
  }

  // Reset confirmation
  showResetConfirmation() {
    this.showResetAlert = true;
  }

  // Reset all progress
  resetProgress() {
    this.currentRound = 0;
    this.roundsCompleted = 0;
    this.mahaRounds = 0;
    this.showResetAlert = false;
    
    // Update radial progress
    this.updateProgress();
    
    // Clear saved progress
    this.clearProgress();
    
    // Show reset confirmation
    this.toastMessage = this.content.resetAllProgressToast;
    this.showToast = true;
  }

  // Reset current round only
  resetCurrentRound() {
    this.currentRound = 0;
    
    // Update radial progress
    this.updateProgress();
    
    // Save progress
    this.saveProgress();
    
    // Show confirmation
    this.toastMessage = this.content.resetCurrentRoundToast;
    this.showToast = true;
  }

  // Reset rounds completed only
  resetRoundsCompleted() {
    this.roundsCompleted = 0;
    
    // Save progress
    this.saveProgress();
    
    // Show confirmation
    this.toastMessage = this.content.resetRoundsCompletedToast;
    this.showToast = true;
  }

  // Reset maha rounds only
  resetMahaRounds() {
    this.mahaRounds = 0;
    
    // Save progress
    this.saveProgress();
    
    // Show confirmation
    this.toastMessage = this.content.resetMahaRoundsToast;
    this.showToast = true;
  }

  // Language management methods
  showLanguageSelector() {
    this.isLanguageSelectorOpen = true;
  }

  setLanguage(language: LanguageType) {
    this.currentLanguage = language;
    this.isLanguageSelectorOpen = false;
    
    // Save language preference
    localStorage.setItem('chantLanguage', language);
    
    // Update all toast messages with current language
    this.loadLanguagePreference();
  }

  private loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('chantLanguage') as LanguageType;
    if (savedLanguage && this.languageContent[savedLanguage]) {
      this.currentLanguage = savedLanguage;
    }
  }

  // Save progress to localStorage
  private saveProgress() {
    const progress = {
      currentRound: this.currentRound,
      roundsCompleted: this.roundsCompleted,
      mahaRounds: this.mahaRounds
    };
    localStorage.setItem('chantProgress', JSON.stringify(progress));
  }

  // Load progress from localStorage
  private loadProgress() {
    const savedProgress = localStorage.getItem('chantProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      this.currentRound = progress.currentRound || 0;
      this.roundsCompleted = progress.roundsCompleted || 0;
      this.mahaRounds = progress.mahaRounds || 0;
    }
    
    // Update progress after loading
    this.updateProgress();
  }

  // Clear progress from localStorage
  private clearProgress() {
    localStorage.removeItem('chantProgress');
  }

  // Update radial progress
  private updateProgress() {
    const progress = this.currentRound / 108;
    const offset = this.circumference - (progress * this.circumference);
    this.strokeDashoffset = offset;
  }
}
