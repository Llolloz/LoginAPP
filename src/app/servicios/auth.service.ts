import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from '@firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth
  ) {}

  // Registrar usuario
  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  // Iniciar sesión
  loginEmail(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  // Obtener sesión
  getAuth() {
    return this.afAuth.authState.pipe(map (auth => auth));
  }

  get isLogged(): boolean {
    if (this.afAuth.auth.currentUser ==  null) {
      return false;
    } else {
      return true;
    }
  }

  // Cerrar sesión
  logout() {
    return this.afAuth.auth.signOut();
  }

}
