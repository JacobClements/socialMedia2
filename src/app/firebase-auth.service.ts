import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection,  AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from './Models/User';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(public firebaseAuth: AngularFireAuth, public afs: AngularFirestore) { 
    this.firebaseAuth.authState.subscribe((user) => {
      if (user){
        this.user = user;
      }
    })

    this.usersCollection = this.afs.collection<User>('users');



  }

  isLoggedIn: boolean = false;

  user: any; // User that is logged in
  usersCollection: AngularFirestoreCollection<User> | undefined;


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
      
      if(res.user != null) this.addUserToFirestore(res?.user);
    })
  }

  logout(){
    this.firebaseAuth.signOut();
    this.isLoggedIn = false;
  }

  addUserToFirestore(user: firebase.default.User){
    if (user.displayName != null && user.email != null){
      this.usersCollection?.doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        profileURL: "",
    })
    }

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
  
}
