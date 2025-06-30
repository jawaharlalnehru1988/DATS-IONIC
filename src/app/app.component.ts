import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, easel, easelOutline, easelSharp, musicalNotesOutline, musicalNoteSharp, musicalNoteOutline, musicalNotesSharp, bookOutline, bookSharp, documentTextOutline, documentTextSharp, gitPullRequestOutline, gitPullRequestSharp, compassOutline, compassSharp, calendarOutline, calendarSharp, personCircleOutline, personCircleSharp, callOutline, callSharp, personAddOutline, personAddSharp, languageOutline, languageSharp } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
    { title: 'Srila Prabhupada', url: '/srilaprabhupada', icon: 'person-circle', iconColor: '#B34E05' },
    { title: 'Audios', url: '/audios', icon: 'musical-notes', iconColor: 'orange' },
    { title: 'Baby Names', url: '/articles', icon: 'document-text', iconColor: '#045B40' },
    // { title: 'Books', url: '/books', icon: 'book', iconColor: '#0E7B8A' },
    // { title: 'Questions Answered', url: '/questionanswered', icon: 'git-pull-request', iconColor: '#5B3D04' },
    // { title: 'Practice Tracker', url: '/practice', icon: 'compass', iconColor: '#1A986A' },
    { title: 'Vaishnava Calender', url: '/calender', icon: 'calendar', iconColor: '#230568' },
    { title: 'Tutorial', url: '/tutorial', icon: 'easel', iconColor: '#7D0250' },
    { title: 'Ekadasi history', url: '/ekadasi', icon: 'person-circle', iconColor: '#B34E05' },
  ];
   public additionals = [
    { title: 'Contacts', url: '/contacts', icon: 'call', iconColor: 'orange' },
    { title: 'Free Membership', url: '/membership', icon: 'person-add', iconColor: '#0E7B8A' },
    // { title: 'Articles', url: '/articles', icon: 'document-text', iconColor: '#045B40' },
    // { title: 'Questions Answered', url: '/questionanswered', icon: 'git-pull-request', iconColor: '#5B3D04' },
    // { title: 'Practice Tracker', url: '/practice', icon: 'compass', iconColor: '#1A986A' },
    { title: 'Language Selection', url: '/language', icon: 'language', iconColor: '#230568' },
  ];
  constructor() {
    addIcons({ mailOutline, mailSharp, callOutline, personAddOutline, languageOutline, languageSharp, personAddSharp, callSharp, paperPlaneOutline, compassOutline, personCircleOutline, personCircleSharp, calendarOutline, calendarSharp, compassSharp, documentTextOutline, documentTextSharp, gitPullRequestOutline, gitPullRequestSharp, bookOutline, bookSharp, musicalNotesOutline, musicalNotesSharp, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, easelOutline, easelSharp });
  }
}
