import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
