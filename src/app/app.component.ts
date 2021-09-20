import { Component } from '@angular/core';
import {Strings} from "./classes/strings";
import {ConfigStrings} from "./interfaces/config-strings";
import {SendServiceDataService} from "./services/send-service-data.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private sendServiceDataService:SendServiceDataService) {
    this.sendServiceDataService.loadStrings(Strings.user_lang).subscribe(
      (x: ConfigStrings) => {
        Strings.setString(x);
      }
    );
  }
}
