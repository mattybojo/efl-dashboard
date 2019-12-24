import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  successCallback(resp: FirebaseUISignInSuccessWithAuthResult) {
    this.authService.saveUserData(resp.authResult.user, resp.authResult.additionalUserInfo.isNewUser);
    this.router.navigateByUrl('/dashboard');
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.error('Error logging in!');
  }
}
