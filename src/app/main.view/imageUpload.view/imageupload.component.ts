import { Component } from '@angular/core';
import { SecondGatewayService } from '../../service';

export class Article{
  constructor(public name:string, public title:string, public body:string) {};
}

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html'
})
export class imageUploadComponent {
  article: Article;
  buttonisOn: boolean = true;

  constructor(private authService: SecondGatewayService){
      this.article = new Article("yongjae","","");
  }

}
