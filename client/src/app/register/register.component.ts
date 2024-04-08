import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  private registerSubscription: Subscription = new Subscription();
  constructor(private sUser: UserService, private sAuth: AuthService, private router: Router) { }
  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe();
  }
  registerSubmit(form: NgForm) {
    if (form.invalid) {
      return alert('Invalid registration data!');
    }
    const { email, firstName, lastName, password, repeat } = form.value;

    if (password !== repeat) {
      return alert('Passwords do not match!');
    }

    this.registerSubscription = this.sUser.register(email, password, firstName, lastName).subscribe({
      next: (userData) => {
        this.sAuth.setAuthData(userData);
        form.reset();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert(err.error.errors.join('\n'));
        console.error(err);
      }
    });
  }
}
