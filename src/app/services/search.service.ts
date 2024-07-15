import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get searchQuery$(): Observable<string> {
    return this.searchSubject.asObservable();
  }

  setSearchQuery(query: string) {
    this.searchSubject.next(query);
  }
}
