import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { DetailComponent } from './detail.view/detail.component';
import { MenuComponent } from './menu.view/menu.component';
import { WriteComponent } from './write.view/write.component';

import { AngularFireModule } from 'angularfire2';

// FireBase config
export const firebaseConfig = {
  apiKey: "AIzaSyBh65kYyz-9N4dDnbWIpZK9itlZt3k3ljY",
  authDomain: "gangwha-e51e5.firebaseapp.com",
  databaseURL: "https://gangwha-e51e5.firebaseio.com",
  storageBucket: "gangwha-e51e5.appspot.com",
  messagingSenderId: "876832084726"
};

@NgModule({
  declarations: [
    MainComponent,
    DetailComponent,
    MenuComponent,
    WriteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [ MainComponent ]
})
export class MainModule {}
