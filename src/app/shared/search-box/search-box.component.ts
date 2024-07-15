import {Component, ViewEncapsulation} from '@angular/core';
import {SearchService} from '../../services/search.service';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('toggleSearchBox', [
      state('closed', style({
        width: '0px',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('open', style({
        width: '*',
        opacity: 1
      })),
      transition('closed <=> open', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class SearchBoxComponent {
  searchBoxState = 'closed';

  constructor(private searchService: SearchService) {
  }

  triggerSearchBox() {
    this.searchBoxState = this.searchBoxState === 'closed' ? 'open' : 'closed';
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchService.setSearchQuery(value);
  }


}
