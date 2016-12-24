import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { DetailComponent } from './detail.view/detail.component';
import { MenuComponent } from './menu.view/menu.component';
import { WriteComponent } from './write.view/write.component';
import { imageUploadComponent } from './imageUpload.view/imageupload.component';
import { videoUploadComponent } from './videoUpload.view/videoupload.component';
import { SettingComponent } from './setting.view/setting.component';
import { PostComponent } from './post.view/post.component';
import { SearchComponent } from './search.view/search.component';
import { SearchViewComponent } from './search.view/searchview.component';
import { PostDetailComponent } from './post.view/postdetail.component';

@NgModule({
  declarations: [
    MainComponent,
    DetailComponent,
    MenuComponent,
    WriteComponent,
    imageUploadComponent,
    videoUploadComponent,
    SettingComponent,
    PostComponent,
    SearchComponent,
    SearchViewComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [ MainComponent ]
})
export class MainModule {}
