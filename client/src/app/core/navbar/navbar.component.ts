import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';
import { AuthData } from 'src/app/types/AuthData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  authData: AuthData | null = null;
  private authDataSubscription: Subscription | undefined;

  constructor(private sAuth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authDataSubscription = this.sAuth.getAuthDataObservable().subscribe((data) => {
      this.authData = data;
    });
  }

  ngOnDestroy(): void {
    this.authDataSubscription?.unsubscribe();
  }

  logout(): void {
    this.sAuth.setAuthData(null);
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}