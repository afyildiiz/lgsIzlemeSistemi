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

  getGeneralPerformByStudentIds(ogrenciids: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      //"Data": `select ll.ders_adi, cast(ln2.ders_id as text), sum(hedef_soru) as hedef, sum(cozulen_soru) as cozulen, sum(dogru_sayisi) as dogru, sum(yanlis_sayisi) as yanlis, SUM(cozulen_soru - dogru_sayisi - yanlis_sayisi) AS bos, CAST(CAST(SUM(dogru_sayisi) AS DOUBLE PRECISION) / NULLIF(CAST(SUM(cozulen_soru) AS DOUBLE PRECISION), 0) * 100 AS NUMERIC(10, 2)) AS performans, CAST(CAST(SUM(cozulen_soru) AS DOUBLE PRECISION) / NULLIF(CAST(SUM(hedef_soru) AS DOUBLE PRECISION), 0) * 100 AS NUMERIC(10, 2)) AS calisma_performans from lgs_notes ln2 inner join lgs_lessons ll on ll.ders_id = ln2.ders_id where ogrenci_id in(${ogrenciids}) group by ln2.ders_id, ll.ders_adi`,
      "Data": `SELECT cast(ll.ders_id as text), ll.ders_adi, COALESCE(SUM(ln.hedef_soru), 0) AS hedef, COALESCE(SUM(ln.cozulen_soru), 0) AS cozulen, COALESCE(SUM(ln.dogru_sayisi), 0) AS dogru, COALESCE(SUM(ln.yanlis_sayisi), 0) AS yanlis, COALESCE(SUM(ln.cozulen_soru - ln.dogru_sayisi - ln.yanlis_sayisi), 0) AS bos, COALESCE(CAST(CAST(SUM(ln.dogru_sayisi) AS DOUBLE PRECISION) / NULLIF(CAST(SUM(ln.cozulen_soru) AS DOUBLE PRECISION), 0) * 100 AS NUMERIC(10, 2)), 0) AS performans, COALESCE(CAST(CAST(SUM(ln.cozulen_soru) AS DOUBLE PRECISION) / NULLIF(CAST(SUM(ln.hedef_soru) AS DOUBLE PRECISION), 0) * 100 AS NUMERIC(10, 2)), 0) AS calisma_performans FROM lgs_lessons ll LEFT JOIN lgs_notes ln ON ll.ders_id = ln.ders_id AND ln.ogrenci_id in(${ogrenciids}) GROUP BY ll.ders_adi, ll.ders_id, ll.sort_order order by ll.sort_order`,
      //"Data": `SELECT ll.ders_adi, cast(ln.ogrenci_id as text), COALESCE(SUM(ln.hedef_soru), 0) AS hedef, COALESCE(SUM(ln.cozulen_soru), 0) AS cozulen, COALESCE(SUM(ln.dogru_sayisi), 0) AS dogru, COALESCE(SUM(ln.yanlis_sayisi), 0) AS yanlis, COALESCE(SUM(ln.cozulen_soru - ln.dogru_sayisi - ln.yanlis_sayisi), 0) AS bos, COALESCE(CAST(CAST(SUM(ln.dogru_sayisi) AS DOUBLE PRECISION) / NULLIF(CAST(SUM(ln.cozulen_soru) AS DOUBLE PRECISION), 0) * 100 AS NUMERIC(10, 2)), 0) AS performans, COALESCE(CAST(CAST(SUM(ln.cozulen_soru) AS DOUBLE PRECISION) / NULLIF(CAST(SUM(ln.hedef_soru) AS DOUBLE PRECISION), 0) * 100 AS NUMERIC(10, 2)), 0) AS calisma_performans FROM lgs_lessons ll LEFT JOIN lgs_notes ln ON ll.ders_id = ln.ders_id AND ln.ogrenci_id in(${ogrenciids}) GROUP BY ll.ders_adi, ln.ders_id, ll.sort_order, ln.ogrenci_id order by ll.sort_order`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getGeneralPerformByStudentIdsandLessonId(ogrenciids: string, lessonid: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": `select cast(ls.ogrenci_id as text), ls.ad, ls.soyad , cast(ll.ders_id as text), ll.ders_adi, COALESCE(SUM(ln.hedef_soru), 0) AS hedef, COALESCE(SUM(ln.cozulen_soru), 0) AS cozulen, COALESCE(SUM(ln.dogru_sayisi), 0) AS dogru, COALESCE(SUM(ln.yanlis_sayisi), 0) AS yanlis, COALESCE(SUM(ln.cozulen_soru - ln.dogru_sayisi - ln.yanlis_sayisi), 0) AS bos, COALESCE(CAST(CAST(SUM(ln.dogru_sayisi) AS DOUBLE PRECISION) / NULLIF(CAST(SUM(ln.cozulen_soru) AS DOUBLE PRECISION), 0) * 100 AS NUMERIC(10, 2)), 0) AS performans FROM lgs_lessons ll LEFT JOIN lgs_notes ln ON ll.ders_id = ln.ders_id inner join lgs_students ls on ln.ogrenci_id = ls.ogrenci_id  AND ln.ogrenci_id in(${ogrenciids}) where ln.ders_id = '${lessonid}' group by ls.ogrenci_id, ll.ders_id, ll.ders_adi, ls.ad, ls.soyad, ln.ogrenci_id`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  insertNote(student_id: string, lesson_id: string, year: string, month: string, lesson: any) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "insert",
      "Data": `insert into lgs_notes(ogrenci_id, ders_id, kategori_id, aylik_hedef_soru, hedef_soru, yil, ay) values ('${student_id}', '${lesson_id}', '${lesson.kategori_id}', '${lesson.aylik_hedef_soru}', '${lesson.hedef_soru}', '${year}', '${month}')`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getLastNotes(studentId: string, categoryId: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": `SELECT lgs_categories.kategori_adi, CAST(ogrenci_id AS text), CAST(lgs_categories.kategori_id AS text), hedef_soru, cozulen_soru, dogru_sayisi, yanlis_sayisi, gun FROM lgs_notes INNER JOIN lgs_categories ON lgs_categories.kategori_id = lgs_notes.kategori_id WHERE ogrenci_id = '${studentId}' and lgs_notes.kategori_id = '${categoryId}' limit 10`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getNotesByLessonId(student_ids: string, lesson_id: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      //"Data": `SELECT cast(ln2.kategori_id as text), ln2.yil, ln2.aylik_hedef_soru, ln2.ay, cast(ln2.ogrenci_id as text), lc.kategori_adi, ln2.hedef_soru, ln2.cozulen_soru, ln2.dogru_sayisi, ln2.yanlis_sayisi, (ln2.cozulen_soru - (ln2.dogru_sayisi + ln2.yanlis_sayisi)) as bos_sayisi, ll.ders_adi FROM lgs_notes ln2 INNER JOIN lgs_lessons ll ON ll.ders_id = ln2.ders_id INNER JOIN lgs_categories lc ON lc.kategori_id = ln2.kategori_id WHERE ln2.ders_id = '${lesson_id}' AND ln2.ogrenci_id IN (${student_ids}) order by COALESCE(ln2.cozulen_soru, 0) DESC`,
      "Data": `select cast(ln2.ogrenci_id as text), lc.kategori_adi, cast(ln2.kategori_id as text), ln2.hedef_soru * 30 as hedef_soru, sum(ln2.cozulen_soru) as cozulen_soru , sum(ln2.dogru_sayisi) as dogru_sayisi, sum(ln2.yanlis_sayisi) as yanlis_sayisi, ln2.ay, ln2.yil from lgs_notes ln2  inner join lgs_categories lc on lc.kategori_id = ln2.kategori_id where ln2.ders_id = '${lesson_id}' and ln2.ogrenci_id in (${student_ids}) group by ln2.ogrenci_id, lc.kategori_adi, ln2.kategori_id, ln2.hedef_soru, ln2.ay, ln2.yil`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    ); //ogrenci idlere göre filtrele ve ders idye göre filtrele
  }

  getNotesByLessonIdAndYear(student_ids: string, lesson_id: string, year: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": `SELECT cast(ln2.kategori_id as text), ln2.aylik_hedef_soru, ln2.yil, ln2.ay, cast(ln2.ogrenci_id as text), lc.kategori_adi, ln2.hedef_soru, ln2.cozulen_soru, ln2.dogru_sayisi, ln2.yanlis_sayisi, ll.ders_adi FROM lgs_notes ln2 INNER JOIN lgs_lessons ll ON ll.ders_id = ln2.ders_id INNER JOIN lgs_categories lc ON lc.kategori_id = ln2.kategori_id WHERE ln2.ders_id = '${lesson_id}' AND ln2.ogrenci_id IN (${student_ids}) and yil = '${year}`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    ); //ogrenci idlere göre filtrele ve ders idye göre filtrele
  }

  getGoalsByLessonId(student_id: string, lesson_id: string, date: any) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": `SELECT cast(ln2.ders_id as text), cast(ln2.kategori_id as text), cast(ln2.ogrenci_id as text), lc.kategori_adi, ln2.hedef_soru, ln2.aylik_hedef_soru, ln2.cozulen_soru, ln2.dogru_sayisi, ln2.yanlis_sayisi, ll.ders_adi, ln2.yil, ln2.ay FROM lgs_notes ln2 INNER JOIN lgs_lessons ll ON ll.ders_id = ln2.ders_id INNER JOIN lgs_categories lc ON lc.kategori_id = ln2.kategori_id WHERE ln2.ders_id = '${lesson_id}' AND yil = '${date.year}' AND ay = '${date.month}' AND ogrenci_id = '${student_id}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    ); //ogrenci idlere göre filtrele ve ders idye göre filtrele
  }

  getAllNotesByStudentId(studentId: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": `SELECT lgs_categories.kategori_adi, CAST(ogrenci_id AS text), CAST(lgs_categories.kategori_id AS text), hedef_soru, cozulen_soru, dogru_sayisi, yanlis_sayisi, TO_CHAR(gun, 'DD-MM-YYYY') as gun FROM lgs_notes INNER JOIN lgs_categories ON lgs_categories.kategori_id = lgs_notes.kategori_id WHERE ogrenci_id = '${studentId}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getNotesByStudentIdAndCategoryId(student_id: string, category_id: string, year: string, month: string, day: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": `SELECT lgs_categories.kategori_adi, CAST(lgs_notes.ogrenci_id AS text), lnm.aylik_hedef_soru, CAST(lgs_categories.kategori_id AS text), lnm.hedef_soru, cozulen_soru, dogru_sayisi, yanlis_sayisi, TO_CHAR(gun, 'DD-MM-YYYY') as gun FROM lgs_notes INNER JOIN lgs_categories ON lgs_categories.kategori_id = lgs_notes.kategori_id inner join lgs_notes_monthly lnm on lnm.kategori_id = lgs_notes.kategori_id and lnm.yil = lgs_notes.yil and lnm.ay = lgs_notes.ay WHERE lgs_notes.ogrenci_id = '${student_id}' AND lgs_notes.kategori_id = '${category_id}' and lgs_notes.yil = '${year}' and lgs_notes.ay = '${month}' and lgs_notes.gun = '${day}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }



  getNotesByStudentIdAndLessonId(student_id: string, lesson_id: string, year: number, month?: number) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      //"Data": `SELECT lgs_categories.kategori_adi, CAST(lgs_notes.ogrenci_id AS text), CAST(lgs_categories.kategori_id AS text), lgs_notes_monthly.hedef_soru, cozulen_soru, dogru_sayisi, yanlis_sayisi, TO_CHAR(gun, 'DD-MM-YYYY') as gun, lgs_notes.ay, lgs_notes.yil FROM lgs_notes INNER JOIN lgs_categories ON lgs_categories.kategori_id = lgs_notes.kategori_id inner join lgs_notes_monthly on lgs_notes.kategori_id = lgs_notes_monthly.kategori_id and lgs_notes.ogrenci_id = lgs_notes_monthly.ogrenci_id and lgs_notes.yil = lgs_notes_monthly.yil and lgs_notes.ay = lgs_notes_monthly.ay WHERE lgs_notes.ogrenci_id = '${student_id}' AND lgs_notes.ders_id = '${lesson_id}' and lgs_notes.yil='${year}'and lgs_notes.ay='${month}'`,
      "Data": `SELECT lgs_categories.kategori_adi, CAST(lgs_notes.ogrenci_id AS text), CAST(lgs_categories.kategori_id AS text), lgs_notes_monthly.hedef_soru * 30 as hedef_soru, sum(cozulen_soru) as cozulen_soru, sum(dogru_sayisi) as dogru_sayisi, sum(yanlis_sayisi) as yanlis_sayisi, lgs_notes.ay, lgs_notes.yil FROM lgs_notes INNER JOIN lgs_categories ON lgs_categories.kategori_id = lgs_notes.kategori_id inner join lgs_notes_monthly on lgs_notes.kategori_id = lgs_notes_monthly.kategori_id and lgs_notes.ogrenci_id = lgs_notes_monthly.ogrenci_id and lgs_notes.yil = lgs_notes_monthly.yil and lgs_notes.ay = lgs_notes_monthly.ay WHERE lgs_notes.ogrenci_id = '${student_id}' AND lgs_notes.ders_id = '${lesson_id}' and lgs_notes.yil='${year}'and lgs_notes.ay='${month}' group by lgs_notes.kategori_id, lgs_categories.kategori_adi, lgs_notes.ogrenci_id, lgs_categories.kategori_id, lgs_notes_monthly.hedef_soru, lgs_notes.ay, lgs_notes.yil`,
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
      "Data": `insert into lgs_notes(ogrenci_id, kategori_id, ders_id, hedef_soru, cozulen_soru, dogru_sayisi, yanlis_sayisi, gun, ay, yil, aylik_hedef_soru) values ('${student_id}', '${lesson.kategori_id}', '${lesson.lesson_id}', '${lesson.hedef_soru}', '${lesson.cozulen_soru}', '${lesson.dogru_sayisi}', '${lesson.yanlis_sayisi}', '${lesson.tarih}', '${lesson.ay}', '${lesson.yil}', '${lesson.aylik_hedef_soru}')`,
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
      "Data": `UPDATE lgs_notes set cozulen_soru = '${lesson.cozulen_soru}', dogru_sayisi = '${lesson.dogru_sayisi}', yanlis_sayisi = '${lesson.yanlis_sayisi}' WHERE ogrenci_id = '${ogrenci_id}' AND ders_id = '${lesson.lesson_id}' AND kategori_id = '${lesson.kategori_id}' AND ay = '${lesson.ay}' AND yil = '${lesson.yil}' AND gun = '${lesson.tarih}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  updateNote(ogrenci_id: any, lesson: any, date: any) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "update",
      "Data": `UPDATE lgs_notes_monthly set hedef_soru = '${lesson.hedef_soru}', aylik_hedef_soru = '${lesson.aylik_hedef_soru}' where ogrenci_id = '${ogrenci_id}' and yil = '${date.yil}' and ay = '${date.ay}' and kategori_id = '${lesson.kategori_id}'`,
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
      "Data": `select extract(year from lgs_notes.gun) as yil, extract(month from lgs_notes.gun) as ay, CASE  WHEN extract(month FROM gun) = 1 THEN 'Ocak' WHEN extract(month FROM gun) = 2 THEN 'Şubat' WHEN extract(month FROM gun) = 3 THEN 'Mart' WHEN extract(month FROM gun) = 4 THEN 'Nisan' WHEN extract(month FROM gun) = 5 THEN 'Mayıs' WHEN extract(month FROM gun) = 6 THEN 'Haziran' WHEN extract(month FROM gun) = 7 THEN 'Temmuz'WHEN extract(month FROM gun) = 8 THEN 'Ağustos' WHEN extract(month FROM gun) = 9 THEN 'Eylül' WHEN extract(month FROM gun) = 10 THEN 'Ekim' WHEN extract(month FROM gun) = 11 THEN 'Kasım' WHEN extract(month FROM gun) = 12 THEN 'Aralık' END AS ay_ismi, extract(WEEK from lgs_notes.gun) as hafta, lgs_lessons.ders_adi , lgs_categories.kategori_adi, cast(lgs_categories.kategori_id as text), SUM(dogru_sayisi) as toplam_dogru_sayisi, SUM(cozulen_soru) as toplam_cozulen_soru, (cast(SUM(dogru_sayisi) as double precision) / cast(SUM(cozulen_soru) as double precision)) * 100 as performans from lgs_notes inner join lgs_categories on lgs_categories.kategori_id = lgs_notes.kategori_id inner join lgs_lessons on lgs_lessons.ders_id = lgs_categories.ders_id where ogrenci_id = '4e244573-e07c-46de-82f8-87c321770cc5' group by (yil, ay, hafta, lgs_lessons.ders_adi, lgs_categories.kategori_adi, lgs_categories.kategori_id) order by ders_adi asc`,
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
      "Data": `select lgs_lessons.ders_adi, CASE WHEN SUM(cozulen_soru) = 0 THEN 0  ELSE CAST((CAST(SUM(dogru_sayisi) AS DOUBLE PRECISION) / NULLIF(CAST(SUM(cozulen_soru) AS DOUBLE PRECISION), 0)) * 100 AS NUMERIC(10, 2)) END AS performans, CAST(lgs_lessons.ders_id AS TEXT), SUM(dogru_sayisi) AS toplam_dogru_sayisi, SUM(cozulen_soru) AS toplam_cozulen_soru from lgs_notes INNER JOIN lgs_categories on lgs_categories.kategori_id = lgs_notes.kategori_id INNER JOIN lgs_lessons on lgs_lessons.ders_id = lgs_categories.ders_id where ogrenci_id = '${ogrenci_id}' GROUP by (lgs_lessons.ders_id, lgs_lessons.ders_adi) ORDER by ders_adi ASC;`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }


  getMonthlyPerformByStudentIdAndLessonId(studentId: string, lessonId: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": `select aylik_hedef_soru as toplam_hedef_soru, yil, case WHEN SUM(hedef_soru) = 0 THEN 0 ELSE CAST(CAST(SUM(cozulen_soru) AS double precision) / NULLIF(CAST(SUM(hedef_soru) AS double precision), 0) * 100 AS numeric(10, 2)) END as calisma_performansi, ay, CAST(CAST(SUM(dogru_sayisi) AS double precision) / NULLIF(CAST(SUM(cozulen_soru) AS double precision), 0) * 100 AS numeric(10, 2)) as performans, SUM(cozulen_soru) as toplam_cozulen_soru, SUM(dogru_sayisi) as toplam_dogru_sayisi, SUM(yanlis_sayisi) as toplam_yanlis_sayisi, SUM(cozulen_soru) - (SUM(dogru_sayisi) + SUM(yanlis_sayisi)) as toplam_bos_sayisi from lgs_notes  where ogrenci_id = '${studentId}' and ders_id = '${lessonId}' group by (yil, ay, aylik_hedef_soru) order by ay asc`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getWeeklyPerformByStudentIdAndLessonId(studentId: string, lessonId: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": `select sum(hedef_soru) as toplam_hedef_soru, yil, ROUND((CAST(SUM(cozulen_soru) AS double precision) / NULLIF(CAST(SUM(hedef_soru) AS double precision), 0))::numeric * 100, 0) AS calisma_performansi, ROUND((CAST(SUM(dogru_sayisi) AS double precision) / NULLIF(CAST(SUM(cozulen_soru) AS double precision), 0))::numeric * 100, 0) AS performans, ay, EXTRACT(WEEK FROM gun) AS hafta, sum(cozulen_soru) as toplam_cozulen_soru, SUM(dogru_sayisi) AS toplam_dogru_sayisi, SUM(yanlis_sayisi) AS toplam_yanlis_sayisi, SUM(cozulen_soru) - (SUM(dogru_sayisi) + SUM(yanlis_sayisi)) AS toplam_bos_sayisi from lgs_notes where ogrenci_id = '${studentId}' AND ders_id = '${lessonId}' GROUP by (yil, gun, ay) ORDER by hafta ASC;`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getDailyPerformByStudentIdAndLessonId(studentId: string, lessonId: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": `select SUM(cozulen_soru) - (SUM(dogru_sayisi) + SUM(yanlis_sayisi)) AS toplam_bos_sayisi, ROUND((CAST(SUM(dogru_sayisi) AS double precision) / NULLIF(CAST(SUM(cozulen_soru) AS double precision), 0))::numeric * 100, 0) AS performans, ROUND( case WHEN SUM(hedef_soru) = 0 THEN 0 ELSE (CAST(SUM(cozulen_soru) AS double precision) / NULLIF(CAST(SUM(hedef_soru) AS double precision), 0))::numeric * 100 END, 0 ) AS calisma_performansi, to_char(gun, 'YYYY-MM-DD') AS gun,  SUM(cozulen_soru) AS toplam_cozulen_soru, SUM(dogru_sayisi) AS toplam_dogru_sayisi, SUM(yanlis_sayisi) AS toplam_yanlis_sayisi from lgs_notes where ogrenci_id = '${studentId}' AND ders_id = '${lessonId}' GROUP by (gun) ORDER by gun ASC`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  isUpdated(ogrenciids: string, date: any, dersid: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": `select ll.ders_adi, lgs_notes_monthly.aylik_hedef_soru, cast(ls.ogrenci_id as text), ls.ad , ls.soyad from lgs_notes_monthly INNER JOIN lgs_lessons ll ON lgs_notes_monthly.ders_id = ll.ders_id INNER JOIN lgs_students ls ON ls.ogrenci_id = lgs_notes_monthly.ogrenci_id  WHERE lgs_notes_monthly.ogrenci_id IN (${ogrenciids}) AND yil = '${date.yil}' and ay = '${date.ay}' AND lgs_notes_monthly.ders_id = '${dersid}' GROUP BY ll.ders_adi, lgs_notes_monthly.ders_id, ls.ogrenci_id, ls.ad, ls.soyad, lgs_notes_monthly.aylik_hedef_soru`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  /*
  getWorkPerformance(studentId: string, lessonId: string) {
    //select (CAST(SUM(cozulen_soru) AS double precision) / CAST(SUM(hedef_soru) AS double precision)) * 100 AS calisma_performansi, sum(cozulen_soru) as cozulen_soru , sum(hedef_soru) as gunluk_toplam_hedef_soru, ay from lgs_notes where ogrenci_id = '4e244573-e07c-46de-82f8-87c321770cc5' AND ders_id = '08905570-23ae-4788-82b9-60f05a9ba938' group by(ay)
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": ``,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }*/

  getAllOfGoalsByStudentIdsAndLessonId(studentids: string, lessonid: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.noteDataStoreid,
      "Operation": "read",
      "Data": `WITH temp_sonuclar AS (select cast(ogrenci_id as text), cast(ders_id as text), lnm.aylik_hedef_soru from lgs_notes_monthly lnm where lnm.ogrenci_id IN (${studentids}) and ders_id = '${lessonid}' GROUP by ogrenci_id, ders_id, lnm.aylik_hedef_soru) SELECT ogrenci_id, ders_id, sum(aylik_hedef_soru) FROM temp_sonuclar group by ogrenci_id, ders_id`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

}

