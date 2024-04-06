import { Component } from '@angular/core';
import { AuthData } from '../types/AuthData';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { CloudinaryService } from '../cloudinary.service';
import { AuthService } from '../auth.service';
import { User } from '../types/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  authData: AuthData | null = null;
  paramId: string | null = null;
  user: User | null = null;
  selectedFile: File | null = null;
  private authDataSubscription: Subscription | undefined;
  constructor(private router: Router, private route: ActivatedRoute, private sUser: UserService, private sCloudinary: CloudinaryService, private sAuth: AuthService) {

  }

  ngOnInit(): void {
    this.getAuthData();
    this.route.params.subscribe(params => {
      this.paramId = params['id'];
      if(this.paramId != null){
        this.sUser.getUserById(this.paramId).subscribe({
          next: (user) => {
            this.user = user;
          }, 
          error: (err) => {
            alert(err.error.errors.join('\n'));
            console.error(err); 
          }
        });
      }
    });
  }
  
  getAuthData() {
    this.authDataSubscription = this.sAuth.getAuthDataObservable().subscribe((data) => {
      this.authData = data;
    });
  }
  submitForm(form: NgForm){
    if (form.invalid) {
      return alert('invalid form');
    }
    if (this.selectedFile && !(this.selectedFile.type.startsWith('image'))) {
      form.controls['image'].setErrors({ 'invalidImage': true });
    } else if (this.selectedFile && this.selectedFile.type.startsWith('image')) {
      this.sCloudinary.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          if(this.user?._id){
            this.sUser.editUser(this.user._id, { ...form.value, profilePic: response}).subscribe({
              next: () => {
                this.router.navigate(['/profile/'+this.user?._id]);
              },
              error: (err) => {
                alert(err.error.errors.join('\n'));
                console.error(err); 
              }
            })
          }
        },
        error:(err) => {
          alert(err.error.errors.join('\n'));
          console.error(err); 
        }
      })
    } else if (this.selectedFile == null) {
      if(this.user?._id){
        this.sUser.editUser(this.user._id, { ...form.value}).subscribe({
          next: () => {
            this.router.navigate(['/profile/'+this.user?._id]);
          },
          error: (err) => {
            alert(err.error.errors.join('\n'));
            console.error(err); 
          }
        })
      }
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  ngOnDestroy(): void {
    this.authDataSubscription?.unsubscribe();
  }
}
