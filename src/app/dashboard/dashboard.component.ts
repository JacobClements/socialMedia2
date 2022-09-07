import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { Post } from '../Models/Post';
import { PostService } from '../post.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: Post[] = [];
  users: User[] = [];

  constructor(private postService: PostService, private userService: UserService, private Router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') == null || localStorage.getItem('user') == ''){
      window.alert("Looks like you have not signed in.")
      this.Router.navigate(['']);
    }
    
  }

  removePost(post: Post){
    this.postService.deletePost(post);
  }

  goToUserProfile(user: User){
    this.Router.navigate(['profile'], {state: {user: user}})
  }

}
