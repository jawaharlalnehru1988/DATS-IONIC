import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  
  IonHeader, 
  IonTitle, 
  IonSpinner, 
  IonMenuButton, 
  IonToolbar, 
  IonAccordion, 
  IonAccordionGroup, 
  IonItem, 
  IonLabel, 
  IonButtons,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  ModalController
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicDetailsService } from './music-details.service';
import { DetailModel, ISlokaChapters } from './music.model';
import { map } from 'rxjs';
import { addIcons } from 'ionicons';
import { 
  musicalNotes, 
  musicalNote, 
  heartOutline, 
  shareOutline, 
  star, 
  library, 
  volumeHigh, 
  book, 
  globe, 
  construct, 
  play, arrowBack, add } from 'ionicons/icons';
import { IonicAudioPlayerComponent } from '../components/ionic-audio-player/ionic-audio-player.component';
import { DisplayCardListComponent } from "../components";
import { CardItem, InputData } from '../Utils/models';
import { CategoryCard } from '../Utils/models/card.model';
import { DataSharingService } from '../services/data-sharing.service';
import { CategoryFormComponent } from "../Utils/components/category-form/category-form.component";
import { CategoryFormService } from '../Utils/components/category-form/category-form.service';


@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.page.html',
  styleUrls: ['./music-details.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonSpinner,
    IonMenuButton,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonButton,
    IonIcon,
    // IonCard,
    // IonCardHeader,
    // IonCardTitle,
    // IonCardContent,
    CommonModule,
    FormsModule,
    DisplayCardListComponent
]
})
export class MusicDetailsPage implements OnInit {
  topics:{ title: string; content: string; } = { title: '', content: '' };
  msDatas: DetailModel[] = [];
  isLoading = true;
  language:string | null = '';
  tamilChapters:ISlokaChapters[] = [];

  inputDatas: InputData[] = [];
  
  // Store submitted category data
  submittedCategoryData: CategoryCard | null = null;
  
  // Audio player properties
  selectedAudio: any = null;
  groupedChapters: ISlokaChapters[] = [];

  constructor(
    private route: ActivatedRoute, 
    private mdService: MusicDetailsService, 
    private categoryService: CategoryFormService,
    private dataSharingService: DataSharingService, 
    private router: Router,
    private modalController: ModalController
  ) {
    addIcons({musicalNotes,heartOutline,shareOutline,musicalNote,add,arrowBack,star,volumeHigh,play,library,book,globe,construct});
  }

  ngOnInit() {
    this.getRoutingDetails();
    this.getImportantSlokas();
    this.getAllSlokas();
  }

  getAllSlokas(){
   this.categoryService.getAllCategories().subscribe({
      next: (data:InputData[]) => {
      console.log('data :', data);
      this.inputDatas = data;
    
        this.isLoading = false; // Set loading to false when data is received
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.isLoading = false; // Set loading to false even on error
      }
    });
  }
  
  getImportantSlokas(){
    this.mdService.getAll41Slokas().pipe(
    map(arr => arr.sort((a, b) => (a.orderNo) - (b.orderNo)))
  ).subscribe({
      next:(res:DetailModel[])=>{
      this.msDatas = res;
       this.isLoading = false;
      },
      error:()=>{
        this.isLoading = false;
        console.error("there is something wrong with the network");
      }
    });
  }

  getRoutingDetails(){
this.route.paramMap.subscribe(params => {
    this.language = params.get('language');
    switch (this.language) {
      case 'Tamil':
        this.topics =  { title: 'ஸ்ரீமத் பகவத் கீதை', content: 'தமிழில் கேட்டு மகிழுங்கள்' };
          break;
      case 'sloka 35':
        this.topics =  { title: '35 ஸ்ரீமத் பகவத் கீதை ஸ்லோகங்கள்', content: 'தமிழில் கேட்டு மனனம் செய்யுங்கள்' };
          break;
      case 'English':
        this.topics = 
          { title: 'Srimad Bhagavad Gita', content: 'Enjoy by hearing in English' };
        break;
      case 'Kannada':
        this.topics = { title: 'ಶ್ರೀಮದ್ ಭಗವದ್ಗೀತಾ', content: 'ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ ಆನಂದಿಸಿ' }

        break;
      case 'Hindi':
        this.topics = { title: 'श्रीमद्भगवद गीता', content: 'हिन्दी में सुनकर आनंद लें' };
        break;
      default:
        this.topics = { title: 'Unknown Language', content: 'Content not available' };
        break;
    }
     
    });
  }

  onCardClick(language: any) {
    console.log(`Card clicked: ${language}`);
  }

