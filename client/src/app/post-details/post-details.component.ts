import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  postId: string = ''

  commentsVisible: boolean = false;
  likesVisible: boolean = true;
  
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
      console.log(this.postId);
    });
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
