import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { UserInterface } from '../../models/user';
import { DataApiService } from './../../services/data-api.service';
import { ProfileInterface } from './../../models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private router: ActivatedRoute , private dataApi: DataApiService) { }

  public profileI: ProfileInterface;
  public profiles = [];
  public profile = '';
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
    this.dataApi.getAllProfiles().subscribe(profiles => {
      console.log('Profiles', profiles);
      this.profiles = profiles;
    });


    const idProfile = 'JJo9dJNlQsRxpZaZ7N9b2SaS8ci1';
    console.log(idProfile);

    this.dataApi.getIdProfile(idProfile).subscribe(profiles => {
        console.log('PROFILE', profiles);
    });

  }

}
