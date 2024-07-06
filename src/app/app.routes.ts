import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./auth/signup/signup.page').then(m => m.SignupPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./setting-menus/settings/settings.page').then(m => m.SettingsPage),
  },
  {
    path: 'settings/user',
    loadComponent: () => import('./setting-menus/user/user.page').then(m => m.UserPage)
  },
  {
    path: 'settings/addPlaylist',
    loadComponent: () => import('./setting-menus/add-playlist/add-playlist.page').then(m => m.AddPlaylistPage)
  }
];
