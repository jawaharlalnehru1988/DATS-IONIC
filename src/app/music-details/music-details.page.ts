import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  
  IonSpinner, 
  IonContent,
  IonButton,
  IonIcon,
  IonSkeletonText,
  ModalController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
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
import { DisplayCardListComponent, ReusableHeaderComponent } from "../components";
import { CardItem, InputData } from '../Utils/models';
import { CategoryCard } from '../Utils/models/card.model';
import { DataSharingService } from '../services/data-sharing.service';
import { CategoryFormService } from '../Utils/components/category-form/category-form.service';

@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.page.html',
  styleUrls: ['./music-details.page.scss'],
  standalone: true,
  imports: [
    IonSkeletonText,
    IonContent,
    IonButton,
    IonIcon,
    CommonModule,
    FormsModule,
    DisplayCardListComponent,
    ReusableHeaderComponent
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
   this.categoryService.getAllCategories('music-details').subscribe({
      next: (data:InputData[]) => {
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
    this.topics = { title: 'Srimad Bhagavad Gita', content: 'Feel the bliss of necterian words of Lord Krishna' };

  }

  onCardSelected(item: CardItem) {
    // Collect all card items from all chapters to create playlist
    const allCardItems: CardItem[] = [];
    
    this.inputDatas.forEach(inputData => {
      if (inputData?.cardItems) {
        allCardItems.push(...inputData.cardItems);
      }
    });
    
    // Sort all items same way as display-card-list component
    const sortedItems = allCardItems.sort((a, b) => {
      const categoryA = parseInt(a.category, 10);
      const categoryB = parseInt(b.category, 10);
      
      if (isNaN(categoryA) && isNaN(categoryB)) {
        return a.category.localeCompare(b.category);
      }
      if (isNaN(categoryA)) return 1;
      if (isNaN(categoryB)) return -1;
      
      return categoryA - categoryB;
    });
    
    this.dataSharingService.setPlaylistData(sortedItems);
    console.log('Playlist set for music-details with', sortedItems.length, 'items from', this.inputDatas.length, 'chapters');
    
    this.dataSharingService.setSelectedCardItem(item);
    this.router.navigate(['/card-details']);
  }

  onPlayAllClicked(cardItems: CardItem[]) {
    // Set the playlist with the sorted card items from this specific category
    this.dataSharingService.setPlaylistData(cardItems);
    console.log('Play All clicked - Playlist set with', cardItems.length, 'items');
    
    // Set the first card as selected and navigate to card details
    if (cardItems.length > 0) {
      this.dataSharingService.setSelectedCardItem(cardItems[0]);
      this.router.navigate(['/card-details']);
    }
  }

  // Open category form in modal
  async openCategoryModal() {
    const { CategoryFormModalComponent } = await import('../Utils/components/category-form-modal/category-form-modal.component');
    
    const modal = await this.modalController.create({
      component: CategoryFormModalComponent,
      componentProps: {
        pageIdentifier: 'music-details'
      },
      cssClass: 'category-form-modal',
      backdropDismiss: false,
      showBackdrop: true
    });

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.submitted) {
       
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

}
