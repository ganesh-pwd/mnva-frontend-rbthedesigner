import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user-services';
@Injectable()
export class AuthGuard implements CanActivate {
  public authToken;
  private isAuthenticated = true; // Set this value dynamically
  public loggedInUser;

  constructor(private router: Router, private userService: UserService) {
    userService.userData$.subscribe(user => this.loggedInUser = user);
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!!this.loggedInUser) 
      return true;
    
    this.router.navigate(['/sessions/signin']);
    return false;
  }
}
