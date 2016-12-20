import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EntranceModule } from './entrance.view/entrance.module';
import { MainModule } from './main.view/main.module';

import { FirstGatewayService, SecondGatewayService } from './service';

import { APP_ROUTING } from './app.routing';

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
    APP_ROUTING
  ],
  providers: [
    FirstGatewayService,
    SecondGatewayService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
