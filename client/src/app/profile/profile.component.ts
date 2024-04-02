import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../types/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: string = '';
  user: User = { _id: '', firstName: '', lastName: '', connections: [], posts: [], profilePic: '' };
  profileLoading: boolean = true;
  constructor(private route: ActivatedRoute, private sUser: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      this.sUser.getUserById(this.userId).subscribe({
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
}
