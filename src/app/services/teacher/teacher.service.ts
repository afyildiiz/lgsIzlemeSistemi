import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Endpoints } from 'src/app/constants/Endpoints';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private authService: AuthService,
    private http: HttpClient) { }

  token = this.authService.getToken();

  insertTeacher(okul_id: string, ad: string, soyad: string, brans: string, e_posta: string, sifre: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.teacherDataStoreid,
      "Operation": "insert",
      "Data": `insert into lgs_teachers (okul_id, ad, soyad, brans, e_posta, sifre) values('${okul_id}', '${ad}', '${soyad}', '${brans}', '${e_posta}', '${sifre}')`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  insertTeachers(teachers: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.teacherDataStoreid,
      "Operation": "insert",
      "Data": `insert into lgs_teachers (okul_id, ad, soyad, brans, e_posta, sifre) values ${teachers}`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  updateTeacher(teacher: any) { //sonradan any türünü düzelt
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.teacherDataStoreid,
      "Operation": "update",
      "Data": `update lgs_teachers set ad='${teacher.ad}', soyad='${teacher.soyad}', brans='${teacher.brans}', sifre='${teacher.sifre}' where id='${teacher.id}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response
      })
    );
  }

  deleteTeacher(teacher: any) { //sonradan any türünü düzelt
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.teacherDataStoreid,
      "Operation": "update",
      "Data": `delete from lgs_teachers where id='${teacher.id}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response
      })
    );
  }

  getTeacherByMail(e_posta: string, sifre: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.teacherDataStoreid,
      "Operation": "read",
      "Data": `select ad, soyad, brans, e_posta, sifre, cast(id as text) from lgs_teachers where e_posta='${e_posta}' and sifre='${sifre}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getTeacherBySchoolId(schoolId: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.teacherDataStoreid,
      "Operation": "read",
      "Data": `select ad, soyad, brans, e_posta, sifre, cast(id as text) from lgs_teachers where okul_id='${schoolId}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  isThere(e_posta: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.teacherDataStoreid,
      "Operation": "read",
      "Data": `select count(e_posta) from lgs_teachers where e_posta='${e_posta}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message[0]
      })
    );
  }

  getTeacherById(id: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.teacherDataStoreid,
      "Operation": "read",
      "Data": `select ad, soyad, brans, e_posta, sifre, cast(id as text) from lgs_teachers where id = '${id}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getTeacherIdByMail(mail: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.teacherDataStoreid,
      "Operation": "read",
      "Data": `select e_posta from lgs_teachers where e_posta in(${mail})`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }
}
