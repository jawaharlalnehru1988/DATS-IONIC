import { Component, Input } from '@angular/core';

import { 
  IonButton, 
  IonIcon, 
  IonActionSheet,
  IonToast 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  shareOutline, 
  logoWhatsapp, 
  logoFacebook, 
  logoTwitter, 
  copyOutline,
  linkOutline 
} from 'ionicons/icons';
import { SocialShareService } from '../../services/social-share.service';
import { Blog } from '../../services/blog.service';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonActionSheet,
    IonToast
]
})
export class ShareButtonComponent {
  @Input() blog!: Blog;
  @Input() showText: boolean = true;

  isActionSheetOpen = false;
  isToastOpen = false;
  toastMessage = '';

  shareButtons = [
    {
      text: 'WhatsApp',
      icon: 'logo-whatsapp',
      color: 'success',
      handler: () => this.shareOnWhatsApp()
    },
    {
      text: 'Facebook',
      icon: 'logo-facebook',
      color: 'primary',
      handler: () => this.shareOnFacebook()
    },
    {
      text: 'Twitter',
      icon: 'logo-twitter',
      color: 'tertiary',
      handler: () => this.shareOnTwitter()
    },
    {
      text: 'Copy Link',
      icon: 'copy-outline',
      color: 'medium',
      handler: () => this.copyLink()
    },
    {
      text: 'Cancel',
      role: 'cancel',
      icon: 'close'
    }
  ];

  constructor(private socialShareService: SocialShareService) {
    addIcons({
      shareOutline,
      logoWhatsapp,
      logoFacebook,
      logoTwitter,
      copyOutline,
      linkOutline
    });
  }

  openShareSheet() {
    this.isActionSheetOpen = true;
  }

  async shareOnWhatsApp() {
    this.socialShareService.shareOnWhatsApp(this.blog);
    this.isActionSheetOpen = false;
  }

  shareOnFacebook() {
    this.socialShareService.shareOnFacebook(this.blog);
    this.isActionSheetOpen = false;
  }

  shareOnTwitter() {
    this.socialShareService.shareOnTwitter(this.blog);
    this.isActionSheetOpen = false;
  }

  async copyLink() {
    const success = await this.socialShareService.copyToClipboard(this.blog);
    this.isActionSheetOpen = false;
    
    if (success) {
      this.toastMessage = '✅ Link copied to clipboard!';
      this.isToastOpen = true;
    } else {
      this.toastMessage = '❌ Failed to copy link';
      this.isToastOpen = true;
    }
  }

  async tryNativeShare() {
    const success = await this.socialShareService.nativeShare(this.blog);
    if (!success) {
      // Fallback to action sheet
      this.openShareSheet();
    }
  }
}
