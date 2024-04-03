import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostItemComponent } from './post-item/post-item.component';
import { CommentsComponent } from './comments/comments.component';
import { LikesComponent } from './likes/likes.component';
import { AppRoutingModule } from '../app-routing.module';
import { TimeAgoPipe } from './time-ago.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [NavbarComponent, CreatePostComponent, PostListComponent, PostItemComponent, CommentsComponent, LikesComponent, TimeAgoPipe],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    CreatePostComponent,
    PostListComponent,
    PostItemComponent,
    CommentsComponent,
    LikesComponent,
    TimeAgoPipe
  ]
})
export class CoreModule { }
