import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  myForm!: FormGroup;
  @Input() currentTeacher: any;

  constructor(private teacherService: TeacherService,
    private toastService: ToastService,
    private fb: FormBuilder) { }

  ngOnInit() {
    if (!this.currentTeacher) {
      let teacher = localStorage.getItem('currentTeacher');
      this.currentTeacher = teacher ? JSON.parse(teacher) : {};
    }
    this.myForm = this.fb.group({
      ad: [this.currentTeacher.ad, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      soyad: [this.currentTeacher.soyad, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      sifre: [this.currentTeacher.sifre, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      brans: [this.currentTeacher.brans, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
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
      this.teacherService.updateTeacher({ ad: this.myForm.value.ad, soyad: this.myForm.value.soyad, sifre: this.myForm.value.sifre, brans: this.myForm.value.brans, id: this.currentTeacher.id })
        .subscribe(res => {
          if (res.message == 'Success')
            this.getTeacher()
        });
    } else {
      this.toastService.showToast('warning', 'Form verileri geçerli değil.');
    }
  }

  getTeacher() {
    let id = this.currentTeacher.id
    let newTeacher: any
    this.teacherService.getTeacherById(id).pipe(
      tap(res => newTeacher = res[0])
    ).subscribe(() => {
      console.log(this.currentTeacher)
      console.log(newTeacher)
      this.currentTeacher = newTeacher
      localStorage.setItem('currentTeacher', JSON.stringify(newTeacher))
    })
  }
}
