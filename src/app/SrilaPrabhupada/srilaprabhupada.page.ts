import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonGrid, IonRow, IonCol, IonButton, IonBackButton, IonContent, IonPopover, IonCheckbox } from '@ionic/angular/standalone';
import {  IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, add, home, heartOutline, cafeOutline, personOutline, chevronDownOutline, notificationsOutline, optionsOutline, play, playOutline, pause, stop, searchOutline, chevronForwardOutline, colorPaletteOutline, chatbubbleOutline, imageOutline, micOutline, videocamOutline, musicalNotesOutline, schoolOutline, documentOutline } from 'ionicons/icons';
import { ToastController } from '@ionic/angular';


interface ContentCard {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  category: string;
  type: 'quote' | 'image' | 'lecture' | 'video' | 'kirtan' | 'diksha';
  duration?: string;
  description?: string;
  actionText?: string;
}

interface Category {
  id: string;
  name: string;
  type: string;
  cards: ContentCard[];
}

@Component({
  selector: 'app-srilaprabhupada',
  templateUrl: './srilaprabhupada.page.html',
  styleUrls: ['./srilaprabhupada.page.scss'],
  standalone: true,
  imports: [IonCheckbox, IonMenuButton, IonPopover, IonContent, IonIcon, IonButton, IonButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons],
})
export class InboxPage implements OnInit {
  // Theme management properties
  currentTheme: string = 'theme-devotion';
  isThemeSelectorOpen: boolean = false;
  themePopoverEvent: any;
  
