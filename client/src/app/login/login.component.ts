import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  private loginSubscription: Subscription = new Subscription();

  constructor(private sUser: UserService, private sAuth: AuthService, private router: Router) {}
  
  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
  loginSubmit(form: NgForm) {
    if(form.invalid){
      return alert('invalid login data!');
    }
    const { email, password } = form.value;
    this.loginSubscription = this.sUser.login(email, password).subscribe({
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
