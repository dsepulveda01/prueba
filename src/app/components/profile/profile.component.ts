import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { UserInterface } from '../../models/user';
import { DataApiService } from './../../services/data-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profiles = [];
  public profile = '';

  public dataId = 'JJo9dJNlQsRxpZaZ7N9b2SaS8ci1';
  constructor(
    private authService: AuthService, private router: Router , private dataApi: DataApiService
  ) {
    /* const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.queryParams;
    console.log(state);
    if (state.special) {
        this.dataId = state.special;
    } */

  }

  user: UserInterface = {
     name: '',
     photoUrl: '',
     description: ''
  }
  public providerId: string = 'null';
  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;
      }
    });

    this.dataApi.getIdProfile().subscribe(profiles => {
        console.log('PROFILE', profiles);
        this.profiles = this.profiles;
    });

  }

}
