import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Endpoints } from 'src/app/constants/Endpoints';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private authService: AuthService,
    private http: HttpClient) { }

  token = this.authService.getToken();

  getStudents() {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.studentDataStoreid,
      "Operation": "read",
      "Data": `select ogrenci_numarasi, ad, soyad, e_posta, sifre, veli_ad, veli_soyad, veli_tc from lgs_students`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  insertStudent(okul_id: string, ad: string, soyad: string, numara: string, e_posta: string, sifre: string, veliAd: string, veliSoyad: string, veliTckimlikNo: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.studentDataStoreid,
      "Operation": "insert",
      "Data": `insert into lgs_students (okul_id, ogrenci_numarasi, ad, soyad, e_posta, sifre, veli_ad, veli_soyad, veli_tc) values('${okul_id}', '${numara}', '${ad}', '${soyad}', '${e_posta}', '${sifre}', '${veliAd}', '${veliSoyad}', '${veliTckimlikNo}')`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response
      })
    );
  }

  updateStudent(student: any) { //sonradan any türünü düzelt
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.studentDataStoreid,
      "Operation": "update",
      "Data": `update lgs_students set ad='${student.ad}', soyad='${student.soyad}', ogrenci_numarasi='${student.ogrenci_numarasi}', sifre='${student.sifre}', veli_ad='${student.veli_ad}', veli_soyad='${student.veli_soyad}', veli_tc='${student.veli_tc}' where ogrenci_numarasi='${student.ogrenci_numarasi}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response
      })
    );
  }

  deleteStudent(student: any) { //sonradan any türünü düzelt
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.studentDataStoreid,
      "Operation": "update",
      "Data": `delete from lgs_students where id='${student.ogrenci_numarasi}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response
      })
    );
  }

  getStudentByMail(e_posta: string, sifre: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.studentDataStoreid,
      "Operation": "read",
      "Data": `select ad, soyad, ogrenci_numarasi, veli_ad, veli_soyad, veli_tc, e_posta, sifre from lgs_students where e_posta='${e_posta}' and sifre='${sifre}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getStudentsByTeacherId(teacher_id: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.studentDataStoreid,
      "Operation": "read",
      "Data": `select ad, soyad, ogrenci_numarasi, veli_ad, veli_soyad, veli_tc, e_posta, sifre from lgs_students where teacher_id='${teacher_id}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getStudentsBySchoolId(schoolId: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.studentDataStoreid,
      "Operation": "read",
      "Data": `select ad, soyad, ogrenci_numarasi, veli_ad, veli_soyad, veli_tc, e_posta, sifre from lgs_students where okul_id='${schoolId}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  setTeacher(teacher_id: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.studentDataStoreid,
      "Operation": "update",
      "Data": `update from lgs_students set teacher_id='${teacher_id}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }
}
