import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatDialogModule,
  MatInputModule,
  MatExpansionModule,
  MatStepperModule,
  MatSlideToggleModule,
  MatProgressBarModule
} from '@angular/material';

// ONLY REQUIRED FOR **SIDE** NAVIGATION LAYOUT
import { HeaderSideComponent } from './components/header-side/header-side.component';
import { SidebarSideComponent } from './components/sidebar-side/sidebar-side.component';


// ALL TIME REQUIRED
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { AppComfirmComponent } from './services/app-confirm/app-confirm.component';
import { AppLoaderComponent } from './services/app-loader/app-loader.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { MentionsProgressBarComponent } from './components/mentions-progress-bar/mentions-progress-bar.component';

// DIRECTIVES
import { FontSizeDirective } from './directives/font-size.directive';
import { ScrollToDirective } from './directives/scroll-to.directive';
import { AppDropdownDirective } from './directives/dropdown.directive';
import { DropdownAnchorDirective } from './directives/dropdown-anchor.directive';
import { DropdownLinkDirective } from './directives/dropdown-link.directive';
import { EgretSideNavToggleDirective } from './directives/egret-side-nav-toggle.directive';

// PIPES
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { ExcerptPipe } from './pipes/excerpt.pipe';
import { SearchPipe } from './pipes/search-pipe';

// SERVICES
import { ThemeService } from './services/theme.service';
import { LayoutService } from './services/layout.service';
import { NavigationService } from './services/navigation.service';
import { RoutePartsService } from './services/route-parts.service';
import { AuthGuard } from './services/auth/auth.guard';
import { AppConfirmService } from './services/app-confirm/app-confirm.service';
import { AppLoaderService } from './services/app-loader/app-loader.service';
import { MainDataboxDialogComponent } from './services/databoxes/dialogs/main-databoxes-dialog.component';
import { DataboxDialogsAlgorithmComponent } from './services/databoxes/dialogs-algorithm/dialogs-algorithm.component';
import { DataboxDialogsMentionsComponent } from './services/databoxes/dialogs-mentions/dialogs-mentions.component';
import { DataboxDialogAddSuggestionComponent } from './services/databoxes/dialog-add-suggestions/dialog-add-suggestions.component';
import { DataboxDialogsConnectivityComponent } from './services/databoxes/dialogs-connectivity/dialogs-connectivity.component';
import { DataboxDialogsQueryComponent } from './services/databoxes/dialogs-query/dialogs-query.component';
import { MinervaAccountDialogComponent } from './services/minerva-account/minerva-account-dialog/minerva-account-dialog.component';
import { MinervaAccountImageDialogComponent } from './services/minerva-account/minerva-account-image-dialog/minerva-account-image-dialog.component';

// Accounts Settings Component
import { AccountTypeComponent } from './components/account-type/account-type.component';
import { AccountMentionRemainingComponent } from './components/account-mention-remaining/account-mention-remaining.component';
import { AccountAlgorithmCreditRemainingComponent } from './components/account-algorithm-credit-remaining/account-algorithm-credit-remaining.component';
/*
  Only Required if you want to use Angular Landing
  (https://themeforest.net/item/angular-landing-material-design-angular-app-landing-page/21198258)
*/
// import { LandingPageService } from '../shared/services/landing-page.service';
const dialogComponents = [
  MainDataboxDialogComponent,
  DataboxDialogsAlgorithmComponent,
  DataboxDialogsMentionsComponent,
  DataboxDialogsConnectivityComponent,
  DataboxDialogsQueryComponent,
  DataboxDialogAddSuggestionComponent,
  MinervaAccountDialogComponent,
  MinervaAccountImageDialogComponent
];

const mainLayoutComponent = [
  SidenavComponent,
  NotificationsComponent,
  SidebarSideComponent,
  HeaderSideComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  BreadcrumbComponent,
  AppComfirmComponent,
  AppLoaderComponent,
  SlideToggleComponent,
  AccountTypeComponent,
  AccountMentionRemainingComponent,
  AccountAlgorithmCreditRemainingComponent,
  MentionsProgressBarComponent
];

const stylingComponents = [
  FontSizeDirective,
  ScrollToDirective,
  AppDropdownDirective,
  DropdownAnchorDirective,
  DropdownLinkDirective,
  EgretSideNavToggleDirective,
];

const pipes = [
  RelativeTimePipe,
  ExcerptPipe,
  SearchPipe,
];

const classesToInclude = [
  ...mainLayoutComponent,
  ...dialogComponents,
  ...stylingComponents,
  ...pipes
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    TranslateModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatDialogModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatChipsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AppComfirmComponent,
    AppLoaderComponent,
    ...dialogComponents
  ],
  providers: [
    ThemeService,
    LayoutService,
    NavigationService,
    RoutePartsService,
    AuthGuard,
    AppConfirmService,
    AppLoaderService
    // LandingPageService
  ],
  declarations: classesToInclude,
  exports: classesToInclude
})
export class SharedModule { }
