import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {Storage} from "@capacitor/storage";
import {INTRO_KEY} from "../../guards/intro.guard";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  showIntro() {
      Storage.set({key: INTRO_KEY, value: 'false'});
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
