import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { EntranceComponent } from './entrance.component';
import { FirstLoginComponent } from './first.view/firstlogin.component';
import { SecondLoginComponent } from './second.view/secondlogin.component';

@NgModule({
  declarations: [
    EntranceComponent,
    FirstLoginComponent,
    SecondLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [ EntranceComponent ]
})
export class EntranceModule {}
