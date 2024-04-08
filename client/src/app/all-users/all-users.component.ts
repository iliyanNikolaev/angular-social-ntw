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
  filteredUsers: PopulatedUser[] = [];
  usersLoading: boolean = true;
  authData: AuthData | null = null;
  searchString: string = '';
  private usersSubscription: Subscription = new Subscription();
  private authDataSubscription: Subscription | undefined;
  
  constructor(private sUser: UserService, private sAuth: AuthService) { }

  ngOnInit(): void {
    this.getAuthData();
    this.getAllUsers();
  }
  ngOnDestroy(): void {
    this.usersSubscription?.unsubscribe();
    this.authDataSubscription?.unsubscribe();
  }
  getAllUsers(): void {
    this.usersSubscription = this.sUser.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.usersLoading = false;
      },
      error: (err) => {
        alert(err.error.errors.join('\n'));
        console.error(err);
      }
    });
  }

  getAuthData() {
    this.authDataSubscription = this.sAuth.getAuthDataObservable().subscribe((data) => {
      this.authData = data;
    });
  }
  filterUsers(e: Event, input: HTMLInputElement): void {
    if (input.value == '') {
      this.filteredUsers = [...this.users];
      return;
    } else {
      const lowerCaseSearch = input.value.toLowerCase();
      this.filteredUsers = this.users.filter(user => 
        user.firstName.toLowerCase().includes(lowerCaseSearch) || 
        user.lastName.toLowerCase().includes(lowerCaseSearch)
      );
    }
  }
}