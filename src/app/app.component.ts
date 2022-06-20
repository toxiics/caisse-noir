import { Component } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'caisse-noir-gestion';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.length > 0 ? this.roles.includes('ROLE_ADMIN') : false;
      this.showModeratorBoard = this.roles.length > 0 ? this.roles.includes('ROLE_MODERATOR') : false;
      this.username = user.username;
    }
  }
  logout(): void {
    this.authService.logout();
  }
}
