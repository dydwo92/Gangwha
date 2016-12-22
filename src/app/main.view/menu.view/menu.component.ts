import {
  Component,
  Input,
  OnInit
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
export class MenuComponent implements OnInit{
  @Input() mobileMenu: boolean;
  @Input() scrollMargin: number;
  mobileMenuDisplay: boolean;

  constructor(private authService: SecondGatewayService) {}

  ngOnInit(){
      this.mobileMenu = window.innerWidth < 770 ? true : false;
  }

  Logout(){
    this.authService.logout();
  }

  MenuList: Menu[] = [
    new Menu("글 목록", ".", "glyphicon-th-list"),
    new Menu("글쓰기", "write", "glyphicon-pencil"),
    new Menu("사진 업로드", "image-upload", "glyphicon-picture"),
    new Menu("영상 업로드", "video-upload", "glyphicon-film"),
    new Menu("계정 설정", "setting", "glyphicon-cog")
  ];
}
