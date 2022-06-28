import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { AuthService } from './services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { User } from 'src/model/user';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  private roles: string[] = [];
  showAdminBoard = false;
  showModeratorBoard = false;
  user?: User;
  constructor(public tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private observer: BreakpointObserver,
    private router: Router) { }
  ngOnInit(): void {

    if (this.tokenStorageService.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.roles = this.user.roles;
      this.showAdminBoard = this.roles.length > 0 ? this.roles.includes('ROLE_ADMIN') : false;
      this.showModeratorBoard = this.roles.length > 0 ? this.roles.includes('ROLE_MODERATOR') : false;
    }
  }
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
        this.cdRef.detectChanges();
      });
    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  logout(): void {
    this.authService.logout();
  }
}
