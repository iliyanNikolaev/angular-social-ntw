import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/comment.service';
import { AuthService } from 'src/app/auth.service';
import { PopulatedComment } from 'src/app/types/PopulatedComment';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthData } from 'src/app/types/AuthData';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comments: PopulatedComment[] = [];
  @Input() postId: string = '';
  authData: AuthData | null = null;
  private authDataSubscription: Subscription | undefined;

  constructor(private sComment: CommentService, private sAuth: AuthService) { }

  ngOnInit(): void {
    this.getAuthData();
  }

  getAuthData() {
    this.authDataSubscription = this.sAuth.getAuthDataObservable().subscribe((data) => {
      this.authData = data;
    });
  }

  commentSubmit(form: NgForm) {
    if (form.invalid) {
      return alert('invalid comment data!');
    }
    const { textContent } = form.value;

    this.sComment.createComment({ textContent, postId: this.postId }).subscribe({
      next: (comment) => {
        this.comments.push({_id: comment._id, textContent: comment.textContent, owner: comment.owner});
        form.reset();
      },
      error: (err) => {
        alert('post comment error')
      }
    })
  }

  ngOnDestroy(): void {
    this.authDataSubscription?.unsubscribe();
  }
}
