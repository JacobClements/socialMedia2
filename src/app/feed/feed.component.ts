import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../firebase-auth.service';
import { Post } from '../Models/Post';
import { User } from '../Models/User';
import { PostService } from '../post.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posts: Post[] = [];
  users: User[] = [];
  followerID: any[] = [];

  constructor(private postService: PostService, private userService: UserService, private Router: Router, private auth: FirebaseAuthService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(x => {
      this.posts = x;
    })

    this.userService.getUsers().subscribe(x => {
      this.users = x;
    })

    this.auth.getFollowers2().subscribe(x => {
      this.followerID = x;
    })
  }

  isFollower(userID?: string): boolean{
    var follow = false;
    if (userID) {
      this.followerID.forEach(id => {
        if (id.id == userID){
          follow = true;
        }
      })
      
    }
    return follow
  }

  removePost(post: Post){
    this.postService.deletePost(post);
  }

  goToUserProfile(user: User){
    this.Router.navigate(['profile'], {state: {user: user}})
  }

  getUsername(userID: any): string {
    var username: string = "";
    this.users.forEach(user => {
      if (user.uid == (userID as string).trim()){
        username = user.displayName;
      }
    })

    return username;
  }


}
