import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public app_name: string = 'Prueba Useitweb';
  public isLogged: boolean = false;
  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe( auth => {
      if (auth) {
        console.log('user logged');
        this.isLogged = true;
      } else {
        console.log('Not user logged');
        this.isLogged = false;
      }
    });
  }

  onLogout() {
    this.authService.logoutUser();
  }


}
