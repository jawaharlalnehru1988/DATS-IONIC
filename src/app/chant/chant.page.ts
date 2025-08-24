import { Component, OnInit, AfterViewInit, OnDestroy, HostBinding } from '@angular/core';
import { IonContent, IonButton, IonProgressBar, IonToast, IonAlert, IonPopover, IonIcon, IonFab, IonFabButton, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons } from '@ionic/angular/standalone';

import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { flowerOutline, refreshOutline, languageOutline, closeOutline, musicalNotesOutline, musicalNotes, playOutline, pauseOutline, bonfireOutline } from 'ionicons/icons';
import { ThemeService} from '../services/theme.service';
import { ReusableHeaderComponent } from '../components/reusable-header/reusable-header.component';

type LanguageType = 'english' | 'tamil' | 'hindi' | 'telugu' | 'kannada' | 'malayalam' | 'marathi' | 'gujarati' | 'bengali' | 'punjabi' | 'urdu';

interface LanguageContent {
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
  sriKrishnaCaitanyaMantra: string;
  resetCurrentRoundToast: string;
  resetRoundsCompletedToast: string;
  resetMahaRoundsToast: string;
  resetAllProgressToast: string;
  roundCompleteToast: string;
  mahaRoundCompleteToast: string;
  resetAllConfirmTitle: string;
  resetAllConfirmMessage: string;
}

interface LanguageOption {
  key: LanguageType;
  flag: string;
  name: string;
  description: string;
}

interface LanguageData {
  key: LanguageType;
  flag: string;
  name: string;
  description: string;
  content: LanguageContent;
}

type ChantSoundType = 'none' | 'tick' | 'prabhupada' | 'continuous';

