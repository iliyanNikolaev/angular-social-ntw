import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Post } from '../types/Post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  private authDataSubscription: Subscription | undefined;
  currPost: Post | null = null;
  paramId: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private sPost: PostService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.paramId = params['id'];
      this.sPost.getPostDetails(this.paramId).subscribe({
        next: (post) => {
          this.currPost = post;
        },
        error: (err) => {
          alert(err.error.errors.join('\n'));
          console.error(err); 
        }
      });
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
  ngOnDestroy(): void {
    this.authDataSubscription?.unsubscribe();
  }
}
