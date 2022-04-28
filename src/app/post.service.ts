import { Injectable, NgZone } from '@angular/core';
import { User } from 'firebase/auth';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection,  AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Post } from './Models/Post';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsCollection: AngularFirestoreCollection<Post> | undefined;
  posts: Observable<Post[]>;

  constructor(public afs: AngularFirestore) { 
    // this.posts = this.afs.collection<Post>('posts').valueChanges();

    this.postsCollection = this.afs.collection<Post>('posts');

    this.posts = this.postsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Post;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getPosts() {
    return this.posts;
  }

  addPost(post: Post){
    this.postsCollection?.add(post);
  }
}


