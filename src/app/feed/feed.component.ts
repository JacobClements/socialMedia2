import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private postService: PostService, private userService: UserService, private Router: Router) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(x => {
      this.posts = x;
    })

    this.userService.getUsers().subscribe(x => {
      this.users = x;
    })
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
