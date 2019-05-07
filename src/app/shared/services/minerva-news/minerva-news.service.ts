import { Observable, of, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { MinervaNewsDB } from '../../fake-db/minerva-news';
import { UserService } from '../auth/user-services';
import { ActivatedRoute, Router } from '@angular/router';

interface confirmData {
  title?: string
}

@Injectable({
  providedIn: 'root'
})
export class MinervaNewsService {
  public loggedInUser: any;
  public news: any[];

  constructor(private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    const news = new MinervaNewsDB();
    this.news = news.minerva_news;

    // logged in user
    userService.userData$.subscribe((user) => this.loggedInUser = user);
  }

  /* @GET MINERVA NEWS DATA FROM THE FAKE DB */

      getAllItems(): Observable<any> {
        const minerva_news = this.news
        return of(minerva_news.slice());
      }


  /* @FUNCTIONS FOR GENERATING RANDOM ID AND MAX INDEX */

      // generate id with length 24
      generateID() {
        let id = '';
        const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 24; i++) {
          id += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return id;
      }

      // generate guID
      generateGUID() { return Math.round(Math.random() * 5000000000).toString(); }

      // get max index
      getMaxIndex(item) { return Math.max(...item.map(x => x.index)) }

 
}
