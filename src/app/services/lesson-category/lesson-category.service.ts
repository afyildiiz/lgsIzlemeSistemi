import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Endpoints } from 'src/app/constants/Endpoints';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonCategoryService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  token: string | null = this.authService.getToken();

  getCategories() {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.lessonCategoryDataStoreid,
      "Operation": "read",
      "Data": `select cast(ders_id as text), cast(kategori_id as text), kategori_adi from lgs_categories5`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getCategoriesByLessonid(lessonid: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.lessonCategoryDataStoreid,
      "Operation": "read",
      "Data": `select cast(ders_id as text), cast(kategori_id as text), kategori_adi from lgs_categories5 where ders_id='${lessonid}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }
}
