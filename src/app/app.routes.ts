import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: 'lordkrishna',
    loadComponent: () => import('./krishna-page/krishna-page.page').then( m => m.KrishnaPagePage),
  },
  {
    path: 'tutorial',
    loadComponent: () => import('./tutorial/tutorial.page').then( m => m.TutorialPage),
  },
  {
    path: 'srilaprabhupada',
    loadComponent: () => import('./SrilaPrabhupada/srilaprabhupada.page').then( m => m.InboxPage)
  },
  {
    path: 'membership',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'contacts',
    loadComponent: () => import('./contacts/contacts.page').then( m => m.ContactsPage)
  },
  {
    path: 'articles',
    loadComponent: () => import('./articles/articles.component').then( m => m.ArticlesComponent)
  },
  {
    path: 'blog-details/:id',
    loadComponent: () => import('./components/blog-detail/blog-detail.component').then( m => m.BlogDetailComponent)
  },
  {
    path: 'questionanswered',
    loadComponent: () => import('./questions/questions.page').then( m => m.QuestionsPage)
  },
  {
    path: 'calender',
    loadComponent: () => import('./calendar/calendar.page').then( m => m.CalendarPage)
  },
  {
    path: 'audios',
    loadComponent: () => import('./music/music.page').then( m => m.MusicPage)
  },
  {
    path: 'music-details/:language',
    loadComponent: () => import('./music-details/music-details.page').then( m => m.MusicDetailsPage)
  },
  {
    path: 'tutorial-details/:id',
    loadComponent: () => import('./tutorial-details/tutorial-details.page').then(m => m.TutorialDetailsPage)
  },
  {
    path: 'chant',
    loadComponent: () => import('./chant/chant.page').then( m => m.ChantPage)
  },
  {
    path: 'krishna-page',
    loadComponent: () => import('./krishna-page/krishna-page.page').then( m => m.KrishnaPagePage)
  },
  {
    path: 'card-details',
    loadComponent: () => import('./components/card-details/card-details.component').then( m => m.CardDetailsComponent)
  },
  {
    path: 'rich-text-demo',
    loadComponent: () => import('./rich-text-demo/rich-text-demo.page').then( m => m.RichTextDemoPage)
  }
];
