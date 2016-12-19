import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.view/main.component';
import { MAIN_ROUTES } from './main.view/main.route';

const APP_ROUTES: Routes = [
  {path: '', component: MainComponent, children: MAIN_ROUTES },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [ RouterModule.forRoot(APP_ROUTES) ],
  exports : [ RouterModule ]
})
export class APP_ROUTING {}
