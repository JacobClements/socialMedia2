import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';

//firebase imports
import {AngularFireModule} from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorageModule} from '@angular/fire/compat/storage';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostComponent } from './post/post.component';
import { FeedComponent } from './feed/feed.component';
import { PostDisplayComponent } from './post-display/post-display.component';
import { TruncatePipe } from 'src/truncate.pipe';
import { UserCardComponent } from './user-card/user-card.component';
import { ProfileDisplayComponent } from './profile-display/profile-display.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavbarComponent,
    ProfileComponent,
    DashboardComponent,
    PostComponent,
    FeedComponent,
    PostDisplayComponent,
    TruncatePipe,
    UserCardComponent,
    ProfileDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
