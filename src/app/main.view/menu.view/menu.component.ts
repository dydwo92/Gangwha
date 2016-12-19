import {
  Component,
  Input,
  OnInit
} from '@angular/core';

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
  mobileMenuDisplay: boolean;

  ngOnInit(){
      this.mobileMenu = window.innerWidth < 770 ? true : false;
  }

  MenuList: Menu[] = [
    new Menu("글 목록", "", "glyphicon-th-list"),
    new Menu("글쓰기", "write", "glyphicon-pencil"),
    new Menu("사진 업로드", "", "glyphicon-picture"),
    new Menu("글 목록", "", "glyphicon-th-list")
  ];
}
