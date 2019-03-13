import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavigationService } from "../../services/navigation.service";
import { ThemeService } from '../../services/theme.service';
import { Subscription } from "rxjs";
import PerfectScrollbar from 'perfect-scrollbar';
import { ActivatedRoute, Router } from '@angular/router';
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';

@Component({
  selector: 'app-sidebar-side',
  templateUrl: './sidebar-side.component.html',
  styleUrls: ['./sidebar-side.css']
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  private sidebarPS: PerfectScrollbar;
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  public change: boolean;
  public selected = "CCK";

  private menuItemsSub: Subscription;
  private req: Subscription;
  private getReqImage: Subscription;
  public userImage: string;
  constructor(
    private router : Router,
    private navService: NavigationService,
    public themeService: ThemeService,
    public minervaAccountChangeService: MinervaAccountChangeService
  ) { 
    this.getReqImage = minervaAccountChangeService.image$.subscribe(result => this.userImage = result)
  }

  ngOnInit() {
    this.getSidebarItems();
  }

  getSidebarItems(){
    this.navService.getNavigationSidebar().subscribe(item => {
      this.menuItems = item;
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.sidebarPS = new PerfectScrollbar('#scroll-area', {
        suppressScrollX: true
      })
    })
  }
  ngOnDestroy() {
    if(this.sidebarPS) {
      this.sidebarPS.destroy();
    }
    if(this.menuItemsSub) {
      this.menuItemsSub.unsubscribe()
    }
  }

}
