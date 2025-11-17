import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authToken = inject(AuthService).getToken();

  const newRequest = request.clone({
    setHeaders: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
  });

  return next(newRequest);
};
