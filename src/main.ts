import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app.component';
import { TableViewComponent } from './app/table-view/table-view.component';
import { DetailViewComponent } from './app/detail-view/detail-view.component';

const routes = [
  { path: '', component: TableViewComponent },
  { path: 'detail/:id', component: DetailViewComponent },
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
  ],
}).catch(err => console.error(err));