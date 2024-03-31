import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostItemComponent } from './post-item/post-item.component';



@NgModule({
  declarations: [NavbarComponent, CreatePostComponent, PostListComponent, PostItemComponent],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    CreatePostComponent,
    PostListComponent
  ]
})
export class CoreModule { }
