import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private sUser: UserService) {}

  loginSubmit(form: NgForm) {
    if(form.invalid){
      return alert('invalid login data!');
    }
    const { email, password } = form.value;
    this.sUser.login(email, password).subscribe({
      next: () => {
        form.reset();
      },
      error: console.error
    })
  }
}
