import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() removeCommentFromPostState: EventEmitter<string> = new EventEmitter<string>();
  authData: AuthData | null = null;
  private authDataSubscription: Subscription | undefined;
  private createCommentSubscription: Subscription | undefined;
  private deleteCommentSubscription: Subscription | undefined;

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

    this.createCommentSubscription = this.sComment.createComment({ textContent, postId: this.postId }).subscribe({
      next: (comment) => {
        this.comments.push({_id: comment._id, textContent: comment.textContent, owner: comment.owner});
        form.reset();
      },
      error: (err) => {
        alert(err.error.errors.join('\n'));
        console.error(err)
      }
    })
  }

  deleteComment(commentId: string) {
    this.deleteCommentSubscription = this.sComment.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(comment => comment._id != commentId);
        this.removeCommentFromPostState.emit(commentId);
      },
      error: (err) => {
        alert(err.error.errors.join('\n'));
        console.error(err);
      }
    });
  }
  
  ngOnDestroy(): void {
    this.authDataSubscription?.unsubscribe();
    this.createCommentSubscription?.unsubscribe();
    this.deleteCommentSubscription?.unsubscribe();
  }
}
