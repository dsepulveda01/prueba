import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  public isError: boolean = false;

  constructor(public aFAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(): void {
     this.authService.loginEmailUser(this.email, this.password)
     .then((res) => {
      this.onLoginRedirect(res.user.uid);
    }).catch(err => console.log('err', err));
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
    .then((res) => {
      console.log('User', res);

      this.onLoginRedirect(res.user.uid);
    }).catch(err => console.log('err', err));
  }

  onLogout() {
    this.authService.logoutUser();
  }
  onLoginRedirect(id?) {
    this.router.navigate(['/profile', id]);
  }

}
