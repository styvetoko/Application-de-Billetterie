import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**', // Capture toutes les routes qui ne sont pas définies
    renderMode: RenderMode.Prerender
  }
];
