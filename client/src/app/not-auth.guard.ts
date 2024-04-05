import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const currentUserId = localStorage.getItem('_id'); 

    if (!currentUserId) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
