import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Endpoints } from 'src/app/constants/Endpoints';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  token = this.authService.getToken();

  getSchoolsByDistrict(il_kodu: any, ilce_kodu: any) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.schooldataStoreid,
      "Operation": "read",
      "Data": `select il_kodu, ilce_kodu, okul_adi, okul_website, cast(okul_id as text) from lgs_schools where il_kodu='${il_kodu}' and ilce_kodu='${ilce_kodu}' and admin_e_posta is null`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response
      })
    );
  }

  insertSchool(e_posta: string, password: string, phone: string, okul_id: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.schooldataStoreid,
      "Operation": "update",
      "Data": `update lgs_schools set admin_e_posta='${e_posta}', admin_sifre='${password}', telefon='${phone}' where okul_id='${okul_id}'`,
      "Encrypted": "1951"
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response
      })
    );
  }

  getSchoolByMail(e_posta: string, sifre: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.schooldataStoreid,
      "Operation": "read",
      "Data": `select il_kodu, ilce_kodu, okul_adi, okul_website, telefon, cast(okul_id as text), admin_e_posta, admin_sifre from lgs_schools where admin_e_posta='${e_posta}' and admin_sifre='${sifre}' `,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  updateSchool(school: any) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.schooldataStoreid,
      "Operation": "update",
      "Data": `update lgs_schools set okul_adi='${school.ad}', okul_website='${school.website}', telefon='${school.telefon}', admin_e_posta='${school.e_posta}', admin_sifre='${school.sifre}' where okul_id='${school.okul_id}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  getSchoolIdByMail(mail: string) {
    const body = {
      "Token": this.token,
      "DataStoreId": Endpoints.schooldataStoreid,
      "Operation": "read",
      "Data": `select cast(okul_id as text) from lgs_schools where admin_e_posta='${mail}'`,
      "Encrypted": "1951",
    }
    return this.http.post(Endpoints.dataops, body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }
}
