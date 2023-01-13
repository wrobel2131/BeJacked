import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './modules/home/home.module';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { NgChartsModule } from 'ng2-charts';

import {
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
  PB_DIRECTION,
  POSITION,
  SPINNER,
} from 'ngx-ui-loader';
import { HomeAppModule } from './modules/home-app/home-app.module';
import { BrowserModule } from '@angular/platform-browser';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#000000',
  bgsOpacity: 0.5,
  bgsPosition: 'center-center',
  bgsSize: 60,
  bgsType: 'ball-spin-clockwise',
  blur: 12,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#ffffff',
  fgsPosition: 'center-center',
  fgsSize: 100,
  fgsType: 'ball-spin-clockwise-fade-rotating',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: '',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(0,0,0,0.55)',
  pbColor: '#000000',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HomeModule,
    HomeAppModule,
    JwtModule,
    NgChartsModule,
    NgxYoutubePlayerModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
