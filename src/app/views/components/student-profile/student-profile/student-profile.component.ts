import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { StudentService } from 'src/app/services/student/student.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent {

  myForm!: FormGroup;
  @Input() currentStudent: any;

  constructor(
    private studentService: StudentService,
    private toastService: ToastService,
    private fb: FormBuilder) { }

  ngOnInit() {
    if (!this.currentStudent) {
      let student = localStorage.getItem('currentStudent');
      this.currentStudent = student ? JSON.parse(student) : {};
    }

    this.myForm = this.fb.group({
      ad: [this.currentStudent.ad, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      soyad: [this.currentStudent.soyad, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      sifre: [this.currentStudent.sifre, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      veli_ad: [this.currentStudent.veli_ad, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      veli_soyad: [this.currentStudent.veli_soyad, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      veli_tc: [this.currentStudent.veli_tc, [Validators.required]], // tc pattern yok düzenle
    })
    this.myForm.disable();
  }

  onSelectChange(event: any) {
    if (event.target.checked)
      this.myForm.enable();
    else
      this.myForm.disable();
  }

  saveChanges() {
    if (this.myForm.valid) {
      let ogrenci_numarasi = this.currentStudent.ogrenci_numarasi
      this.myForm.value.ogrenci_numarasi = ogrenci_numarasi;
      this.studentService.updateStudent(this.myForm.value).subscribe(res => {
        if (res.message == 'Success')
          this.getStudent()
      });
    } else {
      this.toastService.showToast('warning', 'Form verileri geçerli değil.');
    }
  }


  getStudent() {
    let id = this.currentStudent.ogrenci_id
    let newStudent: any
    this.studentService.getStudentById(id).pipe(
      tap(res => newStudent = res[0])
    ).subscribe(() => {
      console.log(this.currentStudent)
      console.log(newStudent)
      this.currentStudent = newStudent
      localStorage.setItem('currentStudent', JSON.stringify(newStudent))
    })
  }
}
