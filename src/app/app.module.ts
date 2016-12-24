import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EntranceModule } from './entrance.view/entrance.module';
import { MainModule } from './main.view/main.module';

import {
  FirstGatewayService,
  SecondGatewayService,
  ArticleService
} from './service';

import { APP_ROUTING } from './app.routing';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyBh65kYyz-9N4dDnbWIpZK9itlZt3k3ljY",
  authDomain: "gangwha-e51e5.firebaseapp.com",
  databaseURL: "https://gangwha-e51e5.firebaseio.com",
  storageBucket: "gangwha-e51e5.appspot.com"
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MainModule,
    EntranceModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [
    FirstGatewayService,
    SecondGatewayService,
    ArticleService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
