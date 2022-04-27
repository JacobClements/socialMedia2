import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(public firebaseAuth: AngularFireAuth) { }

  isLoggedIn: boolean = false;

  async signInWithEmailAndPassword(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res => {
      console.log("Logged in:" + res.user);
      this.isLoggedIn = true;
    }).catch(error => console.error(error))
  }

  async signUp(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then( res => {
      console.log("User created: " + res.user);
      this.isLoggedIn = true;
    })
  }

  logout(){
    this.firebaseAuth.signOut();
    this.isLoggedIn = false;
  }
}
