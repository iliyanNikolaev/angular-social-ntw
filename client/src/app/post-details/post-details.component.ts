import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../types/Post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  postId: string = ''
  post: Post | null = null;
  postLoading: boolean = true;
  likesVisible: boolean = true;
  commentsVisible: boolean = false;
  
  constructor(private route: ActivatedRoute, private sPost: PostService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
      this.sPost.getPostDetails(this.postId).subscribe({
        next: (post) => {
          this.post = post;
          this.postLoading = false;
        },
        error: (err) => {
          alert(err.error.errors.join('\n'));
          console.error(err); 
        }
      })
    });
  }
  removeCommentFromPostState(commentId: string) {
    if (this.post) {
      this.post.comments = this.post.comments.filter(x => x._id !== commentId);
    }
  }
  showComments() {
    this.commentsVisible = true;
    this.likesVisible = false;
  }
  showLikes() {
    this.commentsVisible = false;
    this.likesVisible = true;
  }
}
