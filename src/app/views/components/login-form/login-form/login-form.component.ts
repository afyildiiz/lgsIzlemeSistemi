import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SchoolService } from 'src/app/services/school/school.service';
import { StudentService } from 'src/app/services/student/student.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  constructor(private fb: FormBuilder,
    private toastService: ToastService,
    private schoolService: SchoolService,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private authService: AuthService,
    private router: Router) { }

  loginForm!: FormGroup;
  path: string = '';

  ngOnInit() {
    this.path = history.state.path;

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      switch (this.path) {
        case 'teacher':
          this.teacherService.getTeacherByMail(this.loginForm.value.email, this.loginForm.value.password)
            .subscribe(res => {
              if (res.length) {
                this.authService.login();
                localStorage.setItem('currentTeacher', JSON.stringify(res[0]));
                setTimeout(() => this.router.navigate(['/teacher/profile'], { state: { teacher: res[0] } }), 500);
              }
              else
                this.toastService.showToast('danger', 'Giriş bilgileri yanlış.');
            });
          break;
        case 'student':
          this.studentService.getStudentByMail(this.loginForm.value.email, this.loginForm.value.password)
            .subscribe(res => {
              if (res.length) {
                this.authService.login();
                localStorage.setItem('currentStudent', JSON.stringify(res[0]));
                setTimeout(() => this.router.navigate(['student/lessons'], { state: { student: res[0] } }), 500);
              }
              else
                this.toastService.showToast('danger', 'Giriş bilgileri yanlış.');
            });
          break;
        case 'admin':
          this.schoolService.getSchoolByMail(this.loginForm.value.email, this.loginForm.value.password)
            .subscribe(res => {
              if (res.length) {
                this.authService.login();
                localStorage.setItem('schoolAdmin', JSON.stringify(res[0]));
                setTimeout(() => this.router.navigate(['school'], { state: { school: res[0] } }), 500);
              }
              else
                this.toastService.showToast('danger', 'Giriş bilgileri yanlış.');
            });
          break;
      }
    } else {
      this.toastService.showToast('danger', 'Form verileri geçerli değil.');
    }
  }
}
