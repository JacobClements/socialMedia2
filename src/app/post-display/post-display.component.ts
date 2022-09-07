import { Component, Input, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})
export class PostDisplayComponent implements OnInit {

  @Input("data-name") userName: string | undefined;
  @Input("data-title") title: string | undefined;
  @Input("data-time") date:string|undefined;
  @Input("data-message") message: string | undefined;
  @Input("data-follower") following: boolean | undefined;
  @Input('data-userID') userID: string | undefined;

  
  showAll: boolean = false;

  onFollowPressed(){
    if (this.userID){
      if (this.following){
        this.auth.removeFollower(this.userID);
      } else {
        this.auth.addFollower(this.userID);
      }
    }

    this.following = !this.following;
    
  }


  constructor(private auth: FirebaseAuthService) { }

  ngOnInit(): void {
  }

}