  // Audio player methods
  playSloka(sloka: DetailModel) {
    this.selectedAudio = {
      title: sloka.slokaNo,
      auther: 'Srimad Bhagavad Gita',
      audioSrc: sloka.SlokaVoice,
      imageSrc: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699516/sitting_with_books_ova3dl.jpg'
    };
  }

  playChapter(chapter: ISlokaChapters) {
    this.selectedAudio = {
      title: chapter.chapterName,
      auther: chapter.chapterNo,
      audioSrc: chapter.slokaAudio,
      imageSrc: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699516/sitting_with_books_ova3dl.jpg'
    };
  }

  closeAudioPlayer() {
    this.selectedAudio = null;
  }

  // New method to go back to cards
  backToCards() {
    this.selectedAudio = null;
  }

  // Method to get content type name for back button
  getContentTypeName(): string {
    switch (this.language) {
      case 'sloka 35':
        return 'Slokas';
      case 'Tamil':
        return 'Chapters';
      case 'English':
        return 'English Content';
      case 'Hindi':
        return 'Hindi Content';
      case 'Kannada':
        return 'Kannada Content';
      default:
        return 'Content';
    }
  }

  // Utility methods
  getChapterNumber(chapterNo: string): string {
    // Extract number from chapter string like "அத்தியாயம் ஒன்று" -> "1"
    const numbers = ['ஒன்று', 'இரண்டு', 'மூன்று', 'நான்கு', 'ஐந்து', 'ஆறு', 'ஏழு', 'எட்டு', 'ஒன்பது', 'பத்து'];
    for (let i = 0; i < numbers.length; i++) {
      if (chapterNo.includes(numbers[i])) {
        return (i + 1).toString();
      }
    }
    return '1';
  }

  getTotalContent(): number {
    return this.msDatas.length + this.tamilChapters.length;
  }

  onCardSelected(item: CardItem) {
    this.dataSharingService.setSelectedCardItem(item);
    this.router.navigate(['/card-details']);
  }

  // Open category form in modal
  async openCategoryModal() {
    const { CategoryFormModalComponent } = await import('../Utils/components/category-form-modal/category-form-modal.component');
    
    const modal = await this.modalController.create({
      component: CategoryFormModalComponent,
      cssClass: 'category-form-modal',
      backdropDismiss: false,
      showBackdrop: true
    });

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.submitted) {
        this.onCategoryFormSubmit(result.data.categoryData);
      }
    });

    const presentResult = await modal.present();
    
    // Apply styles after modal is presented with a small delay
    setTimeout(() => {
      const modalElement = document.querySelector('ion-modal.category-form-modal') as HTMLElement;
      if (modalElement) {
        modalElement.style.setProperty('--width', '95%');
        modalElement.style.setProperty('--max-width', '95vw');
        modalElement.style.setProperty('--height', '95%');
        modalElement.style.setProperty('--max-height', '95vh');
        modalElement.style.setProperty('--border-radius', '12px');
        
        // Position the modal to the right
        const wrapper = modalElement.querySelector('.modal-wrapper') as HTMLElement;
        if (wrapper) {
          wrapper.style.position = 'fixed';
          wrapper.style.right = '2.5%';
          wrapper.style.left = 'auto';
          wrapper.style.top = '50%';
          wrapper.style.transform = 'translateY(-50%)';
          wrapper.style.width = '95%';
          wrapper.style.height = '95%';
          wrapper.style.maxWidth = '95vw';
          wrapper.style.maxHeight = '95vh';
          wrapper.style.borderRadius = '12px';
        }
      }
    }, 100);

    return presentResult;
  }

  // Handle category form submission
  onCategoryFormSubmit(categoryData: CategoryCard) {
    // console.log('=== Category Form Submitted ===');
    // console.log('Category Name:', categoryData.categoryName);
    // console.log('Number of Card Items:', categoryData.cardItems.length);
    // console.log('Full Category Data:', categoryData);
    
    // Store the submitted data
    // this.submittedCategoryData = categoryData;
    console.log('categoryData :', categoryData);
    
    // Log each card item details
    // categoryData.cardItems.forEach((cardItem, index) => {
    //   console.log(`\n--- Card Item ${index + 1} ---`);
    //   console.log('Title:', cardItem.title);
    //   console.log('Category:', cardItem.category);
    //   console.log('Description:', cardItem.desc);
    //   console.log('Image URL:', cardItem.img);
    //   console.log('Rating:', cardItem.rating);
    //   console.log('Action:', cardItem.action);
    //   console.log('Audio Data:', {
    //     audioSrc: cardItem.audioData.audioSrc,
    //     imageSrc: cardItem.audioData.imageSrc,
    //     author: cardItem.audioData.auther,
    //     title: cardItem.audioData.title
    //   });
    // });

    // You can also show an alert or toast to the user
    // For now, let's just log it to console
    // You could also save this data to a service or send it to a server
  }
}
