import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Endpoints } from 'src/app/constants/Endpoints';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  token: string | null = this.authService.getToken();

  getLessons() {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.lessonDataStoreid,
      "Operation": "read",
      "Data": `select cast(ders_id as text), ders_adi from lgs_lessons order by sort_order asc`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getLessonsAndCategories() {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.lessonDataStoreid,
      "Operation": "read",
      "Data": `select ders_adi, cast(kategori_id as text), kategori_adi from lgs_lessons inner join lgs_categories on lgs_lessons.ders_id = lgs_categories.ders_id`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }
}
