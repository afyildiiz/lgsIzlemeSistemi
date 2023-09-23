import { Component, ViewChild } from '@angular/core';
import { NbStepperComponent } from '@nebular/theme';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TeacherRegisterFormComponent } from '../../components/teacher-register-form/teacher-register-form/teacher-register-form.component';
import { StudentRegisterFormComponent } from '../../components/student-register-form/student-register-form/student-register-form.component';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { StudentService } from 'src/app/services/student/student.service';
import { SchoolService } from 'src/app/services/school/school.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private toastService: ToastService,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private schoolService: SchoolService,
    private router: Router) { }

  @ViewChild('stepper') stepper!: NbStepperComponent;
  @ViewChild(RegisterFormComponent) registerFormComponent!: RegisterFormComponent;
  @ViewChild(TeacherRegisterFormComponent) teacherRegisterFormComponent!: TeacherRegisterFormComponent;
  @ViewChild(StudentRegisterFormComponent) studentRegisterFormComponent!: StudentRegisterFormComponent;


  stepperIndex: number = 0;

  stepperChange(event: any) {
    this.stepperIndex = event.index;
  }

  previousStep() {
    this.stepper.previous();
  }

  nextStep() {
    this.stepper.next();
  }

  schoolDatas: any;
  teacherDatas: any;
  studentDatas: any;

  register() {

    this.schoolDatas = this.registerFormComponent.onSubmit();
    this.teacherDatas = this.teacherRegisterFormComponent.data;
    this.studentDatas = this.studentRegisterFormComponent.data;

    if (this.schoolDatas != false) {
      let teachers = this.teacherDatas[0].data.map((e: any) => e);
      let students = this.studentDatas[0].data.map((e: any) => e);
      let formValues = this.schoolDatas.formValues;
      let school = this.schoolDatas.school;

      this.schoolService.insertSchool(formValues.e_posta, formValues.password
        , formValues.phone, school.okul_id).pipe(
          tap(() => this.insertTeacher(teachers, school)),
          tap(() => this.insertStudent(students, school))
        ).subscribe(() => console.log('Bitti'));

    } else {
      this.toastService.showToast('warning', 'Form verileri geçerli değil.');
    }
  }

  insertTeacher(teachers: any, school: any) {
    teachers.map((teacher: any) => {
      console.log(teacher);
      this.teacherService.insertTeacher(school.okul_id, teacher.Ad, teacher.Soyad, teacher.Brans, teacher.E_Posta, teacher.Sifre).subscribe(res => console.log(res))
    })
  }

  insertStudent(students: any, school: any) {
    students.map((student: any) => {
      console.log(student);
      this.studentService.insertStudent(school.okul_id, student.Ad, student.Soyad, student.Numara, student.E_Posta, student.Sifre, student.VeliAd, student.VeliSoyad,
        student.VeliTcKimlikNo).subscribe(res => console.log(res))
    })
  }

}
