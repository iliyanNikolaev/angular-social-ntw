import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { PopulatedUser } from '../types/PopulatedUser';
import { AuthService } from '../auth.service';
import { AuthData } from '../types/AuthData';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit, OnDestroy {
  users: PopulatedUser[] = [];
  usersLoading: boolean = true;
  authData: AuthData | null = null;
  private usersSubscription: Subscription = new Subscription();
  private authDataSubscription: Subscription | undefined;
  
  constructor(private sUser: UserService, private sAuth: AuthService) { }

  ngOnInit(): void {
    this.getAuthData();
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.usersSubscription = this.sUser.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.usersLoading = false;
      },
      error: (err) => {
        alert('User details fetching error!');
        console.error(err);
      }
    });
  }
  getAuthData() {
    this.authDataSubscription = this.sAuth.getAuthDataObservable().subscribe((data) => {
      this.authData = data;
    });
  }
  ngOnDestroy(): void {
    this.usersSubscription?.unsubscribe();
    this.authDataSubscription?.unsubscribe();
  }
}