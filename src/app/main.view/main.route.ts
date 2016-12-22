import { Routes } from '@angular/router';
import { DetailComponent } from './detail.view/detail.component';
import { WriteComponent } from './write.view/write.component';
import { imageUploadComponent } from './imageUpload.view/imageupload.component';
import { videoUploadComponent } from './videoUpload.view/videoupload.component';
import { SettingComponent} from './setting.view/setting.component';

export const MAIN_ROUTES: Routes = [
  { path: '', component : DetailComponent, pathMatch : 'full' },
  { path: 'write', component : WriteComponent },
  { path: 'image-upload', component: imageUploadComponent },
  { path: 'video-upload', component: videoUploadComponent },
  { path: 'setting', component: SettingComponent }
];
