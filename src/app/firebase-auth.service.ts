import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection,  AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from './Models/User';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  followersID: string[] = []
  
  getFollowers2(){
    var obserableFollowers = this.afs.collection('users').doc(this.getUserFromLocalStorage().uid).collection('following').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
    return obserableFollowers;
  }

  getUserFromLocalStorage(): User {
    return JSON.parse(localStorage.getItem('user') || '');
  }

  // getFollowers(){
  //   console.log("Hello")
  //   this.afs.collection('users').doc(this.getUserFromLocalStorage().uid).collection('following').snapshotChanges().forEach(x => 
  //     x.forEach(i => {
  //       console.log(i.payload.doc.id)
  //       this.followersID.push(i.payload.doc.id);
  //     }));
  //     return this.followersID;
  // }

  removeFollower(userID: string) {
    console.log("remove: " + userID)
    this.afs.collection('users').doc(this.getUserFromLocalStorage().uid).collection('following').doc(userID.trim()).delete();
  }

  addFollower(userID: string) {
    console.log("Add: " + userID)
    this.afs.collection('users').doc(this.getUserFromLocalStorage().uid).collection('following').doc(userID.trimStart()).set({});
  }

  getUserAsUser(){
    var UserAsUser: User = {
      displayName: this.user.displayName,
      phoneNumber: this.user.phoneNumber,
      profileURL: this.user.photoURL,
      uid: this.user.uid,
      email: this.user.email,
    }

    return UserAsUser;
  }

  async signInWithEmailAndPassword(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res => {
      console.log("Logged in:" + res.user);

      localStorage.setItem("user",  JSON.stringify(res.user));

      console.log(localStorage.getItem("user"))

      this.isLoggedIn = true;

    }).catch(error => console.error(error))
  }

  async signUp(email: string, password: string, name: string){
    console.log(name)
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then( res => {
      
      this.isLoggedIn = true;

      res.user?.updateProfile({
        displayName: name
      }).then(x => localStorage.setItem("user",  JSON.stringify(res.user)))


      console.log(res.user)
      

      console.log(localStorage.getItem("user"))

      if(res.user != null) {
        console.log(res.user)
        this.addUserToFirestore(res?.user, name);
      } 
    })
  }

  logout(){
    this.firebaseAuth.signOut();
    console.log("Logged out")
    this.isLoggedIn = false;
    localStorage.setItem('user', '');
  }

  addUserToFirestore(user: firebase.default.User, name: string){
    console.log("adding: " + user.displayName +"    " + user.email)
    if (name != null && user.email != null){
      this.usersCollection?.doc(user.uid).set({
        displayName: name,
        email: user.email,
        profileURL: user.photoURL ? user.photoURL : "",
        phoneNumber: user.phoneNumber ? user.phoneNumber : "",
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
