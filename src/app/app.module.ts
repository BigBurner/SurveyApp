import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
// import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
// import { SearchPage } from '../pages/search/search';
import { SiteProvider } from '../providers/site/site';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    // HttpModule, //try this http comments while testing http action, currently compiling
    // HttpClientModule,
    // HttpClient,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SiteProvider
  ]
})
export class AppModule {}
