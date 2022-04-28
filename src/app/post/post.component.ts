import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../Models/Post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post = {
    title: '',
    description: ''
  }

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    let f = form.value;

    this.post.title = f.title;
    this.post.description = f.description;

    this.postService.addPost(this.post);
    form.resetForm();
  }

}
