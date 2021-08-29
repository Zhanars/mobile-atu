import { Component, Pipe, PipeTransform } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';
import {HOME_page_url} from '../../../environments/environment';

@Pipe({ name: 'safe' })

export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(HOME_page_url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(HOME_page_url);
  }
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  home_page_url;
  constructor(private authService: AuthenticationService, private router: Router, private domSanitizer : DomSanitizer) {
    this.home_page_url = this.domSanitizer.bypassSecurityTrustResourceUrl(HOME_page_url);
  }


}
