import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';

import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';
import { UserService } from '../../../shared/services/auth/user-services';
import { UserBillingService } from '../../../shared/services/auth/user-billing-info.service';
import { DataboxesService } from '../../../shared/services/databoxes/databox-item-main.services';
import { ProductShopService } from '../../../views/products/products-shop.service';
import { UserPlanDetailsService } from '../../../shared/services/auth/user-plan-details.service';
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
  public userList;
  public userImage: string;
  public loggedInUser;

  private sidebarPS: PerfectScrollbar;
  private menuItemsSub: Subscription;
  private getReqImage: Subscription;
  private cartReq: Subscription;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navService: NavigationService,
    private userService: UserService,
    private userBillingService: UserBillingService,
    private userPlanDetailsService: UserPlanDetailsService,
    public themeService: ThemeService,
    public databoxesService: DataboxesService,
    public minervaAccountChangeService: MinervaAccountChangeService,
    public shopService: ProductShopService
  ) {
    this.getReqImage = minervaAccountChangeService.image$.subscribe(result => this.userImage = result);

    if ('photoUrl' in sessionStorage) {
      this.userImage = sessionStorage.getItem('photoUrl');
    }
    
    userService.userData$.subscribe((user) => {
      this.loggedInUser = user;

      // set selected account
      this.selected = this.loggedInUser.account_name;
      this.userList = (JSON.parse(sessionStorage.getItem('accountLists')));
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

  // change selected account after modifying the mat-select input
  changeSelectedAccount(selected){
    let url = this.router.url; // previous url
    const checkDatabox = url.split('/').filter(el => el === 'databoxes').join("");
    const checkTemplateGallery = url.split('/').filter(el => el === 'template-gallery').join("");
    if(checkDatabox) url = checkDatabox; // to refresh databoxes
    if(checkTemplateGallery) url = checkTemplateGallery // to refresh template gallery

    // refresh components
    this.router.navigateByUrl('/sessions/signin', { skipLocationChange: true })
    .then(() => this.getSidebarItems())
    .then(() => {
      this.selected = selected.value;

      // set selected user to session storage and behavior subject
      const setSelectedUser = this.userList.find(el => el.account_name === selected.value);
        // set user
        this.userService.setUser(setSelectedUser);
        this.userService.setConnector(setSelectedUser.plan_id);
        this.userService.setDatasource(setSelectedUser.plan_id);
        this.minervaAccountChangeService.setImage(setSelectedUser.profile_image)
        sessionStorage.setItem('loggedInUser', JSON.stringify(setSelectedUser));

        // find and set user billing info
        const billingInfo = this.userBillingService.findUserBillingInfo(setSelectedUser._id);

        // find and set user plan details
        const userPlanDetails = this.userPlanDetailsService.findUserUserPlanDetails(setSelectedUser._id);
        
        // set selected billing info for the selected uer
        if(billingInfo){
          this.userBillingService.setUserBillingInfo(billingInfo);
          sessionStorage.setItem('billingInfo', JSON.stringify(billingInfo));
        }

        if(userPlanDetails){
          this.userPlanDetailsService.setUserUserPlanDetails(userPlanDetails);
          sessionStorage.setItem('userPlanDetails', JSON.stringify(userPlanDetails));
        }
        // remove cart items;
        this.cartReq = this.shopService.removeAllFromCart().subscribe(r => r);
    })
    .then(() => sessionStorage.removeItem('notifications'))
    .then(() => sessionStorage.removeItem('notificationCount'))
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

    if (this.cartReq) {
      this.cartReq.unsubscribe();
    }
  }

}
