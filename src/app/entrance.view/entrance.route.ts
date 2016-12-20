import { Routes } from '@angular/router';
import { FirstLoginComponent } from './first.view/firstlogin.component';
import { SecondLoginComponent } from './second.view/secondlogin.component';
import { FirstGatewayService } from '../service';

export const ENTRANCE_ROUTES: Routes = [
  { path: '', component : FirstLoginComponent, pathMatch : 'full' },
  { path: 'select-user', component: SecondLoginComponent, canActivate: [FirstGatewayService] }
];
