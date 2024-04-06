import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../types/User';
import { AuthService } from '../auth.service';
import { AuthData } from '../types/AuthData';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userId: string = '';
  user: User = { email: '', _id: '', firstName: '', lastName: '', connections: [], posts: [], profilePic: '' };
  profileLoading: boolean = true;
  authData: AuthData | null = null;
  isOwnProfile: boolean = false;
  isFollower: boolean = false;
  connectionsVisible: boolean = false;
  private routeParamsSubscription: Subscription = new Subscription();
  private getUserSubscription: Subscription = new Subscription();
  private authDataSubscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private sUser: UserService, private sAuth: AuthService) { }

  ngOnInit(): void {
    this.initProfile();
    this.getAuthData();
    if(this.authData?._id == this.user._id){
      this.isOwnProfile = true;
    } else {
      for (let conn of this.user.connections) {
        if(conn._id == this.authData?._id){
          this.isFollower = true;
        }
      }
    }
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
          if (this.authData?._id === this.user._id) {
            this.isOwnProfile = true;
          } else {
            for (let conn of this.user.connections) {
              if (conn._id === this.authData?._id) {
                this.isFollower = true;
                break;
              }
            }
          }
        },
        error: (err) => {
          alert(err.error.errors.join('\n'));
          console.error(err);
        }
      })
    });
  }

  getAuthData() {
    this.authDataSubscription = this.sAuth.getAuthDataObservable().subscribe((data) => {
      this.authData = data;
    });
  }

  toggleConnect(id: string) {
    this.sUser.connectUser(id).subscribe({
      next: () => {
        const conn = {
          _id: this.authData?._id || '',
          firstName: this.authData?.firstName || '',
          lastName: this.authData?.lastName || '',
          profilePic: this.authData?.profilePic || ''
        }
  
        if (this.isFollower) {
          this.user.connections = this.user.connections.filter(c => c._id !== this.authData?._id);
          this.isFollower = false;
        } else {
          this.user.connections.push(conn);
          this.isFollower = true;
        }
      },
      error: (err) => {
        alert(err.error.errors.join('\n'));
        console.error(err);
      }
    });
  }

  toggleConnVisible() {
    this.connectionsVisible = !this.connectionsVisible;
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
    this.getUserSubscription.unsubscribe();
    this.authDataSubscription.unsubscribe();
  }
}