interface SoundOption {
  key: ChantSoundType;
  icon: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-chant',
  templateUrl: './chant.page.html',
  styleUrls: ['./chant.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    IonProgressBar,
    IonToast,
    IonAlert,
    IonPopover,
    IonIcon,
    IonFab,
    IonFabButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    ReusableHeaderComponent
]
})
export class ChantPage implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('class') themeClass = '';

  presentingElement: HTMLElement | null = null;
  currentLanguage: LanguageType = 'english';
  currentSoundMode: ChantSoundType = 'none';
  private themeSubscription: Subscription = new Subscription();

  // Language data array
  languageData: LanguageData[] = [
    {
      key: 'english',
      flag: '🇺🇸',
      name: 'English',
      description: 'English',
      content: {
        pageTitle: '🕉️ Mahamantra Chanting',
        currentRound: 'Current Round',
        roundsCompleted: 'Rounds Completed',
        mahaRounds: 'Maha Rounds',
        progressText: 'Chants in Current Round',
        dailyGoal: 'Daily Goal (16 Rounds)',
        dailyGoalProgress: 'Rounds Completed',
        chantText: 'Chant',
        chantSubtext: 'Hare Krishna',
        mahamantra1: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare',
        mahamantra2: 'Hare Rama Hare Rama Rama Rama Hare Hare',
        sriKrishnaCaitanyaMantra: 'Jai Sri Krishna Chaitanya prabhu Nithyananda Sri Advaita Gadhadara Sri Vasadi Goura Bhaktha Vrinda',
        resetCurrentRoundToast: '🔄 Current round reset! 🙏',
        resetRoundsCompletedToast: '🔄 Rounds completed reset! 🙏',
        resetMahaRoundsToast: '🔄 Maha rounds reset! 🙏',
        resetAllProgressToast: '🔄 All progress reset successfully! 🙏',
        roundCompleteToast: '🎉 Congratulations! Lord Krishna is pleased with you!! 🙏',
        mahaRoundCompleteToast: '🌟 Congratulations! Sri Prabhupada is pleased with you!! 🙏✨',
        resetAllConfirmTitle: 'Reset All Progress',
        resetAllConfirmMessage: 'Are you sure you want to reset ALL your chanting progress? This will reset Current Round, Rounds Completed, and Maha Rounds. This action cannot be undone.'
      }
    },
    {
      key: 'tamil',
      flag: '🇮🇳',
      name: 'Tamil',
      description: 'தமிழ்',
      content: {
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
        sriKrishnaCaitanyaMantra: 'ஜெய் ஸ்ரீ கிருஷ்ண சைதன்ய பிரபு நித்யானந்த ஸ்ரீ அத்வைத கதாதர ஸ்ரீவாசாதி கௌர பக்த வ்ருந்த',
        resetCurrentRoundToast: '🔄 தற்போதைய சுற்று மீட்டமைக்கப்பட்டது! 🙏',
        resetRoundsCompletedToast: '🔄 முடிந்த சுற்றுகள் மீட்டமைக்கப்பட்டது! 🙏',
        resetMahaRoundsToast: '🔄 மகா சுற்றுகள் மீட்டமைக்கப்பட்டது! 🙏',
        resetAllProgressToast: '🔄 அனைத்து முன்னேற்றமும் வெற்றிகரமாக மீட்டமைக்கப்பட்டது! 🙏',
        roundCompleteToast: '🎉 வாழ்த்துக்கள்! கிருஷ்ண பகவான் உங்களை மகிழ்வித்துள்ளார்!! 🙏',
        mahaRoundCompleteToast: '🌟 வாழ்த்துக்கள்! ஸ்ரீல பிரபுபாதர் உங்களை மகிழ்வித்துள்ளார்!! 🙏✨',
        resetAllConfirmTitle: 'அனைத்து முன்னேற்றத்தையும் மீட்டமை',
        resetAllConfirmMessage: 'உங்கள் அனைத்து ஜப முன்னேற்றத்தையும் மீட்டமைக்க நீங்கள் உறுதியாக இருக்கிறீர்களா? இது தற்போதைய சுற்று, முடிந்த சுற்றுகள் மற்றும் மகா சுற்றுகளை மீட்டமைக்கும். இந்த செயலை செயல்தவிர்க்க முடியாது.'
      }
    },
    {
      key: 'hindi',
      flag: '🇮🇳',
      name: 'Hindi',
      description: 'हिन्दी',
      content: {
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
        sriKrishnaCaitanyaMantra: 'जय श्री कृष्ण चैतन्य प्रभु नित्यानंद श्री अद्वैत गदाधर श्रीवासादि गौर भक्त वृंदा',
        resetCurrentRoundToast: '🔄 वर्तमान चक्र रीसेट हो गया! 🙏',
        resetRoundsCompletedToast: '🔄 पूर्ण चक्र रीसेट हो गए! 🙏',
        resetMahaRoundsToast: '🔄 महा चक्र रीसेट हो गए! 🙏',
        resetAllProgressToast: '🔄 सभी प्रगति सफलतापूर्वक रीसेट हो गई! 🙏',
        roundCompleteToast: '🎉 बधाई हो! भगवान कृष्ण आपसे प्रसन्न हैं!! 🙏',
        mahaRoundCompleteToast: '🌟 बधाई हो! श्रील प्रभुपाद आपसे प्रसन्न हैं!! 🙏✨',
        resetAllConfirmTitle: 'सभी प्रगति रीसेट करें',
        resetAllConfirmMessage: 'क्या आप वाकई अपनी सभी जप प्रगति को रीसेट करना चाहते हैं? यह वर्तमान चक्र, पूर्ण चक्र और महा चक्र को रीसेट कर देगा। यह क्रिया पूर्ववत नहीं की जा सकती।'
      }
    },
    {
      key: 'telugu',
      flag: '🇮🇳',
      name: 'Telugu',
      description: 'తెలుగు',
      content: {
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
        sriKrishnaCaitanyaMantra: 'జై శ్రీ కృష్ణ చైతన్య ప్రభు నిత్యానంద శ్రీ అద్వైత గదాధర శ్రీవాసాది గౌర భక్త వృందా',
        resetCurrentRoundToast: '🔄 ప్రస్తుత చక్రం రీసెట్ అయింది! 🙏',
        resetRoundsCompletedToast: '🔄 పూర్తయిన చక్రాలు రీసెట్ అయ్యాయి! 🙏',
        resetMahaRoundsToast: '🔄 మహా చక్రాలు రీసెట్ అయ్యాయి! 🙏',
        resetAllProgressToast: '🔄 అన్ని ప్రగతి విజయవంతంగా రీసెట్ అయింది! 🙏',
        roundCompleteToast: '🎉 అభినందనలు! శ్రీ కృష్ణ భగవాన్ మీతో సంతోషంగా ఉన్నారు!! 🙏',
        mahaRoundCompleteToast: '🌟 అభినందనలు! శ్రీ ప్రభుపాద్ మీతో సంతోషంగా ఉన్నారు!! 🙏✨',
        resetAllConfirmTitle: 'అన్ని ప్రగతిని రీసెట్ చేయండి',
        resetAllConfirmMessage: 'మీరు మీ అన్ని జప ప్రగతిని రీసెట్ చేయాలనుకుంటున్నారా? ఇది ప్రస్తుత చక్రం, పూర్తయిన చక్రాలు మరియు మహా చక్రాలను రీసెట్ చేస్తుంది. ఈ చర్యను తిరిగి తీసుకోలేము.'
      }
    },
    {
      key: 'kannada',
      flag: '🇮🇳',
      name: 'Kannada',
      description: 'ಕನ್ನಡ',
      content: {
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
        sriKrishnaCaitanyaMantra: 'ಜೈ ಶ್ರೀ ಕೃಷ್ಣ ಚೈತನ್ಯ ಪ್ರಭು ನಿತ್ಯಾನಂದ ಶ್ರೀ ಅದ್ವೈತ ಗದಾಧರ ಶ್ರೀವಾಸಾದಿ ಗೌರ ಭಕ್ತ ವೃಂದ',
        resetCurrentRoundToast: '🔄 ಪ್ರಸ್ತುತ ಚಕ್ರವನ್ನು ಮರುಸೆಟ್ ಮಾಡಲಾಗಿದೆ! 🙏',
        resetRoundsCompletedToast: '🔄 ಪೂರ್ಣಗೊಂಡ ಚಕ್ರಗಳನ್ನು ಮರುಸೆಟ್ ಮಾಡಲಾಗಿದೆ! 🙏',
        resetMahaRoundsToast: '🔄 ಮಹಾ ಚಕ್ರಗಳನ್ನು ಮರುಸೆಟ್ ಮಾಡಲಾಗಿದೆ! 🙏',
        resetAllProgressToast: '🔄 ಎಲ್ಲಾ ಪ್ರಗತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಮರುಸೆಟ್ ಮಾಡಲಾಗಿದೆ! 🙏',
        roundCompleteToast: '🎉 ಅಭಿನಂದನೆಗಳು! ಶ್ರೀ ಕೃಷ್ಣ ಭಗವಾನ್ ನಿಮ್ಮಿಂದ ಸಂತೋಷಗೊಂಡಿದ್ದಾರೆ!! 🙏',
        mahaRoundCompleteToast: '🌟 ಅಭಿನಂದನೆಗಳು! ಶ್ರೀಲ ಪ್ರಭುಪಾದ ನಿಮ್ಮಿಂದ ಸಂತೋಷಗೊಂಡಿದ್ದಾರೆ!! 🙏✨',
        resetAllConfirmTitle: 'ಎಲ್ಲಾ ಪ್ರಗತಿಯನ್ನು ಮರುಸೆಟ್ ಮಾಡಿ',
        resetAllConfirmMessage: 'ನೀವು ನಿಮ್ಮ ಎಲ್ಲಾ ಜಪ ಪ್ರಗತಿಯನ್ನು ಮರುಸೆಟ್ ಮಾಡಲು ಖಚಿತವಾಗಿದ್ದೀರಾ? ಇದು ಪ್ರಸ್ತುತ ಚಕ್ರ, ಪೂರ್ಣಗೊಂಡ ಚಕ್ರಗಳು ಮತ್ತು ಮಹಾ ಚಕ್ರಗಳನ್ನು ಮರುಸೆಟ್ ಮಾಡುತ್ತದೆ. ಈ ಕ್ರಿಯೆಯನ್ನು ಹಿಂದಿರುಗಿಸಲಾಗುವುದಿಲ್ಲ.'
      }
    },
    {
      key: 'malayalam',
      flag: '🇮🇳',
      name: 'Malayalam',
      description: 'മലയാളം',
      content: {
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
        sriKrishnaCaitanyaMantra: 'ജയ് ശ്രീ കൃഷ്ണ ചൈതന്യ പ്രഭു നിത്യാനന്ദ ശ്രീ അദ്വൈത ഗദാധര ശ്രീവാസാദി ഗൗര ഭക്ത വൃന്ദ',
        resetCurrentRoundToast: '🔄 നിലവിലെ ചക്രം റീസെറ്റ് ചെയ്തു! 🙏',
        resetRoundsCompletedToast: '🔄 പൂർത്തിയായ ചക്രങ്ങൾ റീസെറ്റ് ചെയ്തു! 🙏',
        resetMahaRoundsToast: '🔄 മഹാ ചക്രങ്ങൾ റീസെറ്റ് ചെയ്തു! 🙏',
        resetAllProgressToast: '🔄 എല്ലാ പുരോഗതിയും വിജയകരമായി റീസെറ്റ് ചെയ്തു! 🙏',
        roundCompleteToast: '🎉 അഭിനന്ദനങ്ങൾ! ശ്രീ കൃഷ്ണ ഭഗവാൻ നിങ്ങളിൽ സന്തോഷത്തിലാണ്!! 🙏',
        mahaRoundCompleteToast: '🌟 അഭിനന്ദനങ്ങൾ! ശ്രീല പ്രഭുപാദ് നിങ്ങളിൽ സന്തോഷത്തിലാണ്!! 🙏✨',
        resetAllConfirmTitle: 'എല്ലാ പുരോഗതിയും റീസെറ്റ് ചെയ്യുക',
        resetAllConfirmMessage: 'നിങ്ങൾ നിങ്ങളുടെ എല്ലാ ജപ പുരോഗതിയും റീസെറ്റ് ചെയ്യാൻ ഉറപ്പാണോ? ഇത് നിലവിലെ ചക്രം, പൂർത്തിയായ ചക്രങ്ങൾ, മഹാ ചക്രങ്ങൾ എന്നിവയെ റീസെറ്റ് ചെയ്യും. ഈ പ്രവർത്തനം പിൻവലിക്കാൻ കഴിയില്ല.'
      }
    },
    {
      key: 'marathi',
      flag: '🇮🇳',
      name: 'Marathi',
      description: 'मराठी',
      content: {
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
        sriKrishnaCaitanyaMantra: 'जय श्री कृष्ण चैतन्य प्रभु नित्यनंद श्री अद्वैत गदाधर श्रीवासादि गौर भक्त वृंदा',
        resetCurrentRoundToast: '🔄 वर्तमान चक्र रीसेट झाले! 🙏',
        resetRoundsCompletedToast: '🔄 पूर्ण झालेले चक्रे रीसेट झाली! 🙏',
        resetMahaRoundsToast: '🔄 महा चक्रे रीसेट झाली! 🙏',
        resetAllProgressToast: '🔄 सर्व प्रगती यशस्वीरित्या रीसेट झाली! 🙏',
        roundCompleteToast: '🎉 अभिनंदन! भगवान कृष्ण आपल्यावर आनंदित आहेत!! 🙏',
        mahaRoundCompleteToast: '🌟 अभिनंदन! श्रील प्रभुपाद आपल्यावर आनंदित आहेत!! 🙏✨',
        resetAllConfirmTitle: 'सर्व प्रगती रीसेट करा',
        resetAllConfirmMessage: 'आपण आपल्या सर्व जप प्रगती रीसेट करू इच्छिता का? हे वर्तमान चक्र, पूर्ण झालेले चक्रे आणि महा चक्रे रीसेट करेल. ही क्रिया पूर्ववत केली जाऊ शकत नाही.'
      }
    },
    {
      key: 'gujarati',
      flag: '🇮🇳',
      name: 'Gujarati',
      description: 'ગુજરાતી',
      content: {
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
        sriKrishnaCaitanyaMantra: 'જૈ શ્રી કૃષ્ણ ચૈતન્ય પ્રભુ નિત્યાનંદ શ્રી અદ્વૈત ગદાધર શ્રીવાસાદિ ગૌર ભક્ત વૃંદ',
        resetCurrentRoundToast: '🔄 વર્તમાન ચક્ર રીસેટ થયું! 🙏',
        resetRoundsCompletedToast: '🔄 પૂર્ણ થયેલ ચક્રો રીસેટ થયા! 🙏',
        resetMahaRoundsToast: '🔄 મહા ચક્રો રીસેટ થયા! 🙏',
        resetAllProgressToast: '🔄 તમામ પ્રગતિ સફળતાપૂર્વક રીસેટ થઈ! 🙏',
        roundCompleteToast: '🎉 અભિનંદન! ભગવાન કૃષ્ણ તમારા પર આનંદિત છે!! 🙏',
        mahaRoundCompleteToast: '🌟 અભિનંદન! શ્રીલ પ્રભુપાદ તમારા પર આનંદિત છે!! 🙏✨',
        resetAllConfirmTitle: 'તમામ પ્રગતિ રીસેટ કરો',
        resetAllConfirmMessage: 'શું તમે તમારી તમામ જપ પ્રગતિને રીસેટ કરવા માટે ખાતરી છો? આ વર્તમાન ચક્ર, પૂર્ણ થયેલ ચક્રો અને મહા ચક્રોને રીસેટ કરશે. આ ક્રિયા પાછી ખેંચી શકાતી નથી.'
      }
    },
    {
      key: 'bengali',
      flag: '🇮🇳',
      name: 'Bengali',
      description: 'বাংলা',
      content: {
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
        sriKrishnaCaitanyaMantra: 'জয় শ্রী কৃষ্ণ চৈতন্য প্রভু নিত্যানন্দ শ্রী অদ্বৈত গদাধর শ্রীবাসাদী গৌর ভক্ত বৃন্দ',
        resetCurrentRoundToast: '🔄 বর্তমান চক্র রিসেট হয়েছে! 🙏',
        resetRoundsCompletedToast: '🔄 সম্পন্ন চক্র রিসেট হয়েছে! 🙏',
        resetMahaRoundsToast: '🔄 মহা চক্র রিসেট হয়েছে! 🙏',
        resetAllProgressToast: '🔄 সমস্ত প্রগতি সফলভাবে রিসেট হয়েছে! 🙏',
        roundCompleteToast: '🎉 অভিনন্দন! ভগবান কৃষ্ণ আপনার উপর আনন্দিত! 🙏',
        mahaRoundCompleteToast: '🌟 অভিনন্দন! শ্রীল প্রভুপাদ আপনার উপর আনন্দিত! 🙏✨',
        resetAllConfirmTitle: 'সমস্ত প্রগতি রিসেট করুন',
        resetAllConfirmMessage: 'আপনি কি আপনার সমস্ত জপ প্রগতি রিসেট করতে নিশ্চিত? এটি বর্তমান চক্র, সম্পন্ন চক্র এবং মহা চক্র রিসেট করবে। এই ক্রিয়া পূর্বাবস্থায় ফিরিয়ে নেওয়া যাবে না।'
      }
    },
    {
      key: 'punjabi',
      flag: '🇮🇳',
      name: 'Punjabi',
      description: 'ਪੰਜਾਬੀ',
      content: {
        pageTitle: '🕉️ ਮਹਾਮੰਤ੍ਰ ਜਪ',
        currentRound: 'ਮੌਜੂਦਾ ਚੱਕਰ',
        roundsCompleted: 'ਪੂਰੇ ਹੋਏ ਚੱਕਰ',
        mahaRounds: 'ਮਹਾ ਚੱਕਰ',
        progressText: 'ਮੌਜੂਦਾ ਚੱਕਰ ਵਿੱਚ ਜਪ',
        dailyGoal: 'ਦੈਨੀਕ લક્ષ્ય (16 ਚੱਕਰ)',
        dailyGoalProgress: 'ਚੱਕਰ ਪੂਰੇ ਹੋਏ',
        chantText: 'ਜਪ',
        chantSubtext: 'ਹਰੇ ਕ੍ਰਿਸ਼ਨਾ',
        mahamantra1: 'ਹਰੇ ਕ੍ਰਿਸ਼ਨਾ ਹਰੇ ਕ੍ਰਿਸ਼ਨਾ ਕ੍ਰਿਸ਼ਨਾ ਕ੍ਰਿਸ਼ਨਾ ਹਰੇ ਹਰੇ',
        mahamantra2: 'ਹਰੇ ਰਾਮ ਹਰੇ ਰਾਮ ਰਾਮ ਰਾਮ ਹਰੇ ਹਰੇ',
        sriKrishnaCaitanyaMantra: 'ਜੈ ਸ੍ਰੀ ਕ੍ਰਿਸ਼ਨਾ ਚੈਤਨ੍ਯ ਪ੍ਰਭੁ ਨਿਤ੍ਯਾਨੰਦ ਸ੍ਰੀ ਅਦ੍ਵੈਤ ਗਦਾਧਰ ਸ੍ਰੀਵਾਸਾਦਿ ਗੌਰ ਭਕ੍ਤ ਵ੍ਰਿੰਦ',
        resetCurrentRoundToast: '🔄 ਮੌਜੂਦਾ ਚੱਕਰ ਰੀਸੈਟ ਹੋ ਗਿਆ! 🙏',
        resetRoundsCompletedToast: '🔄 ਪੂਰੇ ਹੋਏ ਚੱਕਰ ਰੀਸੈਟ ਹੋ ਗਏ! 🙏',
        resetMahaRoundsToast: '🔄 ਮਹਾ ਚੱਕਰ ਰੀਸੈਟ ਹੋ ਗਏ! 🙏',
        resetAllProgressToast: '🔄 ਸਾਰੀ ਪ੍ਰਗਤੀ ਸਫਲਤਾਪੂਰਵਕ ਰੀਸੈਟ ਹੋ ਗਈ! 🙏',
        roundCompleteToast: '🎉 ਬਧਾਈ ਹੋ! ਭਗਵਾਨ ਕ੍ਰਿਸ਼ਨਾ ਤੁਹਾਡੇ ਉੱਤੇ ਖੁਸ਼ ਹਨ!! 🙏',
        mahaRoundCompleteToast: '🌟 ਬਧਾਈ ਹੋ! ਸ਼੍ਰੀਲ ਪ੍ਰਭੁਪਾਦ ਤੁਹਾਡੇ ਉੱਤੇ ਖੁਸ਼ ਹਨ!! 🙏✨',
        resetAllConfirmTitle: 'ਸਾਰੀ ਪ੍ਰਗਤੀ ਰੀਸੈਟ ਕਰੋ',
        resetAllConfirmMessage: 'ਕੀ ਤੁਸੀਂ ਆਪਣੀ ਸਾਰੀ ਜਪ ਪ੍ਰਗਤੀ ਨੂੰ ਰੀਸੈਟ ਕਰਨ ਲਈ ਯਕੀਨੀ ਹੋ? ਇਹ ਮੌਜੂਦਾ ਚੱਕਰ, ਪੂਰੇ ਹੋਏ ਚੱਕਰ ਅਤੇ ਮਹਾ ਚੱਕਰ ਨੂੰ ਰੀਸੈਟ ਕਰੇਗਾ। ਇਹ ਕਾਰਵਾਈ ਵਾਪਸ ਨਹੀਂ ਲਿਆਈ ਜਾ ਸਕਦੀ।'
      }
    },
    {
      key: 'urdu',
      flag: '🇵🇰',
      name: 'Urdu',
      description: 'اردو',
      content: {
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
        sriKrishnaCaitanyaMantra: 'جے شری کرشن چیتنیا پربھو نیتینندا شری ادوائتا گدھادھر شری واسدی گور بھکت وند',
        resetCurrentRoundToast: '🔄 موجودہ چکر ری سیٹ ہو گیا! 🙏',
        resetRoundsCompletedToast: '🔄 مکمل چکر ری سیٹ ہو گئے! 🙏',
        resetMahaRoundsToast: '🔄 مہا چکر ری سیٹ ہو گئے! 🙏',
        resetAllProgressToast: '🔄 تمام ترقی کامیابی سے ری سیٹ ہو گئی! 🙏',
        roundCompleteToast: '🎉 مبارک ہو! خدا کرشنا آپ پر خوش ہیں!! 🙏',
        mahaRoundCompleteToast: '🌟 مبارک ہو! شریل پرابھوپاد آپ پر خوش ہیں!! 🙏✨',
        resetAllConfirmTitle: 'تمام ترقی ری سیٹ کریں',
        resetAllConfirmMessage: 'کیا آپ واقعی اپنی تمام جاپ ترقی کو ری سیٹ کرنا چاہتے ہیں؟ یہ موجودہ چکر، مکمل چکر اور مہا چکر کو ری سیٹ کرے گا۔ یہ عمل واپس نہیں لیا جا سکتا۔'
      }
    }
  ];

  // Sound options for the music selector
  soundOptions: SoundOption[] = [
    {
      key: 'none',
      icon: '🔇',
      name: 'No Sound',
      description: 'Silent chanting'
    },
    {
      key: 'tick',
      icon: '🔔',
      name: 'Tick Sound',
      description: 'Chant with tick sound'
    },
    {
      key: 'prabhupada',
      icon: '🎵',
      name: 'Prabhupada',
      description: 'Chant with Prabhupada'
    },
    {
      key: 'continuous',
      icon: '🔄',
      name: '108 Continues Chanting',
      description: 'Continuous Prabhupada chanting until 108'
    }
  ];

  // Language options for the selector (derived from languageData)
  get languageOptions(): LanguageOption[] {
    return this.languageData.map(lang => ({
      key: lang.key,
      flag: lang.flag,
      name: lang.name,
      description: lang.description
    }));
  }

  // Current content (computed from selected language)
  get content(): LanguageContent {
    const currentLang = this.languageData.find(lang => lang.key === this.currentLanguage);
    return currentLang ? currentLang.content : this.languageData[0].content;
  }

  // Chanting counters
  currentRound: number = 0;
  roundsCompleted: number = 0;
  mahaRounds: number = 0;

  // Radial progress properties
  circumference: number = 0;
  strokeDashoffset: number = 0;
  radius: number = 100;

  // UI state
  showResetAlert: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';
  isLanguageSelectorOpen: boolean = false;
  isSoundSelectorOpen: boolean = false;
  isAudioPlaying: boolean = false;
  isContinuousPlaying: boolean = false;
  isContinuousPaused: boolean = false;
  
  // Sri Krishna Caitanya modal state
  showSriKrishnaCaitanyaModal: boolean = false;
  isSriKrishnaCaitanyaPlaying: boolean = false;

  // Audio elements
  private tickAudio: HTMLAudioElement | null = null;
  private prabhupadaAudio: HTMLAudioElement | null = null;
  private continuousAudio: HTMLAudioElement | null = null;
  private bellAudio: HTMLAudioElement | null = null;
  private sriKrishnaCaitanyaAudio: HTMLAudioElement | null = null;
  private lastCycleTime: number = 0;

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
    addIcons({flowerOutline,refreshOutline,musicalNotesOutline,languageOutline,musicalNotes,closeOutline,playOutline,pauseOutline,bonfireOutline});
  }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page') as HTMLElement;
    
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.themeClass = theme;
    });
    
    // Initialize audio elements
    this.initializeAudio();
    
    // Calculate circle circumference for progress ring
    this.circumference = 2 * Math.PI * this.radius;
    this.strokeDashoffset = this.circumference;
    
    // Load saved progress
    this.loadProgress();
    
    // Update progress ring
    this.updateProgressRing();
  }

  ngAfterViewInit() {
    // Update progress ring after view is initialized
    this.updateProgressRing();
  }

  ngOnDestroy() {
    // Unsubscribe from theme changes
    this.themeSubscription.unsubscribe();
    
    // Clean up audio elements
    if (this.tickAudio) {
      this.tickAudio.pause();
      this.tickAudio = null;
    }
    if (this.prabhupadaAudio) {
      this.prabhupadaAudio.pause();
      this.prabhupadaAudio = null;
    }
    if (this.continuousAudio) {
      this.continuousAudio.pause();
      this.continuousAudio = null;
    }
    if (this.bellAudio) {
      this.bellAudio.pause();
      this.bellAudio = null;
    }
    if (this.sriKrishnaCaitanyaAudio) {
      this.sriKrishnaCaitanyaAudio.pause();
      this.sriKrishnaCaitanyaAudio = null;
    }
    
    // Reset continuous playing state
    this.isContinuousPlaying = false;
    this.isContinuousPaused = false;
  }

  // Initialize audio elements
  initializeAudio() {
    try {
      // Initialize tick sound
      this.tickAudio = new Audio('assets/music/single-tick.mp3');
      this.tickAudio.preload = 'auto';
      this.tickAudio.volume = 0.7;
      
      // Initialize Prabhupada chanting
      this.prabhupadaAudio = new Audio('assets/music/SrilaPrabhupadaChanting.mp3');
      this.prabhupadaAudio.preload = 'auto';
      this.prabhupadaAudio.volume = 0.8;
      
      // Initialize continuous Prabhupada chanting
      this.continuousAudio = new Audio('assets/music/SrilaPrabhupadaChanting.mp3');
      this.continuousAudio.preload = 'auto';
      this.continuousAudio.volume = 0.8;
      this.continuousAudio.loop = true; // Enable looping for continuous play
      
      // Initialize bell sound for round completion
      this.bellAudio = new Audio('assets/music/bellshort.mp3');
      this.bellAudio.preload = 'auto';
      this.bellAudio.volume = 0.9;
      
      // Initialize Sri Krishna Caitanya audio
      this.sriKrishnaCaitanyaAudio = new Audio('assets/music/sriKrishnaCaitanya.mp3');
      this.sriKrishnaCaitanyaAudio.preload = 'auto';
      this.sriKrishnaCaitanyaAudio.volume = 0.8;
      
      // Add event listener for Prabhupada audio completion
      this.prabhupadaAudio.addEventListener('ended', () => {
        this.isAudioPlaying = false;
      });
      
      // Add event listeners for continuous audio
      this.continuousAudio.addEventListener('ended', () => {
        // This shouldn't fire due to loop=true, but just in case
        if (this.isContinuousPlaying && this.currentRound < 108) {
          this.continuousAudio?.play().catch(e => console.warn('Continuous audio restart failed:', e));
        }
      });
      
      // Add event listener for audio time updates to detect when one cycle completes
      this.continuousAudio.addEventListener('timeupdate', () => {
        if (this.currentSoundMode === 'continuous' && this.isContinuousPlaying && !this.isContinuousPaused) {
          // Get the duration and current time
          const duration = this.continuousAudio?.duration || 0;
          const currentTime = this.continuousAudio?.currentTime || 0;
          
          // Detect loop restart (currentTime jumps back to beginning)
          if (duration > 0 && this.lastCycleTime > 0 && currentTime < this.lastCycleTime * 0.5) {
            this.onContinuousAudioCycleComplete();
          }
          
          this.lastCycleTime = currentTime;
        }
      });
      
      // Add error handlers
      this.tickAudio.addEventListener('error', (e) => {
        console.warn('Tick audio failed to load:', e);
      });
      
      this.prabhupadaAudio.addEventListener('error', (e) => {
        console.warn('Prabhupada audio failed to load:', e);
      });
      
      this.continuousAudio.addEventListener('error', (e) => {
        console.warn('Continuous audio failed to load:', e);
      });
      
      this.bellAudio.addEventListener('error', (e) => {
        console.warn('Bell audio failed to load:', e);
      });
      
      this.sriKrishnaCaitanyaAudio.addEventListener('error', (e) => {
        console.warn('Sri Krishna Caitanya audio failed to load:', e);
      });
      
    } catch (error) {
      console.warn('Audio initialization failed:', error);
    }
  }

  // Save progress to localStorage
  saveProgress() {
    const progress = {
      currentRound: this.currentRound,
      roundsCompleted: this.roundsCompleted,
      mahaRounds: this.mahaRounds,
      currentLanguage: this.currentLanguage,
      currentSoundMode: this.currentSoundMode
    };
    localStorage.setItem('chantProgress', JSON.stringify(progress));
  }

  // Load progress from localStorage
  loadProgress() {
    const savedProgress = localStorage.getItem('chantProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      this.currentRound = progress.currentRound || 0;
      this.roundsCompleted = progress.roundsCompleted || 0;
      this.mahaRounds = progress.mahaRounds || 0;
      this.currentLanguage = progress.currentLanguage || 'english';
      this.currentSoundMode = progress.currentSoundMode || 'none';
    }
  }

  // Update the radial progress ring
  updateProgressRing() {
    const progress = this.currentRound / 108;
    const offset = this.circumference - (progress * this.circumference);
    this.strokeDashoffset = offset;
  }

  // Main chanting action
  chant() {
    // If Prabhupada audio is playing, block the click
    if (this.isAudioPlaying && this.currentSoundMode === 'prabhupada') {
      return; // Don't process the click
    }
    
    // For continuous mode, just start/stop the audio, don't increment counter manually
    if (this.currentSoundMode === 'continuous') {
      this.playChantSound();
      return;
    }
    
    // Play the appropriate sound
    this.playChantSound();
    
    // Increment the counter (only for non-continuous modes)
    this.currentRound++;
    
    if (this.currentRound >= 108) {
      // Round completed
      this.currentRound = 0;
      this.roundsCompleted++;
      
      // Play bell sound for round completion
      this.playBellSound();
      
      this.showToastMessage(this.content.roundCompleteToast);
      
      if (this.roundsCompleted >= 16) {
        // Maha round completed
        this.roundsCompleted = 0;
        this.mahaRounds++;
        this.showToastMessage(this.content.mahaRoundCompleteToast);
      }
    }
    
    this.updateProgressRing();
    this.saveProgress();
  }

  // Play the appropriate chant sound
  private playChantSound() {
    try {
      if (this.currentSoundMode === 'none') {
        // No sound, just return
        return;
      } else if (this.currentSoundMode === 'tick' && this.tickAudio) {
        // Reset the audio to beginning and play
        this.tickAudio.currentTime = 0;
        this.tickAudio.play().catch(e => console.warn('Tick audio play failed:', e));
      } else if (this.currentSoundMode === 'prabhupada' && this.prabhupadaAudio) {
        // Only play if not already playing
        if (!this.isAudioPlaying) {
          this.isAudioPlaying = true;
          this.prabhupadaAudio.currentTime = 0;
          this.prabhupadaAudio.play()
            .then(() => {
              // Audio started playing successfully
            })
            .catch(e => {
              console.warn('Prabhupada audio play failed:', e);
              this.isAudioPlaying = false; // Reset flag if play failed
            });
        }
      } else if (this.currentSoundMode === 'continuous' && this.continuousAudio) {
        // Toggle play/pause for continuous mode
        this.toggleContinuousAudio();
      }
    } catch (error) {
      console.warn('Audio playback error:', error);
      this.isAudioPlaying = false; // Reset flag on error
      this.isContinuousPlaying = false; // Reset continuous flag on error
    }
  }

  // Handle continuous audio cycle completion
  private onContinuousAudioCycleComplete() {
    // Increment the counter automatically
    this.currentRound++;
    
    if (this.currentRound >= 108) {
      // Round completed
      this.currentRound = 0;
      this.roundsCompleted++;
      
      // Play bell sound for round completion
      this.playBellSound();
      
      this.showToastMessage(this.content.roundCompleteToast);
      
      // Stop continuous audio when round is completed
      if (this.isContinuousPlaying && this.continuousAudio) {
        this.continuousAudio.pause();
        this.isContinuousPlaying = false;
        this.isContinuousPaused = false;
      }
      
      if (this.roundsCompleted >= 16) {
        // Maha round completed
        this.roundsCompleted = 0;
        this.mahaRounds++;
        this.showToastMessage(this.content.mahaRoundCompleteToast);
      }
    }
    
    this.updateProgressRing();
    this.saveProgress();
  }

  // Toggle continuous audio play/pause
  toggleContinuousAudio() {
    if (!this.continuousAudio) return;
    
    if (this.isContinuousPlaying && !this.isContinuousPaused) {
      // Pause the audio
      this.continuousAudio.pause();
      this.isContinuousPaused = true;
    } else if (this.isContinuousPlaying && this.isContinuousPaused) {
      // Resume the audio
      this.continuousAudio.play().catch(e => console.warn('Continuous audio resume failed:', e));
      this.isContinuousPaused = false;
    } else {
      // Start the audio
      this.isContinuousPlaying = true;
      this.isContinuousPaused = false;
      this.lastCycleTime = 0; // Reset cycle tracking
      this.continuousAudio.currentTime = 0;
      this.continuousAudio.play().catch(e => {
        console.warn('Continuous audio play failed:', e);
        this.isContinuousPlaying = false;
      });
    }
  }

  // Play bell sound for round completion
  private playBellSound() {
    try {
      if (this.bellAudio) {
        this.bellAudio.currentTime = 0;
        this.bellAudio.play().catch(e => console.warn('Bell audio play failed:', e));
      }
    } catch (error) {
      console.warn('Bell audio playback error:', error);
    }
  }

  // Play Sri Krishna Caitanya audio
  playSriKrishnaCaitanyaAudio() {
    try {
      if (this.sriKrishnaCaitanyaAudio) {
        this.sriKrishnaCaitanyaAudio.currentTime = 0;
        
        // Set up event listeners
        this.sriKrishnaCaitanyaAudio.onplay = () => {
          this.isSriKrishnaCaitanyaPlaying = true;
          this.showSriKrishnaCaitanyaModal = true;
        };
        
        this.sriKrishnaCaitanyaAudio.onended = () => {
          this.isSriKrishnaCaitanyaPlaying = false;
          this.showSriKrishnaCaitanyaModal = false;
        };
        
        this.sriKrishnaCaitanyaAudio.onpause = () => {
          this.isSriKrishnaCaitanyaPlaying = false;
          this.showSriKrishnaCaitanyaModal = false;
        };
        
        this.sriKrishnaCaitanyaAudio.play().catch(e => console.warn('Sri Krishna Caitanya audio play failed:', e));
      }
    } catch (error) {
      console.warn('Sri Krishna Caitanya audio playback error:', error);
    }
  }

  // Close Sri Krishna Caitanya modal
  closeSriKrishnaCaitanyaModal() {
    this.showSriKrishnaCaitanyaModal = false;
    if (this.sriKrishnaCaitanyaAudio && !this.sriKrishnaCaitanyaAudio.paused) {
      this.sriKrishnaCaitanyaAudio.pause();
    }
  }

  // Show toast message
  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
  }

  // Reset current round
  resetCurrentRound() {
    this.currentRound = 0;
    
    // Stop continuous audio when resetting current round
    if (this.isContinuousPlaying && this.continuousAudio) {
      this.continuousAudio.pause();
      this.isContinuousPlaying = false;
      this.isContinuousPaused = false;
    }
    
    this.updateProgressRing();
    this.saveProgress();
    this.showToastMessage(this.content.resetCurrentRoundToast);
  }

  // Reset rounds completed
  resetRoundsCompleted() {
    this.roundsCompleted = 0;
    this.saveProgress();
    this.showToastMessage(this.content.resetRoundsCompletedToast);
  }

  // Reset maha rounds
  resetMahaRounds() {
    this.mahaRounds = 0;
    this.saveProgress();
    this.showToastMessage(this.content.resetMahaRoundsToast);
  }

  // Show reset all confirmation
  showResetAllConfirmation() {
    this.showResetAlert = true;
  }

  // Reset all progress
  resetProgress() {
    this.currentRound = 0;
    this.roundsCompleted = 0;
    this.mahaRounds = 0;
    
    // Stop continuous audio when resetting all progress
    if (this.isContinuousPlaying && this.continuousAudio) {
      this.continuousAudio.pause();
      this.isContinuousPlaying = false;
      this.isContinuousPaused = false;
    }
    
    this.updateProgressRing();
    this.saveProgress();
    this.showResetAlert = false;
    this.showToastMessage(this.content.resetAllProgressToast);
  }

  // Change language
  changeLanguage(language: LanguageType) {
    this.currentLanguage = language;
    this.saveProgress();
  }

  // Show language selector
  showLanguageSelector() {
    this.isLanguageSelectorOpen = true;
  }

  // Set language and close selector
  setLanguage(language: LanguageType) {
    this.changeLanguage(language);
    this.isLanguageSelectorOpen = false;
  }

  // Show sound selector
  showSoundSelector() {
    this.isSoundSelectorOpen = true;
  }

  // Set sound mode and close selector
  setSoundMode(soundMode: ChantSoundType) {
    // Stop continuous audio if switching away from continuous mode
    if (this.currentSoundMode === 'continuous' && soundMode !== 'continuous' && this.isContinuousPlaying && this.continuousAudio) {
      this.continuousAudio.pause();
      this.isContinuousPlaying = false;
      this.isContinuousPaused = false;
    }
    
    this.currentSoundMode = soundMode;
    this.saveProgress();
    this.isSoundSelectorOpen = false;
  }

  // Get current daily goal progress percentage
  get dailyGoalProgress(): number {
    return Math.min((this.roundsCompleted / 16) * 100, 100);
  }
}
