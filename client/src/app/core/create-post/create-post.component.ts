import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CloudinaryService } from 'src/app/cloudinary.service';
import { PostService } from 'src/app/post.service';
import { AuthData } from 'src/app/types/AuthData';
import { Post } from 'src/app/types/Post';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  @Output() postCreated: EventEmitter<Post> = new EventEmitter<Post>();
  selectedFile: File | null = null;
  auth: AuthData | null = null;
  isLoading: boolean = false;
  constructor(private sCloudinary: CloudinaryService, private sPost: PostService) { }

  createPostSubmit(form: NgForm) {
    if (form.invalid) {
      return alert('invalid form');
    }
    this.isLoading = true;
    if (this.selectedFile && !(this.selectedFile.type.startsWith('image'))) {
      form.controls['image'].setErrors({ 'invalidImage': true });
      this.isLoading = false;
    } else if (this.selectedFile && this.selectedFile.type.startsWith('image')) {
      console.log('img');
      this.sCloudinary.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          this.sPost.createPost({ textContent: form.value['textContent'], picture: response }).subscribe({
            next: (post) => {
              this.postCreated.emit(post);
              form.reset();
              this.selectedFile = null;
              this.isLoading = false;
            },
            error: console.error
          });
        },
        error: console.error
      })
    } else if (this.selectedFile == null) {
      this.sPost.createPost({ textContent: form.value['textContent'] }).subscribe({
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
