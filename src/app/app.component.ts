import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, easel, easelOutline, easelSharp, musicalNotesOutline, musicalNoteSharp, musicalNoteOutline, musicalNotesSharp, bookOutline, bookSharp, documentTextOutline, documentTextSharp, gitPullRequestOutline, gitPullRequestSharp, compassOutline, compassSharp, calendarOutline, calendarSharp, personCircleOutline, personCircleSharp } from 'ionicons/icons';

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
    { title: 'Books', url: '/books', icon: 'book', iconColor: '#0E7B8A' },
    { title: 'articles', url: '/articles', icon: 'document-text', iconColor: '#045B40' },
    { title: 'Questions Answered', url: '/questionanswered', icon: 'git-pull-request', iconColor: '#5B3D04' },
    { title: 'Practice Tracker', url: '/practice', icon: 'compass', iconColor: '#1A986A' },
    { title: 'Vaishnava Calender', url: '/calender', icon: 'calendar', iconColor: '#230568' },
    { title: 'Tutorial', url: '/tutorial', icon: 'easel', iconColor: '#7D0250' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, compassOutline, personCircleOutline, personCircleSharp, calendarOutline, calendarSharp, compassSharp, documentTextOutline, documentTextSharp, gitPullRequestOutline, gitPullRequestSharp, bookOutline, bookSharp, musicalNotesOutline, musicalNotesSharp, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, easelOutline, easelSharp });
  }
}
