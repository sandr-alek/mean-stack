import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  profileData: any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe((response: any) => {
      this.profileData = response.user;
    });
  }

}
