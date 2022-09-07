import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: FirebaseAuthService, private route: Router) { }

  ngOnInit(): void {
  }

  isWindowSmall: boolean = false;

  logout(){
    this.auth.logout();
    this.route.navigate(['']);
  }


}
