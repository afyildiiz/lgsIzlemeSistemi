import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolService } from 'src/app/services/school/school.service';
import { StudentService } from 'src/app/services/student/student.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { tap } from 'rxjs'
@Component({
  selector: 'app-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrls: ['./school-profile.component.css']
})
export class SchoolProfileComponent {

  myForm!: FormGroup;
  schoolAdmin: any;

  constructor(
    private teacherService: TeacherService,
    private studentService: StudentService,
    private schoolService: SchoolService,
    private toastService: ToastService,
    private fb: FormBuilder) { }

  ngOnInit() {
    let school = localStorage.getItem('schoolAdmin');
    this.schoolAdmin = school ? JSON.parse(school) : {};

    this.myForm = this.fb.group({
      ad: [this.schoolAdmin.okul_adi, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      website: [this.schoolAdmin.okul_website, [Validators.required, Validators.minLength(9), Validators.maxLength(50)]],
      telefon: [this.schoolAdmin.telefon],
      e_posta: [this.schoolAdmin.admin_e_posta, [Validators.required, Validators.email]],
      sifre: [this.schoolAdmin.admin_sifre, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
    })
    this.myForm.disable();
  }

  onSelectChange(event: any) {
    if (event.target.checked)
      this.myForm.enable();
    else
      this.myForm.disable();
  }

  getSchool() {
    let mail = this.schoolAdmin.admin_e_posta
    let sifre = this.schoolAdmin.admin_sifre

    let newSchool: any
    this.schoolService.getSchoolByMail(mail, sifre).pipe(
      tap(res => newSchool = res[0])
    ).subscribe(() => {
      console.log(this.schoolAdmin)
      this.schoolAdmin = newSchool
      localStorage.setItem('schoolAdmin', JSON.stringify(newSchool))
    })
  }

  saveChanges() {
    if (this.myForm.valid) {
      this.myForm.value.okul_id = this.schoolAdmin.okul_id;
      this.schoolService.updateSchool(this.myForm.value).subscribe(res => {
        if (res == 'Success') {
          this.toastService.showToast('success', 'Değişiklikleriniz kaydedildi.')
          this.getSchool()
        }
      });
    } else {
      this.toastService.showToast('warning', 'Form verileri geçerli değil.');
    }
  }

}
