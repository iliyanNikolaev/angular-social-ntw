import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private sUser: UserService, private sAuth: AuthService, private router: Router) { }

  registerSubmit(form: NgForm) {
    if (form.invalid) {
      return alert('Invalid registration data!');
    }
    const { email, firstName, lastName, password, repeat } = form.value;

    if (password !== repeat) {
      return alert('Passwords do not match!');
    }

    this.sUser.register(email, password, firstName, lastName).subscribe({
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
