import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onAddUser() {
    this.authService.registerUser(this.email, this.password)
    .then((res) => {
      this.onLoginRedirect(res);
    }).catch(err => console.log('err', err.message));
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
    .then((res) => {
      console.log('resUser', res.additionalUserInfo.profile);
      this.onLoginRedirect(res.user.uid);
    }).catch(err => console.log('err', err));
  }

  onLogout() {
    this.authService.logoutUser();
  }
  onLoginRedirect(id?) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
          special: id
      }
  };
    this.router.navigate(['profile'], navigationExtras);
  }

}
