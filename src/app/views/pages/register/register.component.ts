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
import { filter, from, map, mergeMap, of, switchMap, tap, toArray } from 'rxjs';

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
    private schoolService: SchoolService) { }

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
    let teachers: any
    let students: any

    if (this.schoolDatas != false) {
      if (this.teacherDatas.length) {
        teachers = this.teacherDatas[0].data.map((e: any) => e)
      }
      if (this.studentDatas.length) {
        students = this.studentDatas[0].data.map((e: any) => e)
      }
      let formValues = this.schoolDatas.formValues;
      let school = this.schoolDatas.school;

      //this.insertSchool(formValues, school, students, teachers)

      this.insertTeacher(teachers, school)

    } else {
      this.toastService.showToast('warning', 'Form verileri geçerli değil.');
    }
  }

  insertSchool(formValues: any, school: any, students: any, teachers: any) {
    this.schoolService.getSchoolIdByMail(formValues.e_posta).subscribe(res => {
      if (res.length)
        return
      else
        this.teacherService.getTeacherIdByMail(formValues.e_posta).subscribe(res => {
          if (res.length)
            return
          else
            this.studentService.getStudentIdByMail(formValues.e_posta).subscribe(res => {
              if (res.length)
                return
              else
                this.schoolService.insertSchool(formValues.e_posta, formValues.password
                  , formValues.phone, school.okul_id).pipe(
                    tap(res => {
                      if (res == 'Success')
                        this.toastService.showToast('success', 'Okul kaydı eklendi.')
                    }),
                    //tap(() => this.insertStudent(students, school)),
                    tap(() => this.insertTeacher(teachers, school)),
                  ).subscribe();
            })
        })
    })
  }

  insertTeacher(teachers: any, school: any) {
    teachers.map((teacher: any) => {
      if (teacher.E_posta && teacher.Sifre)
        this.teacherService.getTeacherIdByMail(teacher.E_Posta).subscribe(res => {
          if (res.length)
            return
          else
            this.studentService.getStudentIdByMail(teacher.E_Posta).subscribe(res => {
              if (res.length)
                return
              else
                this.schoolService.getSchoolIdByMail(teacher.E_posta).subscribe(res => {
                  if (res.length)
                    return
                  else
                    this.teacherService.insertTeacher(school.okul_id, teacher.Ad, teacher.Soyad, teacher.Brans, teacher.E_Posta, teacher.Sifre).subscribe(res => console.log(res))
                })
            })
        })
    })
  }

  insertStudent(students: any, school: any) {
    students.map((student: any) => {
      if (student.E_Posta && student.Sifre)
        this.studentService.getStudentIdByMail(student.E_Posta).subscribe(res => {
          if (res.length)
            return
          else
            this.teacherService.getTeacherIdByMail(student.E_Posta).subscribe(res => {
              if (res.length)
                return
              else
                this.schoolService.getSchoolIdByMail(student.E_Posta).subscribe(res => {
                  if (res.length)
                    return
                  else
                    this.studentService.insertStudent(school.okul_id, student.Ad, student.Soyad, student.Numara, student.E_Posta, student.Sifre, student.VeliAd, student.VeliSoyad,
                      student.VeliTcKimlikNo).subscribe(res => console.log(res))
                })
            })
        })
    })
  }


  /*
    insertSchool(formValues: any, school: any, students: any, teachers: any) {
      this.schoolService.getSchoolIdByMail(formValues.e_posta).pipe(
        filter(schoolId => schoolId.length === 0),
        switchMap(() => this.teacherService.getTeacherIdByMail(formValues.e_posta)),
        filter(teacherId => teacherId.length === 0),
        switchMap(() => this.studentService.getStudentIdByMail(formValues.e_posta)),
        filter(studentId => studentId.length === 0),
        switchMap(() => this.schoolService.insertSchool(
          formValues.e_posta, formValues.password, formValues.phone, school.okul_id
        )),
        tap(res => {
          if (res === 'Success') {
            this.toastService.showToast('success', 'Okul kaydı eklendi.');
            this.insertStudent(students, school);
            this.insertTeacher(teachers, school);
          }
        })
      ).subscribe();
    }
    
    insertTeacher(teachers: any, school: any) {
      from(teachers).pipe(
        mergeMap((teacher: any) => {
          if (teacher.E_posta && teacher.Sifre) {
            return this.teacherService.getTeacherIdByMail(teacher.E_Posta).pipe(
              filter(teacherId => teacherId.length === 0),
              switchMap(() => this.studentService.getStudentIdByMail(teacher.E_Posta)),
              filter(studentId => studentId.length === 0),
              switchMap(() => this.schoolService.getSchoolIdByMail(teacher.E_posta)),
              filter(schoolId => schoolId.length === 0),
              switchMap(() => this.teacherService.insertTeacher(school.okul_id, teacher.Ad, teacher.Soyad, teacher.Brans, teacher.E_Posta, teacher.Sifre)),
              map(() => 'Success')
            );
          }
          return of('Skipped');
        }),
        toArray()
      ).subscribe(results => {
        console.log(results);
      });
    }
    
    insertStudent(students: any, school: any) {
      from(students).pipe(
        mergeMap((student: any) => {
          if (student.E_Posta && student.Sifre) {
            return this.studentService.getStudentIdByMail(student.E_Posta).pipe(
              filter(studentId => studentId.length === 0),
              switchMap(() => this.teacherService.getTeacherIdByMail(student.E_Posta)),
              filter(teacherId => teacherId.length === 0),
              switchMap(() => this.schoolService.getSchoolIdByMail(student.E_Posta)),
              filter(schoolId => schoolId.length === 0),
              switchMap(() => this.studentService.insertStudent(
                school.okul_id, student.Ad, student.Soyad, student.Numara, student.E_Posta, student.Sifre, student.VeliAd, student.VeliSoyad,
                student.VeliTcKimlikNo
              )),
              map(() => 'Success')
            );
          }
          return of('Skipped');
        }),
        toArray()
      ).subscribe(results => {
        console.log(results);
      });
    }*/













  /*
    insertSchool(formValues: any, school: any, students: any, teachers: any) {
      this.schoolService.getSchoolIdByMail(formValues.e_posta).pipe(
        filter(schoolId => schoolId.length === 0),
        switchMap(() => this.teacherService.getTeacherIdByMail(formValues.e_posta)),
        filter(teacherId => teacherId.length === 0),
        switchMap(() => this.studentService.getStudentIdByMail(formValues.e_posta)),
        filter(studentId => studentId.length === 0),
        switchMap(() => this.schoolService.insertSchool(
          formValues.e_posta, formValues.password, formValues.phone, school.okul_id
        )),
        tap(res => {
          if (res === 'Success') {
            this.toastService.showToast('success', 'Okul kaydı eklendi.');
             this.insertStudent(students, school);
            this.insertTeacher(teachers, school);
          }
        })
      ).subscribe();
    }
  
    async insertTeacher(teachers: any, school: any) {
      const results = await from(teachers).pipe(
        mergeMap((teacher: any) => {
          if (teacher.E_posta && teacher.Sifre) {
            return this.teacherService.getTeacherIdByMail(teacher.E_Posta).pipe(
              filter(teacherId => teacherId.length === 0),
              switchMap(() => this.studentService.getStudentIdByMail(teacher.E_Posta)),
              filter(studentId => studentId.length === 0),
              switchMap(() => this.schoolService.getSchoolIdByMail(teacher.E_posta)),
              filter(schoolId => schoolId.length === 0),
              switchMap(() => this.teacherService.insertTeacher(school.okul_id, teacher.Ad, teacher.Soyad, teacher.Brans, teacher.E_Posta, teacher.Sifre)),
              map(() => 'Success') // Instead of returning null, return a success message
            );
          }
          return of('Skipped'); // Return a message for skipped teachers
        }),
        toArray()
      ).toPromise();
      console.log(results);
    }
  
    async insertStudent(students: any, school: any) {
      const results = await from(students).pipe(
        mergeMap((student: any) => {
          if (student.E_Posta && student.Sifre) {
            return this.studentService.getStudentIdByMail(student.E_Posta).pipe(
              filter(studentId => studentId.length === 0),
              switchMap(() => this.teacherService.getTeacherIdByMail(student.E_Posta)),
              filter(teacherId => teacherId.length === 0),
              switchMap(() => this.schoolService.getSchoolIdByMail(student.E_Posta)),
              filter(schoolId => schoolId.length === 0),
              switchMap(() => this.studentService.insertStudent(
                school.okul_id, student.Ad, student.Soyad, student.Numara,
                student.E_Posta, student.Sifre, student.VeliAd, student.VeliSoyad,
                student.VeliTcKimlikNo
              )),
              map(() => 'Success')
            );
          }
          return of('Skipped');
        }),
        toArray()
      ).toPromise();
  
      console.log(results);
    }
  */
}
