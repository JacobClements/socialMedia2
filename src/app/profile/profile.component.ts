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

  profileUser: User ;
  isMine: boolean = true;

  constructor(public auth: FirebaseAuthService, public router: Router) { 
    this.profileUser = this.auth.getUserAsUser();

    if (this.router.getCurrentNavigation()?.extras.state) {
      var routeState = this.router.getCurrentNavigation()?.extras.state;
      if (routeState) {
        this.profileUser = routeState['user'] ? routeState['user'] : '';
        this.isMine = false;
      }
    }
  }
  

  ngOnInit(): void {

  }

}