  themes = [
    { name: 'theme-devotion', label: 'Golden Devotion', color: '#d4af37' },
    { name: 'theme-peace', label: 'Peaceful Blue', color: '#4682b4' },
    { name: 'theme-nature', label: 'Nature Green', color: '#228b22' },
    { name: 'theme-wisdom', label: 'Deep Purple', color: '#6a5acd' },
    { name: 'theme-compassion', label: 'Rose Compassion', color: '#db7093' }
  ];

categories: Category[] = [
    {
      id: 'quotes',
      name: 'Quotes Cards',
      type: 'quotes',
      cards: [
        {
          id: 'q1',
          title: 'Divine Wisdom',
          subtitle: 'On Krishna Consciousness',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699516/smiling_prabhupada_qysp79.jpg',
          category: 'quotes',
          type: 'quote',
          actionText: 'Read Quote'
        },
        {
          id: 'q2',
          title: 'Spiritual Truth',
          subtitle: 'About Devotional Service',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699517/spiritual-master_fyhauq.jpg',
          category: 'quotes',
          type: 'quote',
          actionText: 'Read Quote'
        },
        {
          id: 'q3',
          title: 'Life Lessons',
          subtitle: 'From Bhagavad Gita',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699506/bhagavatam_abyeaj.jpg',
          category: 'quotes',
          type: 'quote',
          actionText: 'Read Quote'
        },
        {
          id: 'q4',
          title: 'Chanting Glory',
          subtitle: 'Holy Names Power',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699505/chanting_nhh2pp.jpg',
          category: 'quotes',
          type: 'quote',
          actionText: 'Read Quote'
        },
        {
          id: 'q5',
          title: 'Love of God',
          subtitle: 'Pure Devotion',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699512/obesance_to_krishna_a3vdys.jpg',
          category: 'quotes',
          type: 'quote',
          actionText: 'Read Quote'
        },
        {
          id: 'q6',
          title: 'Surrender',
          subtitle: 'Complete Faith',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699512/namaskara_hpyntt.jpg',
          category: 'quotes',
          type: 'quote',
          actionText: 'Read Quote'
        }
      ]
    },
    {
      id: 'images',
      name: 'Images',
      type: 'images',
      cards: [
        {
          id: 'i1',
          title: 'Walking Meditation',
          subtitle: 'Peaceful Moments',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699580/wlking_sfxybu.jpg',
          category: 'images',
          type: 'image',
          actionText: 'View Image'
        },
        {
          id: 'i2',
          title: 'Sea Shore Walk',
          subtitle: 'Contemplation',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699530/walking_on_sea_shore_moaujt.jpg',
          category: 'images',
          type: 'image',
          actionText: 'View Image'
        },
        {
          id: 'i3',
          title: 'Park Stroll',
          subtitle: 'Daily Exercise',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699522/walking_on_park_sqszvh.jpg',
          category: 'images',
          type: 'image',
          actionText: 'View Image'
        },
        {
          id: 'i4',
          title: 'Simple Walk',
          subtitle: 'Natural Beauty',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699520/walk_w2rcjg.jpg',
          category: 'images',
          type: 'image',
          actionText: 'View Image'
        },
        {
          id: 'i5',
          title: 'Happy Moments',
          subtitle: 'Joyful Expression',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699509/happy_looking_hmwjkn.jpg',
          category: 'images',
          type: 'image',
          actionText: 'View Image'
        },
        {
          id: 'i6',
          title: 'Devotional Smile',
          subtitle: 'Pure Joy',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699516/sitting_and_smiling_tcfzdw.jpg',
          category: 'images',
          type: 'image',
          actionText: 'View Image'
        }
      ]
    },
    {
      id: 'lectures',
      name: 'Lectures',
      type: 'lectures',
      cards: [
        {
          id: 'l1',
          title: 'Bhagavatam Class',
          subtitle: 'Daily Wisdom',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699506/class_l5kuwu.jpg',
          category: 'lectures',
          type: 'lecture',
          duration: '45 min',
          actionText: 'Listen Now'
        },
        {
          id: 'l2',
          title: 'Upanyasa',
          subtitle: 'Spiritual Discourse',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699519/upanyasa_umiqgq.jpg',
          category: 'lectures',
          type: 'lecture',
          duration: '60 min',
          actionText: 'Listen Now'
        },
        {
          id: 'l3',
          title: 'Lecturing',
          subtitle: 'Krishna Consciousness',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699509/lecturing_qptgp1.jpg',
          category: 'lectures',
          type: 'lecture',
          duration: '38 min',
          actionText: 'Listen Now'
        },
        {
          id: 'l4',
          title: 'Q&A Session',
          subtitle: 'Answering Questions',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699505/answering_questions_kioj8x.jpg',
          category: 'lectures',
          type: 'lecture',
          duration: '52 min',
          actionText: 'Listen Now'
        },
        {
          id: 'l5',
          title: 'Recording Session',
          subtitle: 'Studio Lecture',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699514/recording_szo4jl.jpg',
          category: 'lectures',
          type: 'lecture',
          duration: '42 min',
          actionText: 'Listen Now'
        },
        {
          id: 'l6',
          title: 'Transcribing',
          subtitle: 'Book Preparation',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699518/transcribing_dhnfh8.jpg',
          category: 'lectures',
          type: 'lecture',
          duration: '35 min',
          actionText: 'Listen Now'
        }
      ]
    },
    {
      id: 'videos',
      name: 'Videos',
      type: 'videos',
      cards: [
        {
          id: 'v1',
          title: 'Cooking Prasadam',
          subtitle: 'Kitchen Wisdom',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699506/cooking_rhpefl.jpg',
          category: 'videos',
          type: 'video',
          duration: '25 min',
          actionText: 'Watch Now'
        },
        {
          id: 'v2',
          title: 'Prasada Seva',
          subtitle: 'Serving Devotees',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699512/prasada_seva_bmhunq.jpg',
          category: 'videos',
          type: 'video',
          duration: '18 min',
          actionText: 'Watch Now'
        },
        {
          id: 'v3',
          title: 'Ratha Yatra',
          subtitle: 'Festival Celebration',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699514/rath_uzkcbv.jpg',
          category: 'videos',
          type: 'video',
          duration: '30 min',
          actionText: 'Watch Now'
        },
        {
          id: 'v4',
          title: 'Pooja Ceremony',
          subtitle: 'Temple Worship',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699512/pooja_absnmc.jpg',
          category: 'videos',
          type: 'video',
          duration: '40 min',
          actionText: 'Watch Now'
        },
        {
          id: 'v5',
          title: 'India Journey',
          subtitle: 'Holy Land Visit',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699509/india_a8txkw.jpg',
          category: 'videos',
          type: 'video',
          duration: '55 min',
          actionText: 'Watch Now'
        },
        {
          id: 'v6',
          title: 'With Devotees',
          subtitle: 'Community Time',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699507/devot_amrs31.jpg',
          category: 'videos',
          type: 'video',
          duration: '22 min',
          actionText: 'Watch Now'
        }
      ]
    },
    {
      id: 'kirtans',
      name: 'Kirtans',
      type: 'kirtans',
      cards: [
        {
          id: 'k1',
          title: 'Singing Prabhupada',
          subtitle: 'Divine Melodies',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699515/singing_prabhupada_g479a1.jpg',
          category: 'kirtans',
          type: 'kirtan',
          duration: '12 min',
          actionText: 'Listen Now'
        },
        {
          id: 'k2',
          title: 'Harmonium Session',
          subtitle: 'Musical Devotion',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699509/harmonium_yumk11.jpg',
          category: 'kirtans',
          type: 'kirtan',
          duration: '15 min',
          actionText: 'Listen Now'
        },
        {
          id: 'k3',
          title: 'Mridanga & Harmonium',
          subtitle: 'Classical Combination',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699512/mritanga_with_harmonium_sm18bu.jpg',
          category: 'kirtans',
          type: 'kirtan',
          duration: '18 min',
          actionText: 'Listen Now'
        },
        {
          id: 'k4',
          title: 'Playing Mridanga',
          subtitle: 'Rhythmic Devotion',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699512/playing_mrtanga_ycev4y.jpg',
          category: 'kirtans',
          type: 'kirtan',
          duration: '20 min',
          actionText: 'Listen Now'
        },
        {
          id: 'k5',
          title: 'Karatal Rhythm',
          subtitle: 'Hand Cymbals',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699509/karatal_cmmhdv.jpg',
          category: 'kirtans',
          type: 'kirtan',
          duration: '10 min',
          actionText: 'Listen Now'
        },
        {
          id: 'k6',
          title: 'Singing Session',
          subtitle: 'Holy Names',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699515/singing_pp_bkhcz1.jpg',
          category: 'kirtans',
          type: 'kirtan',
          duration: '25 min',
          actionText: 'Listen Now'
        }
      ]
    },
    {
      id: 'diksha',
      name: 'Diksha',
      type: 'diksha',
      cards: [
        {
          id: 'd1',
          title: 'Diksha Ceremony',
          subtitle: 'Initiation Process',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699507/diksha_chanting_j1bgrd.jpg',
          category: 'diksha',
          type: 'diksha',
          actionText: 'Learn More'
        },
        {
          id: 'd2',
          title: 'Sanyasa Initiation',
          subtitle: 'Renounced Order',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699515/sanyasa_rf6xx0.jpg',
          category: 'diksha',
          type: 'diksha',
          actionText: 'Learn More'
        },
        {
          id: 'd3',
          title: 'Sanyasa Danda',
          subtitle: 'Sacred Staff',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699514/sanyasa_danta_2_yrhiwk.jpg',
          category: 'diksha',
          type: 'diksha',
          actionText: 'Learn More'
        },
        {
          id: 'd4',
          title: 'Panchanga Namaskara',
          subtitle: 'Prostration Teaching',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699512/panchanga_namaskara_vbhqbs.jpg',
          category: 'diksha',
          type: 'diksha',
          actionText: 'Learn More'
        },
        {
          id: 'd5',
          title: 'Spiritual Master',
          subtitle: 'Guru Principle',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699512/prabhu_guzgek.jpg',
          category: 'diksha',
          type: 'diksha',
          actionText: 'Learn More'
        },
        {
          id: 'd6',
          title: 'Standing Observe',
          subtitle: 'Spiritual Guidance',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699517/standing_observe_butvks.jpg',
          category: 'diksha',
          type: 'diksha',
          actionText: 'Learn More'
        }
      ]
    }
  ];




