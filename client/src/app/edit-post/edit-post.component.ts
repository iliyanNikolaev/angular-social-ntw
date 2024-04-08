import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Post } from '../types/Post';
import { PostService } from '../post.service';
import { AuthService } from '../auth.service';
import { AuthData } from '../types/AuthData';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  authData: AuthData | null = null;
  currPost: Post | null = null;
  paramId: string = '';
  isLoading: boolean = false;
  
  private authDataSubscription: Subscription | undefined;
  constructor(private router: Router, private route: ActivatedRoute, private sPost: PostService, private sAuth: AuthService) {

  }

  ngOnInit(): void {
    this.getAuthData();
    this.route.params.subscribe(params => {
      this.paramId = params['id'];
      this.sPost.getPostDetails(this.paramId).subscribe({
        next: (post) => {
          this.currPost = post;
          if(post.owner._id != this.authData?._id) {
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          alert(err.error.errors.join('\n'));
          console.error(err); 
        }
      });
    });
  }
  ngOnDestroy(): void {
    this.authDataSubscription?.unsubscribe();
  }
  getAuthData() {
    this.authDataSubscription = this.sAuth.getAuthDataObservable().subscribe((data) => {
      this.authData = data;
    });
  }
  formSubmit(form: NgForm){
    if (form.invalid) {
      return alert('invalid form');
    }
    this.isLoading = true;
    this.sPost.editPost(this.paramId, form.value).subscribe({
      next: () => {
        this.router.navigate(['/post/'+this.paramId])
      },
      error: (err) => {
        alert(err.error.errors.join('\n'));
        console.error(err); 
      }
    });
  }
}
