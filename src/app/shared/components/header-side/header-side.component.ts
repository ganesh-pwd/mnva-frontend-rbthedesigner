import { Component, OnInit, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';
import { Subscription } from 'rxjs';

import { AmplifyService } from 'aws-amplify-angular';
import { Router} from '@angular/router';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
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
  }]
  public egretThemes;
  public layoutConf:any;
  public notificationCount:any;
  private getReqImage: Subscription;
  public userImage: string;
  public userName: string;

  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    public translate: TranslateService,
    private renderer: Renderer2,
    public minervaAccountChangeService: MinervaAccountChangeService,
    private amplifyService: AmplifyService,
    private socialAuthService: AuthService,
    private router: Router
  ) {
    this.getReqImage = minervaAccountChangeService.image$.subscribe(result => this.userImage = result);
    this.userName = 'Stephan Trussart';
    if ('userName' in sessionStorage) {
      this.userName = sessionStorage.getItem('userName');
    }
    if ('photoUrl' in sessionStorage) {
      this.userImage = sessionStorage.getItem('photoUrl');
    }
    this.notificationCount = sessionStorage.getItem('notificationCount') || 3;
  }
  ngOnInit() {
    this.egretThemes = this.themeService.egretThemes;
    this.layoutConf = this.layout.layoutConf;
    this.translate.use(this.currentLang);
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
    if(this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  toggleCollapse() {
    // compact --> full
    if(this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      }, {transitionClass: true})
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact'
    }, {transitionClass: true})

  }
  signOut() {
    console.log('Sign out Component');
    sessionStorage.clear();

    this.socialAuthService.signOut()
    .then(data => {
      console.log('user name sign Out::');
      this.router.navigate(['/sessions/signin']);
    })
    .catch(err => {
      console.log(err);
      console.log('Error message:', err.message);
      this.router.navigate(['/sessions/signin']);
    });
  }

}