  constructor(private toastController: ToastController) { 
    addIcons({searchOutline,heartOutline,colorPaletteOutline,chevronForwardOutline,star,add,home,play,playOutline,pause,stop,cafeOutline,personOutline,chevronDownOutline,notificationsOutline,optionsOutline,chatbubbleOutline,imageOutline,micOutline,videocamOutline,musicalNotesOutline,schoolOutline,documentOutline});
  }

  ngOnInit() {
    this.loadTheme();
  }

  // Theme Management Methods
  loadTheme() {
    const savedTheme = localStorage.getItem('devotee-app-theme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
    }
    this.applyTheme();
  }

  applyTheme() {
    // Remove all theme classes from body
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    // Add current theme class to body
    document.body.classList.add(this.currentTheme);
    
    // Also trigger change detection by updating a component property
    this.currentTheme = this.currentTheme;
  }

  showThemeSelector(event?: any) {
    this.isThemeSelectorOpen = true;
  }

  closeThemeSelector() {
    this.isThemeSelectorOpen = false;
  }

  async selectTheme(themeName: string) {
    console.log('Selecting theme:', themeName);
    this.currentTheme = themeName;
    localStorage.setItem('devotee-app-theme', themeName);
    this.applyTheme();
    this.closeThemeSelector();

    // Show success toast
    const toast = await this.toastController.create({
      message: `🎨 Theme changed to ${this.themes.find(t => t.name === themeName)?.label}`,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

  getTypeIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'quote': 'chatbubble-outline',
      'image': 'image-outline',
      'lecture': 'mic-outline',
      'video': 'videocam-outline',
      'kirtan': 'musical-notes-outline',
      'diksha': 'school-outline'
    };
    
    return iconMap[type] || 'document-outline';
  }

    onCardClick(card: ContentCard) {
    console.log('Card clicked:', card);
    // Navigate to detail page or open modal
  }

  onCategoryAction(category: Category) {
    console.log('Category action:', category);
    // Navigate to category page
  }

}
