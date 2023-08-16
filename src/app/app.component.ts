import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLogin = localStorage.getItem('isLogin');
  constructor(private router: Router) {
    this.router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        const url = event.url;
        if (url === '/') {
          if (this.isLogin) {
            this.router.navigate(['/statistic']);
          } else {
            this.router.navigate(['/login']);
          }
        }
      }
    });
  }

  ngOnInit(): void {
    if (this.router.url === '/') {
      if (this.isLogin) {
        this.router.navigate(['/statistic']);
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
}
