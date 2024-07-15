import {Injectable} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  title = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.route.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        if (child?.snapshot.data['title']) {
          return child.snapshot.data['title'];
        }
        return 'No Title';
      })
    ).subscribe((title: string) => {
      this.title = title;
    });
  }
}
