import { Injectable, NgZone } from '@angular/core';
import { User } from './Models/User';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection,  AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Post } from './Models/Post';
import { Observable, map, timestamp } from 'rxjs';
import { FirebaseAuthService } from './firebase-auth.service';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  postsCollection: AngularFirestoreCollection<Post>;
  postDoc: AngularFirestoreDocument<Post> | undefined;
  posts: Observable<Post[]>;

  constructor(public afs: AngularFirestore, private authService: FirebaseAuthService) { 
    // this.posts = this.afs.collection<Post>('posts').valueChanges();

    this.postsCollection = this.afs.collection<Post>('posts/');

    this.posts = this.postsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Post;
        data.postId = a.payload.doc.id;
        return data;
      })
    }))
  }

  getPosts() {
    return this.posts;
  }

  addPost(post: Post){
    var user: User = this.authService.user;
    const ref = this.afs.collection<Post>('posts').doc();
    ref.set({
      title: post.title,
      description: post.description,
      date: new Date().toDateString(),
      userID: user.uid
    });
  }

  deletePost(post: Post){
    this.afs.doc<Post>(`posts/${post.postId}`).delete();
  }
}


