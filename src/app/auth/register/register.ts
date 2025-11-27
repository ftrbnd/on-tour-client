import { Component, inject, signal } from '@angular/core';
import { authRequestSchema, AuthResponse } from '../auth-options';
import { AuthService } from '../auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MessageModule,
    InputGroupModule,
    InputGroupAddonModule,
    FloatLabelModule,
    Button,
    RouterLink,
    InputTextModule,
  ],
  templateUrl: './register.html',
})
export class Register {
  registerResponse = signal<AuthResponse | null>(null);

  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  isInvalid(controlName: string) {
    const control = this.registerForm.get(controlName);
    return control?.invalid && control.touched;
  }

  onSubmit() {
    const username = this.registerForm.controls.username.value;
    const email = this.registerForm.controls.email.value;
    const password = this.registerForm.controls.password.value;

    const { data: request, error } = authRequestSchema
      .required()
      .safeParse({ username, email, password });
    if (error) {
      return this.registerForm.setErrors({
        hasSpaces: true,
      });
    }

    this.authService.register(request).subscribe({
      next: (result) => {
        if (result.success && result.token) {
          this.authService.setToken(result.token);
          this.router.navigateByUrl('/');
        }

        this.registerResponse.set(result);
      },
      error: (error) => {
        console.error(error);
        if (error.status == 401) {
          this.registerResponse.set(error.error);
        }
      },
    });
  }
}
