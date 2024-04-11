import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CloudinaryService } from 'src/app/cloudinary.service';
import { PostService } from 'src/app/post.service';
import { AuthData } from 'src/app/types/AuthData';
import { Post } from 'src/app/types/Post';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnDestroy {
  @Output() postCreated: EventEmitter<Post> = new EventEmitter<Post>();
  selectedFile: File | null = null;
  auth: AuthData | null = null;
  isLoading: boolean = false;
  private cloudinarySubscription: Subscription | null = null;
  private createPostSubscription: Subscription | null = null;
  constructor(private sCloudinary: CloudinaryService, private sPost: PostService) { }
  ngOnDestroy(): void {
    this.cloudinarySubscription?.unsubscribe();
    this.createPostSubscription?.unsubscribe();
  }
  createPostSubmit(form: NgForm) {
    if (form.invalid) {
      return alert('invalid form');
    }
    this.isLoading = true;
    if (this.selectedFile && !(this.selectedFile.type.startsWith('image'))) {
      alert('Please select a valid image file');
      this.selectedFile = null;
      this.isLoading = false;
    } else if (this.selectedFile && this.selectedFile.type.startsWith('image')) {
      this.cloudinarySubscription = this.sCloudinary.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          this.createPostSubscription = this.sPost.createPost({ textContent: form.value['textContent'], picture: response }).subscribe({
            next: (post) => {
              this.postCreated.emit(post);
              form.reset();
              this.selectedFile = null;
              this.isLoading = false;
            },
            error: (err) => {
              alert(err.error.errors.join('\n'));
              console.error(err)
            } 
          });
        },
        error: (err) => {
          alert(err.error.errors.join('\n'));
          console.error(err)
        } 
      })
    } else if (this.selectedFile == null) {
      this.createPostSubscription = this.sPost.createPost({ textContent: form.value['textContent'] }).subscribe({
        next: (post) => {
          this.postCreated.emit(post);
          form.reset();
          this.isLoading = false;
        },
        error: (err) => {
          alert(err.error.errors.join('\n'));
          console.error(err)
        } 
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
