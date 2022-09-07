import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseAuthService } from '../firebase-auth.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileUser: User | any;
  isMine: boolean = true;

  constructor(public auth: FirebaseAuthService, public router: Router) { }
    
  

  ngOnInit(): void {
    // if (localStorage.getItem('user') != null && localStorage.getItem('user') != ''){
    //   this.profileUser = JSON.parse(localStorage.getItem('user') || 'null');
    // } else {
    //   window.alert("You need to log in. Briging you to login page");
    //   this.router.navigate(['']);
    // }
    
    if (history.state.user) {
      this.profileUser = history.state.user;
    } else {
      window.alert("You need to log in. Briging you to login page");
      this.router.navigate(['']);
    }
  
  }

}
