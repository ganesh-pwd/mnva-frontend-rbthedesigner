import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../../../shared/services/auth/user-services';
import { UserPlanDetailsService } from '../../../shared/services/auth/user-plan-details.service';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html',
  styleUrls: ['./header-side.component.scss']
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  currentLang = 'en';
  public availableLangs = [{
    name: 'English',
    code: 'en',
  }, {
    name: 'Spanish',
    code: 'es',
  }];
  public egretThemes;
  public layoutConf: any;
  public notificationCount: any;
  // public userFullName: string;
  public loggedInUser;
  public userPlanDetails;
  public userName: string;

  public remaining: number = 0;

  constructor(
    public translate: TranslateService,
    public minervaAccountChangeService: MinervaAccountChangeService,
    private themeService: ThemeService,
    private layout: LayoutService,
    private renderer: Renderer2,
    private router: Router,
    private userService: UserService,
    private userPlanDetailsService: UserPlanDetailsService,
    private amplifyService: AmplifyService,
    private socialAuthService: AuthService
  ) {

    // set user account info
    userService.userData$.subscribe(user => {
      if (user) {
        // this.userFullName = user.name
        this.loggedInUser = user;
        this.notificationCount = sessionStorage.getItem('notificationCount') || 3;
        if ('userName' in sessionStorage) this.userName = sessionStorage.getItem('userName');
      }
    });

    // set user plan details
    userPlanDetailsService.userPlanData$.subscribe(user => {
      if(user) this.userPlanDetails = user;
    });
  }

  ngOnInit() {
    this.notificationCount = sessionStorage.getItem('notificationCount') || 3;
    this.egretThemes = this.themeService.egretThemes;
    this.layoutConf = this.layout.layoutConf;
    this.translate.use(this.currentLang);
    this.router.events.subscribe((routeChange) => {
      if (routeChange instanceof NavigationEnd) {
        this.notificationCount = sessionStorage.getItem('notificationCount') || 3;
      }
    });
  }

  setLang(e) {
    this.translate.use(this.currentLang);
  }

  changeTheme(theme) {
    this.themeService.changeTheme(this.renderer, theme);
  }

  toggleNotific() {
    this.notificPanel.toggle();
  }

  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }

  toggleCollapse() {
    // compact --> full
    if (this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      }, {transitionClass: true});
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact'
    }, {transitionClass: true});

  }

  signOut() {
    this.router.navigate(['/sessions/signin']).then(() => {
      this.userService.setUser(null);
      sessionStorage.clear();
      window.location.reload();
    });
  }

  // signOut() {
  //   console.log('Sign out Component');
  //   sessionStorage.clear();

  //   this.socialAuthService.signOut()
  //   .then(data => {
  //     console.log('user name sign Out::');
  //     this.router.navigate(['/sessions/signin']);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     console.log('Error message:', err.message);
  //     this.router.navigate(['/sessions/signin']);
  //   });
  // }

}
