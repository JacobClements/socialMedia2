import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(public firebaseAuth: AngularFireAuth, public db: AngularFireDatabase) { }

  isLoggedIn: boolean = false;

  async signInWithEmailAndPassword(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res => {
      console.log("Logged in:" + res.user);
      this.isLoggedIn = true;
    }).catch(error => console.error(error))
  }

  async signUp(email: string, password: string, name: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then( res => {
      console.log("User created: " + res.user);
      this.isLoggedIn = true;

      this.addUserToDatabase(name, res.user?.uid != undefined ? res.user.uid : "");
    })
  }

  logout(){
    this.firebaseAuth.signOut();
    this.isLoggedIn = false;
  }

  private addUserToDatabase(name: string, UserId: string){
    this.db.list("/Users").push({
      name: name,
      uid: UserId
    })
  }
}
