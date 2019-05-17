import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';
import { UserService } from '../../../shared/services/auth/user-services';
@Component({
  selector: 'app-sidebar-side',
  templateUrl: './sidebar-side.component.html',
  styleUrls: ['./sidebar-side.scss']
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  public change: boolean;
  public selected;
  public userImage: string;
  public loggedInUser;

  private sidebarPS: PerfectScrollbar;
  private menuItemsSub: Subscription;
  private getReqImage: Subscription;
  constructor(
    private navService: NavigationService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public themeService: ThemeService,
    public minervaAccountChangeService: MinervaAccountChangeService
  ) {
    this.getReqImage = minervaAccountChangeService.image$.subscribe(result => this.userImage = result);

    if ('photoUrl' in sessionStorage) {
      this.userImage = sessionStorage.getItem('photoUrl');
    }
    
    userService.userData$.subscribe((user) => {
      this.loggedInUser = user;

      // set selected account
      this.selected = sessionStorage.getItem('selectedAccount') ?  
      (JSON.parse(sessionStorage.getItem('selectedAccount'))).accountName : 
      user.accountNames[0].accountName;
    });
  }

  ngOnInit() {
    this.getSidebarItems();
  }

  getSidebarItems() {
    this.navService.getNavigationSidebar().subscribe(item => {
      this.menuItems = item;
      // Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(val => val.type === 'icon').length;
    });
  }

  changeSelectedAccount(selected){
    let url = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true })
    .then(() => {
      this.selected = selected.value;
      sessionStorage.setItem('selectedAccount', JSON.stringify(this.loggedInUser.accountNames.filter(el => el.accountName === selected.value)[0]))
    })
    .then(() => this.router.navigate([url]))
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.sidebarPS = new PerfectScrollbar('#scroll-area', {
        suppressScrollX: true
      });
    });
  }
  ngOnDestroy() {
    if (this.sidebarPS) {
      this.sidebarPS.destroy();
    }
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }

}
