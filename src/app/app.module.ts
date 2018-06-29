import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SyncPage } from '../pages/sync/sync';
import { SqliteHelperProvider } from '../providers/sqlite-helper/sqlite-helper';
import { OperacoesRastreamentoProvider } from '../providers/operacoes-rastreamento/operacoes-rastreamento';
import { Camera } from '@ionic-native/camera';
import { DaoProvider } from '../providers/dao/dao';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SyncPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SyncPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundGeolocation,
    LocationTrackerProvider,
    Geolocation,
    SqliteHelperProvider,
    SQLite,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OperacoesRastreamentoProvider,
    DaoProvider,
  ]
})
export class AppModule {}
