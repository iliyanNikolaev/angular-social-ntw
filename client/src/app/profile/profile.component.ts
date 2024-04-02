import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../types/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userId: string = '';
  user: User = { _id: '', firstName: '', lastName: '', connections: [], posts: [], profilePic: '' };
  profileLoading: boolean = true;
  private routeParamsSubscription: Subscription = new Subscription();
  private getUserSubscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private sUser: UserService) { }

  ngOnInit(): void {
    this.initProfile();
  }
  
  initProfile() {
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      this.userId = params['id'];
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      this.getUserSubscription = this.sUser.getUserById(this.userId).subscribe({
        next: (user) => {
          this.user = user;
          this.profileLoading = false;
        },
        error: (err) => {
          alert('User details fetching error!');
          console.error(err);
        }
      })
    });
  }
  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
    this.getUserSubscription.unsubscribe();
  }
}