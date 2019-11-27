import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  email: string;
  password: string;
  result: any = {
    status: null,
    msg: ''
  };

  constructor(
    private authService: AuthService
  ) {}

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe((response: any) => {
      if (!response.success) {
        this.result.status = 'error';
        this.result.msg = response.msg;
        return;
      }
      this.authService.saveToken(response.token, response.user);
    });
  }

}
