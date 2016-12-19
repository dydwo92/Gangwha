import { Routes } from '@angular/router';
import { DetailComponent } from './detail.view/detail.component';
import { WriteComponent } from './write.view/write.component';

export const MAIN_ROUTES: Routes = [
  { path: '', component : DetailComponent, pathMatch : 'full' },
  { path: 'write', component : WriteComponent }
];
