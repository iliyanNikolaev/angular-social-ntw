import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { CloudinaryService } from '../cloudinary.service';
import { AuthService } from '../auth.service';
import { AuthData } from '../types/AuthData';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  authData: AuthData | null = null;
  private authDataSubscription: Subscription | undefined;
  constructor(private router: Router, private sUser: UserService, private sCloudinary: CloudinaryService, private sAuth: AuthService) {

  }

  ngOnInit(): void {
    this.getAuthData();
  }
  
  getAuthData() {
    this.authDataSubscription = this.sAuth.getAuthDataObservable().subscribe((data) => {
      this.authData = data;
    });
  }
}
