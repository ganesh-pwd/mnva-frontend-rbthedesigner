import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestureConfig } from '@angular/material';

import { rootRouterConfig } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { CommonModule } from '@angular/common';

import { SocialLoginModule, AuthServiceConfig, LoginOpt } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HotTableModule } from '@handsontable-pro/angular';
import { ModalComponent } from './modal/modal.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const fbLoginOptions: LoginOpt = {
  scope: 'email',
  return_scopes: true,
  enable_profile_selector: true
};

// Configs 
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('563593573683356', fbLoginOptions)
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('308121302360-t102hf91cpl1p5k6bb9c00ijb2rihtut.apps.googleusercontent.com')
    }
  ]);
  return config;
}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AmplifyAngularModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    HotTableModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(rootRouterConfig, { useHash: false })
  ],
  declarations: [AppComponent, ModalComponent],
  providers: [
    AmplifyService,
    NgxNavigationWithDataComponent,
    // ANGULAR MATERIAL SLIDER FIX
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
