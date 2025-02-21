import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'events', loadChildren: () => import('./modules/events/events.module').then(m => m.EventsModule) },
  { path: 'ticketing', loadChildren: () => import('./modules/ticketing/ticketing.module').then(m => m.TicketingModule) },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
];
