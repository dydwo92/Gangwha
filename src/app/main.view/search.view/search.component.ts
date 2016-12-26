import { Component } from '@angular/core';
import { ArticleService } from '../../service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  constructor(private articleService: ArticleService){}
}
