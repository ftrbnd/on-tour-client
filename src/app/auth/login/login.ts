import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { authRequestSchema, AuthResponse } from '../auth-options';
import { AuthService } from '../auth-service';
import { MessageModule } from 'primeng/message';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [
    ReactiveFormsModule,
    MessageModule,
    InputGroupModule,
    InputGroupAddonModule,
    FloatLabelModule,
    Button,
    RouterLink,
  ],
})
export class Login {
  loginResponse = signal<AuthResponse | null>(null);

  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  isInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.invalid && control.touched;
  }

  onSubmit() {
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    const { data: request, error } = authRequestSchema
      .omit({ email: true })
      .safeParse({ username, password });
    if (error) {
      return this.loginForm.setErrors({
        hasSpaces: true,
      });
    }

    this.authService.login(request).subscribe({
      next: (result) => {
        if (result.success && result.token) {
          this.authService.setToken(result.token);
          this.router.navigateByUrl('/');
        }

        this.loginResponse.set(result);
      },
      error: (error) => {
        console.error(error);
        if (error.status == 401) {
          this.loginResponse.set(error.error);
        }
      },
    });
  }
}
