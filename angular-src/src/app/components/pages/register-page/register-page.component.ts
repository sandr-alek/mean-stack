import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  name: string;
  email: string;
  password: string;
  result: any = {
    status: null,
    msg: ''
  };

  constructor(
    private validateService: ValidateService,
    private authService: AuthService
  ) {}

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    if (
      this.validateService.isNameValid(this.name) &&
      this.validateService.isEmailValid(this.email) &&
      this.validateService.isPasswordValid(this.password)
    ) {
      this.result.status = 'success';
      this.result.msg = 'Sending data...';
    } else {
      this.result.status = 'error';
      this.result.msg = 'Invalid data. Check Fields';
      return;
    }

    this.authService.registerUser(user).subscribe((response: any) => {
      if (response.success) {
        this.result.status = 'success';
        this.result.msg = 'Awesome! Now you can Log In.';

        this.name = '';
        this.email = '';
        this.password = '';
      }
    });
  }
}
