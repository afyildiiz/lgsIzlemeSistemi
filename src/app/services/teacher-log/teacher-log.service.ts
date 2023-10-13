import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from 'src/app/constants/Endpoints';
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TeacherLogService {

  constructor(private authService: AuthService,
    private http: HttpClient) { }

  token: string | null = this.authService.getToken();

  inserMonthlyNote(student_id: string, lesson_id: string, year: string, month: string, lesson: any) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.monthlyNoteDataStoreid,
      "Operation": "insert",
      "Data": `insert into lgs_notes_monthly(ogrenci_id, ders_id, kategori_id, aylik_hedef_soru, hedef_soru, yil, ay) values ('${student_id}', '${lesson_id}', '${lesson.kategori_id}', '${lesson.aylik_hedef_soru}', '${lesson.hedef_soru}', '${year}', '${month}')`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }


  getGoals(student_id: string, category_id: string, year: string, month: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": `SELECT CAST(ogrenci_id AS text), cast(ders_id as text), cast(kategori_id as text), aylik_hedef_soru, hedef_soru, yil, ay FROM lgs_notes_monthly WHERE ogrenci_id = '${student_id}' AND kategori_id = '${category_id}' and yil = '${year}' and ay = '${month}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }
}
