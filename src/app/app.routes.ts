import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'srilaprabhupada',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'practice',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'tutorial',
    loadComponent: () => import('./tutorial/tutorial.page').then( m => m.TutorialPage)
  },
  {
    path: 'srilaprabhupada',
    loadComponent: () => import('./inbox/inbox.page').then( m => m.InboxPage)
  },
  {
    path: 'books',
    loadComponent: () => import('./outbox/outbox.page').then( m => m.OutboxPage)
  },
  {
    path: 'articles',
    loadComponent: () => import('./articles/articles.component').then( m => m.ArticlesComponent)
  },
  {
    path: 'questionanswered',
    loadComponent: () => import('./archived/archived.page').then( m => m.ArchivedPage)
  },
  {
    path: 'calender',
    loadComponent: () => import('./spam/spam.page').then( m => m.SpamPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'audios',
    loadComponent: () => import('./music/music.page').then( m => m.MusicPage)
  },
  {
    path: 'music-details',
    loadComponent: () => import('./music-details/music-details.page').then( m => m.MusicDetailsPage)
  },
  {
    path: 'tutorial-details/:id',
    loadComponent: () => import('./tutorial-details/tutorial-details.page').then(m => m.TutorialDetailsPage)
  }

];
