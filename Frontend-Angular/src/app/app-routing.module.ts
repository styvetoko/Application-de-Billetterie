import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home.component'; // Exemple de composant pour la page d'accueil

const routes: Routes = [
  { path: '', component: HomeComponent },  // Exemple d'une route pour la page d'accueil
  { path: 'events', loadChildren: () => import('./modules/events/events.module').then(m => m.EventsModule) },
  { path: 'ticketing', loadChildren: () => import('./modules/ticketing/ticketing.module').then(m => m.TicketingModule) },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
