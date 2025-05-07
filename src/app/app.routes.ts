import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inbox',
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
    path: 'folder',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'inbox',
    loadComponent: () => import('./inbox/inbox.page').then( m => m.InboxPage)
  },
  {
    path: 'outbox',
    loadComponent: () => import('./outbox/outbox.page').then( m => m.OutboxPage)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./favorites/favorites.page').then( m => m.FavoritesPage)
  },
  {
    path: 'archived',
    loadComponent: () => import('./archived/archived.page').then( m => m.ArchivedPage)
  },
  {
    path: 'spam',
    loadComponent: () => import('./spam/spam.page').then( m => m.SpamPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },  {
    path: 'music',
    loadComponent: () => import('./music/music.page').then( m => m.MusicPage)
  },
  {
    path: 'music-details',
    loadComponent: () => import('./music-details/music-details.page').then( m => m.MusicDetailsPage)
  },

];
