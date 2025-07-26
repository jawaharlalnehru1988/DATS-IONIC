import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonList, IonItem, IonIcon, IonLabel, IonButton, IonButtons, IonModal, IonTextarea } from '@ionic/angular/standalone';
import { call, globe, logoAndroid, logoApple, logoWhatsapp, mail, map, musicalNotes, send, colorPaletteOutline, close } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  standalone: true,
  imports: [IonTextarea, IonModal, IonButtons, IonLabel, IonButton, IonIcon, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton]
})
export class ContactsPage implements OnInit {
  mobileApps = [
    { name: 'Bhakti App', icon: 'logo-android', link: 'https://play.google.com/store/apps/details?id=bhakti.app' },
    { name: 'Krishna Connect', icon: 'logo-apple', link: 'https://apps.apple.com/app/krishna-connect/id123456789' },
    { name: 'Temple Locator', icon: 'map', link: 'https://templelocator.example.com' },
    { name: 'Daily Kirtan', icon: 'musical-notes', link: 'https://dailykirtan.example.com' }
  ];

  userMessage: string = '';

  contactMethods = [
    {
      label: 'Phone: +91 6382043976',
      icon: 'call',
      href: 'tel:+916382043976',
      color: ''
    },
    {
      label: 'WhatsApp: +91 6382043976',
      icon: 'logo-whatsapp',
      href: 'https://wa.me/1234567890',
      color: 'success'
    },
    {
      label: 'Email: askharekrishna@gmail.com',
      icon: 'mail',
      href: 'mailto:askharekrishna@gmail.com',
      color: ''
    },
    {
      label: 'Website: askharekrishna.com',
      icon: 'globe',
      href: 'https://askharekrishna.com',
      color: ''
    }
  ];

  currentTheme: string = 'theme-ocean';
  isThemeModalOpen: boolean = false;

  constructor() { 
    addIcons({colorPaletteOutline,map,send,close,call,logoWhatsapp,mail,globe,musicalNotes,logoApple,logoAndroid});
  }

  ngOnInit() {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
    }
  }

  submitMessage() {
    // You can replace this with actual backend logic or toast
    if (this.userMessage.trim()) {
      alert('Your message has been sent!');
      this.userMessage = '';
    } else {
      alert('Please enter a message before submitting.');
    }
  }

  setTheme(theme: string) {
    this.currentTheme = theme;
    // Save theme preference to localStorage
    localStorage.setItem('selectedTheme', theme);
  }

  // Theme modal methods
  openThemeSelector() {
    this.isThemeModalOpen = true;
  }

  closeThemeSelector() {
    this.isThemeModalOpen = false;
  }

  selectTheme(theme: string) {
    this.setTheme(theme);
    this.closeThemeSelector();
  }

}
