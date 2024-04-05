import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  auth = {
    username: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  signIn(): any {
    if (!this.auth.username || !this.auth.password) return false;

    this.authService.signIn(this.auth.username, this.auth.password).subscribe({
      next: (res) => {
        this.router.navigate(['/']);
      },
      error: (errRes) => {
        console.log(errRes);
      }
    });
  }
}
