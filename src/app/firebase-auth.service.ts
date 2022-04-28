import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(public firebaseAuth: AngularFireAuth, public db: AngularFireDatabase) { 
    this.firebaseAuth.authState.subscribe((user) => {
      if (user){
        this.user = user;
      }
    })
  }

  isLoggedIn: boolean = false;
  firebase = this.db.database.app;

  user: any; // User that is logged in

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

      res.user?.updateProfile({
        displayName: name
      })

      this.addUserToDatabase(name, res.user?.uid != undefined ? res.user.uid : "");
    })
  }

  logout(){
    this.firebaseAuth.signOut();
    this.isLoggedIn = false;
  }

    // Send email verfificaiton when new user sign up
    SendVerificationMail() {
      return this.firebaseAuth.currentUser
        .then((u: any) => u.sendEmailVerification())
        .then(() => {
          window.alert("Yay")
        });
    }
    // Reset Forggot password
    ForgotPassword(passwordResetEmail: string) {
      return this.firebaseAuth
        .sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
          window.alert('Password reset email sent, check your inbox.');
        })
        .catch((error) => {
          window.alert(error);
        });
    }
  

  private addUserToDatabase(name: string, UserId: string){
    this.db.list("/Users").push({
      name: name,
      uid: UserId
    })
  }

}
