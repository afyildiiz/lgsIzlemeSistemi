import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Endpoints } from 'src/app/constants/Endpoints';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private authService: AuthService,
    private http: HttpClient) { }

  token: string | null = this.authService.getToken();

  getLastNotes(studentId: string, categoryId: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": `SELECT lgs_categories.kategori_adi, CAST(ogrenci_id AS text), CAST(lgs_categories.kategori_id AS text), hedef_soru, cozulen_soru, dogru_sayisi, yanlis_sayisi, tarih FROM lgs_notes INNER JOIN lgs_categories ON lgs_categories.kategori_id = lgs_notes.kategori_id WHERE ogrenci_id = '${studentId}' and lgs_notes.kategori_id = '${categoryId}' limit 10`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getNotesByStudentId(studentId: string, date: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": `SELECT lgs_categories.kategori_adi, CAST(ogrenci_id AS text), CAST(lgs_categories.kategori_id AS text), hedef_soru, cozulen_soru, dogru_sayisi, yanlis_sayisi, TO_CHAR(tarih, 'DD-MM-YYYY') FROM lgs_notes INNER JOIN lgs_categories ON lgs_categories.kategori_id = lgs_notes.kategori_id WHERE ogrenci_id = '${studentId}' AND tarih < '${date}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getNotesByStudentIdAndCategoryId(student_id: string, category_id: string, date: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": `SELECT lgs_categories.kategori_adi, CAST(ogrenci_id AS text), CAST(lgs_categories.kategori_id AS text), hedef_soru, cozulen_soru, dogru_sayisi, yanlis_sayisi, TO_CHAR(tarih, 'DD-MM-YYYY') FROM lgs_notes INNER JOIN lgs_categories ON lgs_categories.kategori_id = lgs_notes.kategori_id WHERE ogrenci_id = '${student_id}' AND lgs_notes.kategori_id = '${category_id}' and tarih='${date}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  insertStudentNote(student_id: string, lesson: any) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "insert",
      "Data": `insert into lgs_notes(ogrenci_id, kategori_id, hedef_soru, cozulen_soru, dogru_sayisi, yanlis_sayisi, tarih) values ('${student_id}', '${lesson.kategori_id}',  '${lesson.hedef_soru}', '${lesson.cozulen_soru}', '${lesson.dogru_sayisi}', '${lesson.yanlis_sayisi}', '${lesson.tarih}')`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }


  updateStudentNote(ogrenci_id: any, lesson: any) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "update",
      "Data": `update lgs_notes set cozulen_soru = '${lesson.cozulen_soru}', dogru_sayisi = '${lesson.dogru_sayisi}', yanlis_sayisi = '${lesson.yanlis_sayisi}' where ogrenci_id = '${ogrenci_id}' and kategori_id = '${lesson.kategori_id}' and tarih = '${lesson.tarih}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getPerformOfCategories(student_id: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": `select extract(year from lgs_notes.tarih) as yil, extract(month from lgs_notes.tarih) as ay, CASE  WHEN extract(month FROM tarih) = 1 THEN 'Ocak' WHEN extract(month FROM tarih) = 2 THEN 'Şubat' WHEN extract(month FROM tarih) = 3 THEN 'Mart' WHEN extract(month FROM tarih) = 4 THEN 'Nisan' WHEN extract(month FROM tarih) = 5 THEN 'Mayıs' WHEN extract(month FROM tarih) = 6 THEN 'Haziran' WHEN extract(month FROM tarih) = 7 THEN 'Temmuz'WHEN extract(month FROM tarih) = 8 THEN 'Ağustos' WHEN extract(month FROM tarih) = 9 THEN 'Eylül' WHEN extract(month FROM tarih) = 10 THEN 'Ekim' WHEN extract(month FROM tarih) = 11 THEN 'Kasım' WHEN extract(month FROM tarih) = 12 THEN 'Aralık' END AS ay_ismi, extract(WEEK from lgs_notes.tarih) as hafta, lgs_lessons.ders_adi , lgs_categories.kategori_adi, cast(lgs_categories.kategori_id as text), SUM(dogru_sayisi) as toplam_dogru_sayisi, SUM(cozulen_soru) as toplam_cozulen_soru, (cast(SUM(dogru_sayisi) as double precision) / cast(SUM(cozulen_soru) as double precision)) * 100 as performans from lgs_notes inner join lgs_categories on lgs_categories.kategori_id = lgs_notes.kategori_id inner join lgs_lessons on lgs_lessons.ders_id = lgs_categories.ders_id where ogrenci_id = '4e244573-e07c-46de-82f8-87c321770cc5' group by (yil, ay, hafta, lgs_lessons.ders_adi, lgs_categories.kategori_adi, lgs_categories.kategori_id) order by ders_adi asc`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getPerformofLessons(ogrenci_id: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": `select lgs_lessons.ders_adi, cast(lgs_lessons.ders_id as text), SUM(dogru_sayisi) as toplam_dogru_sayisi, SUM(cozulen_soru) as toplam_cozulen_soru, (CAST(SUM(dogru_sayisi) AS DOUBLE PRECISION) / CAST(SUM(cozulen_soru) AS DOUBLE PRECISION)) * 100 as performans from lgs_notes INNER JOIN lgs_categories on lgs_categories.kategori_id = lgs_notes.kategori_id INNER JOIN lgs_lessons on lgs_lessons.ders_id = lgs_categories.ders_id where ogrenci_id = '${ogrenci_id}' GROUP by (lgs_lessons.ders_id, lgs_lessons.ders_adi) ORDER by ders_adi ASC;`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

}
