import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from './Models/User';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection: AngularFirestoreCollection<User> | undefined;
  users: Observable<User[]>;

  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection<User>('users');

    this.users = this.userCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.uid = a.payload.doc.id;
        return data;
      })
    }))
   }

   getUsers(){
     return this.users;
   }

}
