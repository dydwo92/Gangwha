import {
  Component,
  Input
} from '@angular/core';
import { SecondGatewayService } from '../../service';

export class Menu {
  constructor(public name: string, public link: string, public glyphicon: string){}
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent{
  @Input() menuWidth: number;
  mobileMenuDisplay: boolean;

  constructor(private authService: SecondGatewayService) {}

  Logout(){
    this.authService.logout();
  }

  MenuList: Menu[] = [
    new Menu("글 목록", ".", "glyphicon-th-list"),
    new Menu("글쓰기", "write", "glyphicon-pencil"),
    new Menu("사진 업로드", "image-upload", "glyphicon-picture"),
    new Menu("영상 업로드", "video-upload", "glyphicon-facetime-video"),
    new Menu("검색", "search","glyphicon-search"),
    new Menu("회계", "accountancy", "glyphicon-usd"),
    new Menu("계정 설정", "setting", "glyphicon-cog")
  ];
}
