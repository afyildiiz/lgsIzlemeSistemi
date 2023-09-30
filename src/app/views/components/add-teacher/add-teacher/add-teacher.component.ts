import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { tap } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent {

  constructor(private fb: FormBuilder,
    private teacherService: TeacherService,
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
      brans: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      sifre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
    })
  }

  isValid() {
    let email = this.myForm.value.email;
    this.teacherService.isThere(email).pipe(
      tap(res => this.isThere = res),
    ).subscribe(() => this.query());
  }

  query() {
    if (this.isThere.count == 0) {
      let formValues = this.myForm.value;
      this.teacherService.insertTeacher(JSON.parse(this.currentSchool).okul_id, formValues.ad, formValues.soyad,
        formValues.brans, formValues.email, formValues.sifre).subscribe(res => {
          if (res == 'Success') {
            this.toastService.showToast('success', 'Öğretmen kaydı başarıyla oluşturuldu.');
            this.router.navigate(['/school']);
          } else {
            this.toastService.showToast('warning', 'Öğretmen kaydı oluşturulurken bir hatayla karşılaşıldı.');
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
