import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from '../Models/User';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input('data-user') user: User | undefined;
   constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(user: User){
    this.router.navigate(['profilepage'], {state: {user: user}})

  }

}
