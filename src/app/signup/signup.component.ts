import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private firebaseAuth: FirebaseAuthService) { }

  isSignUp: boolean = true;

  ngOnInit(): void {
  }

  signUp(form: any){
    // this.firebaseAuth.signUp(form.email, form.password);
    console.log(form.email, form.password)
  }

}
