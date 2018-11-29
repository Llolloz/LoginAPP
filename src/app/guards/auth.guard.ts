import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('isLogged ' + this.authService.isLogged);

    if (this.authService.isLogged === true) {
      console.log('Sesion iniciada');
      return true;
    } else {
      console.log('Sesion no iniciada');
      this.router.navigate(['/login']);
      return false;
    }

  }
}
