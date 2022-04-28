import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../firebase-auth.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileUser: any;
  isMine: boolean = true;

  constructor(public auth: FirebaseAuthService, public router: Router) { 
    // this.isMine = this.router.getCurrentNavigation()?.extras.state;

    console.log(this.isMine)
  }

  ngOnInit(): void {
  }

}
