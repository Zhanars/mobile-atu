import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HttpClientModule} from '@angular/common/http';
import {SafePipe} from './pages/home/home.page';
import { ServiceWorkerModule } from '@angular/service-worker';
import {environment} from '../environments/environment';
import { PopoverComponent } from './components/popover/popover.component';
import {SendServiceDataService} from "./services/send-service-data.service";
import {ConfigStrings} from "./interfaces/config-strings";
import {Strings} from "./classes/strings";



@NgModule({
  declarations: [AppComponent, SafePipe, PopoverComponent],
  entryComponents: [PopoverComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the app is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  providers: [ StatusBar,SplashScreen,BarcodeScanner,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private sendServiceDataService:SendServiceDataService) {
    this.loadStr();
  }
  loadStr() {
    this.sendServiceDataService.loadStrings(Strings.user_lang).subscribe(
      (x: ConfigStrings) => {
        Strings.setString(x);
      }
    );
  }
}
