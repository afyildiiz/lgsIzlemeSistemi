import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { StudentService } from 'src/app/services/student/student.service';
import { ToastService } from 'src/app/services/toast/toast.service';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {

  constructor(private fb: FormBuilder,
    private studentService: StudentService,
    private toastService: ToastService,
    private router: Router) { }

  myForm!: FormGroup;
  currentSchool: any;
  isThere: any;

  ngOnInit() {
    this.currentSchool = localStorage.getItem('schoolAdmin');

    this.myForm = this.fb.group({
      ad: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/)]],
      soyad: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      sifre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      ogrenci_no: ['', [Validators.required, Validators.maxLength(5), Validators.pattern(/^[0-9]*$/)]],
      veli_ad: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/)]],
      veli_soyad: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/)]],
      veli_tc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
    })
  }

  isValid() {
    let email = this.myForm.value.email;
    this.studentService.isThere(email).pipe(
      tap(res => this.isThere = res),
    ).subscribe(() => this.query());
  }

  query() {
    if (this.isThere.count == 0) {
      let formValues = this.myForm.value;
      this.studentService.insertStudent(JSON.parse(this.currentSchool).okul_id, formValues.ad, formValues.soyad,
        formValues.ogrenci_no, formValues.email, formValues.sifre, formValues.veli_ad, formValues.veli_soyad, formValues.veli_tc)
        .subscribe(res => {
          if (res == 'Success') {
            this.toastService.showToast('success', 'Öğrenci kaydı başarıyla oluşturuldu.');
            this.router.navigate(['/school']);
          } else {
            this.toastService.showToast('warning', 'Öğrenci kaydı oluşturulurken bir hatayla karşılaşıldı.');
          }
        });
    } else {
      this.toastService.showToast('danger', 'Bu e-mail adresiyle oluşturulmuş bir kayıt bulunuyor.')
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.isValid();
    }
    else
      console.log(this.myForm.value)
  }

}
