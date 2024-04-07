import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  auth = {
    username: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  signIn(): void {
    if (!this.auth.username || !this.auth.password) return;

    this.authService.signIn(this.auth.username, this.auth.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (errRes) => {
        console.log(errRes);
      },
    });
  }
}
