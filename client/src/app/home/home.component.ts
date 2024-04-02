import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../types/Post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = []
  postListLoading: boolean = true;

  constructor(private sPost: PostService) { }

  ngOnInit(): void {

    this.sPost.getPosts(0).subscribe({
      next: (posts) => {
        this.posts = posts;
        this.postListLoading = false;
      },
      error: (err) => {
       alert('Posts fetching error!');
       console.error(err); 
      }
    })
  }

  
}
