import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonList, IonItem, IonIcon, IonLabel, IonButton, IonButtons, IonTextarea } from '@ionic/angular/standalone';
import { call, globe, logoAndroid, logoApple, logoWhatsapp, mail, map, musicalNotes, send } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ThemeService, ThemeType } from '../services/theme.service';
import { Subscription } from 'rxjs';
import { ReusableHeaderComponent } from '../components';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  standalone: true,
  imports: [IonTextarea, ReusableHeaderComponent, IonLabel, IonButton, IonIcon, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ContactsPage implements OnInit, OnDestroy {
  @HostBinding('class') get themeClass() {
    return this.currentTheme;
  }

  mobileApps = [
    { name: 'Bhakti App', icon: 'logo-android', link: 'https://play.google.com/store/apps/details?id=bhakti.app' },
    { name: 'Krishna Connect', icon: 'logo-apple', link: 'https://apps.apple.com/app/krishna-connect/id123456789' },
    { name: 'Temple Locator', icon: 'map', link: 'https://templelocator.example.com' },
    { name: 'Daily Kirtan', icon: 'musical-notes', link: 'https://dailykirtan.example.com' }
  ];

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

  userMessage: string = '';
  currentTheme: ThemeType = 'theme-royal';
  private themeSubscription: Subscription = new Subscription();

  constructor(private themeService: ThemeService) { 
    addIcons({call,logoWhatsapp,mail,globe,map,send,musicalNotes,logoApple,logoAndroid});
  }

  ngOnInit() {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy() {
    // Clean up subscription
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
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

}
