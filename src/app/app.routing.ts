import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EntranceComponent } from './entrance.view/entrance.component';
import { ENTRANCE_ROUTES } from './entrance.view/entrance.route';

import { MainComponent } from './main.view/main.component';
import { MAIN_ROUTES } from './main.view/main.route';

import { SecondGatewayService } from './service';

const APP_ROUTES: Routes = [
  {path: '', component: EntranceComponent, children: ENTRANCE_ROUTES},
  {path: 'home', component: MainComponent, children: MAIN_ROUTES, canActivate: [SecondGatewayService] },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [ RouterModule.forRoot(APP_ROUTES) ],
  exports : [ RouterModule ]
})
export class APP_ROUTING {}
