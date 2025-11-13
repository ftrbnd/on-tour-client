import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { loginRequestSchema, LoginResult, TOKEN_KEY } from '../auth-options';
import { AuthService } from '../auth-service';
import { MessageModule } from 'primeng/message';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-form.html',
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
export class LoginForm {
  loginResult = signal<LoginResult | null>(null);

  private authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  isInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.invalid && control.touched;
  }

  onSubmit() {
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    const request = loginRequestSchema.parse({ email, password });

    this.authService.login(request).subscribe({
      next: (result) => {
        console.log(result);
        if (result.success && result.token) {
          localStorage.setItem(TOKEN_KEY, result.token);
        }

        this.loginResult.set(result);
      },
      error: (error) => {
        console.log(error);
        if (error.status == 401) {
          this.loginResult.set(error.error);
        }
      },
    });
  }
}
