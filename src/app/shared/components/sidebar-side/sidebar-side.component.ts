import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';
// tslint:disable-next-line:max-line-length
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';

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
  public selected = 'CCK';
  public userImage: string;

  private sidebarPS: PerfectScrollbar;
  private menuItemsSub: Subscription;
  private getReqImage: Subscription;
  constructor(
    private navService: NavigationService,
    public themeService: ThemeService,
    public minervaAccountChangeService: MinervaAccountChangeService
  ) {
    this.getReqImage = minervaAccountChangeService.image$.subscribe(result => this.userImage = result)
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
