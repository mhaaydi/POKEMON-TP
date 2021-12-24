import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable()
export class AuthService {
	isLoggedIn: boolean = false
	redirectUrl: string =""; 

	login(name: string, password: string): Observable<boolean> {
		let isLoggedIn = (name === 'mehdi' && password === 'mehdi');
		return of(true).pipe(
			delay(1000),
			tap(val => this.isLoggedIn = isLoggedIn)
		);
	}
	logout(): void {
		this.isLoggedIn = false;
	}
}