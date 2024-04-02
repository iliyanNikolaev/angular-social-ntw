import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';
import { AuthData } from 'src/app/types/AuthData';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  authData: AuthData | null = null;
  private authDataSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authDataSubscription = this.authService.getAuthDataObservable().subscribe((data) => {
      this.authData = data;
    });
  }

  ngOnDestroy(): void {
    this.authDataSubscription?.unsubscribe();
  }
}