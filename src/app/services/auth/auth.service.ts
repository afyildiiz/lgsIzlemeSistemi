import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Endpoints } from 'src/app/constants/Endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn: Observable<boolean> = this.loggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login() {
    this.loggedIn.next(true);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getLogout() {
    let param = {
      Token: this.getToken(),
    };
    return this.http.post(Endpoints.logout, param).pipe(
      map((response: any) => {
        this.loggedIn.next(false);
        localStorage.clear();
        this.router.navigate(['/login']);
        return response;
      })
    );
  }


}