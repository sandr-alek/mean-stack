import { HttpEvent, HttpHandler, HttpInterceptor,	HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

	constructor(
		private authService: AuthService
	) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!this.authService.isAuthorized()) return next.handle(request);
		
		const token = this.authService.loadToken();
		const authRequest = request.clone({
			setHeaders: {	Authorization: token }
		});

		return next.handle(authRequest);
	}
}
