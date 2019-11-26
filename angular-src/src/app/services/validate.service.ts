import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  isNameValid(name: string): boolean {
    return name && name.length >= 2 ? true : false;
  }

  isEmailValid(email: string): boolean {
    // tslint:disable-next-line:max-line-length
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(email);
  }

  isPasswordValid(password: string): boolean {
    return password && password.length >= 5 ? true : false;
  }
}
