import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../firebase-auth.service';
import { Post } from '../Models/Post';
import { User } from '../Models/User';
import { PostService } from '../post.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.css']
})
export class ProfileDisplayComponent implements OnInit {

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

}
