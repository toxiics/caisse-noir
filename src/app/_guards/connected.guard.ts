import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class ConnectedGuard implements CanActivate {

  constructor(private router: Router, private storageService: TokenStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var user = this.storageService.getUser();
    if (user) {
      this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    return true;
  }
}
