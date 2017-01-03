import { Routes } from '@angular/router';
import { DetailComponent } from './detail.view/detail.component';
import { WriteComponent } from './write.view/write.component';
import { imageUploadComponent } from './imageUpload.view/imageupload.component';
import { videoUploadComponent } from './videoUpload.view/videoupload.component';
import { SettingComponent} from './setting.view/setting.component';
import { SearchComponent } from './search.view/search.component';
import { SearchViewComponent } from './search.view/searchview.component';
import { PostDetailComponent } from './post.view/postdetail.component';
import { EditComponent } from './write.view/edit.component';
import { AccountancyComponent } from './accountancy.view/accountancy.component';

export const MAIN_ROUTES: Routes = [
  { path: '', component : DetailComponent, pathMatch : 'full' },
  { path: 'write', component : WriteComponent },
  { path: 'image-upload', component: imageUploadComponent },
  { path: 'video-upload', component: videoUploadComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'search', component: SearchComponent, pathMatch: 'full' },
  { path: 'search/:keyword', component: SearchViewComponent },
  { path: 'detail/:id', component: PostDetailComponent},
  { path: 'edit/:id', component: EditComponent},
  { path: 'accountancy', component: AccountancyComponent}
];
