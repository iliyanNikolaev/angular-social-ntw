import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private sUser: UserService, private sAuth: AuthService, private router: Router) {}

  loginSubmit(form: NgForm) {
    if(form.invalid){
      return alert('invalid login data!');
    }
    const { email, password } = form.value;
    this.sUser.login(email, password).subscribe({
      next: (userData) => {
        this.sAuth.setAuthData(userData)
        form.reset();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert(err.error.errors.join('\n'))
        console.error(err)
      }
    })
  }
}
