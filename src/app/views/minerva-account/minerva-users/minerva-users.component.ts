import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { MinervaAccountDialogService } from '../../../shared/services/minerva-account/minerva-account-dialog/minerva-account-dialog.service';
import { MinervaAccountImageDialogService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-image-dialog.service';
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';

import { Subscription } from 'rxjs';

@Component({
  	selector: 'app-minerva-users',
  	animations: [egretAnimations],
  	templateUrl: './minerva-users.component.html',
  	styleUrls: ['./minerva-users.component.scss']
})
export class MinervaUsersComponent implements OnInit, OnDestroy {
	  private getItemSub: Subscription;
    private getReqImage: Subscription;
    private req: Subscription;

    userImage: string;

	  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute,
    private minervaAccountImageDialogService: MinervaAccountImageDialogService,
    private minervaAccountDialogService: MinervaAccountDialogService,
    private minervaAccountChangeService: MinervaAccountChangeService) { 
      this.getReqImage = minervaAccountChangeService.image$.subscribe(result => this.userImage = result);
      if ('photoUrl' in sessionStorage) {
        this.userImage = sessionStorage.getItem('photoUrl');
      }
    }

	  ngOnInit() {
    }
    ngOnDestroy() {
      if (this.getItemSub) this.getItemSub.unsubscribe();
      if(this.req) this.req.unsubscribe();
    }

    openDialog(title:string) {
        this.minervaAccountDialogService.confirm({ 
          title: title
        }).subscribe((result) => {});
    }

    changeImageDialog(title:string){
        this.minervaAccountImageDialogService.confirm({ title: title })
        .subscribe(result => {});
    }
}
