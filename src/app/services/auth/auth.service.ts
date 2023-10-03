import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Endpoints } from 'src/app/constants/Endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getToken() {
    // return localStorage.getItem('token');
    return "73131423467622283545"
  }

  getLogout() {
    let param = {
      Token: this.getToken(),
    };
    return this.http.post(Endpoints.logout, param).pipe(
      map((response: any) => {
        localStorage.clear();
        this.router.navigate(['/login']);
        return response;
      })
    );
  }

  public isLoggedIn: boolean = false; // Kullanıcı oturum durumu, başlangıçta false olarak ayarlanır


  // Kullanıcıyı oturum açık olarak işaretle
  login(): void {
    this.isLoggedIn = true;
    // Burada gerekirse kullanıcı bilgilerini veya token'ı saklayabilirsiniz
  }

  // Kullanıcıyı oturumdan çıkart
  logout(): void {
    this.isLoggedIn = false;
    // Kullanıcı bilgilerini veya token'ı temizleme işlemi yapabilirsiniz
  }

  // Kullanıcının oturum durumunu kontrol et
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }


}