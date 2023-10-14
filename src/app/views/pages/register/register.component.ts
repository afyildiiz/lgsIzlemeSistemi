import { Component, ViewChild } from '@angular/core';
import { NbStepperComponent } from '@nebular/theme';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TeacherRegisterFormComponent } from '../../components/teacher-register-form/teacher-register-form/teacher-register-form.component';
import { StudentRegisterFormComponent } from '../../components/student-register-form/student-register-form/student-register-form.component';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { StudentService } from 'src/app/services/student/student.service';
import { SchoolService } from 'src/app/services/school/school.service';
import { Observable, forkJoin, map, tap } from 'rxjs';

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

  schoolDatas: any;
  teacherDatas: any;
  studentDatas: any;
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

      this.insertSchool(formValues, school, students, teachers)

    } else {
      this.toastService.showToast('warning', 'Form verileri geçerli değil.');
    }
  }

  insertSchool(formValues: any, school: any, students: any, teachers: any) {
    this.schoolService.getSchoolIdByMail(`'${formValues.e_posta}'`).subscribe(res => {
      if (res.length)
        return
      else
        this.teacherService.getTeacherIdByMail(`'${formValues.e_posta}'`).subscribe(res => {
          if (res.length)
            return
          else
            this.studentService.getStudentIdByMail(`'${formValues.e_posta}'`).subscribe(res => {
              if (res.length)
                return
              else
                this.schoolService.insertSchool(formValues.e_posta, formValues.password
                  , formValues.phone, school.okul_id).pipe(
                    tap(res => {
                      if (res == 'Success')
                        this.toastService.showToast('success', 'Okul kaydı eklendi.')
                    }),
                    tap(() => this.insertTeacher(teachers, school)),
                    tap(() => this.insertStudent(students, school)),
                  ).subscribe();
            })
        })
    })
  }

  insertTeacher(teachers: any, school: any) {
    let mails = teachers.map((teacher: any) => `'${teacher.E_Posta}'`).join(',')
    let notAlloweds: any[] = []
    let willAdded: any[] = []
    this.teacherService.getTeacherIdByMail(mails).pipe(
      tap(res => {
        if (res.length)
          notAlloweds = res
        this.studentService.getStudentIdByMail(mails).subscribe(res => {
          if (res.length)
            notAlloweds = [...notAlloweds, ...res]
          this.schoolService.getSchoolIdByMail(mails).subscribe(res => {
            if (res.length)
              notAlloweds = [...notAlloweds, ...res]
          })
        })
      })
    ).subscribe(() => {
      let e_mails = notAlloweds.map(nA => nA.e_posta)
      willAdded = teachers.filter((teacher: any) => !e_mails.includes(teacher.E_Posta))

      let query: string = ''
      let count: number = 0
      teachers.map((teacher: any) => {
        willAdded.map((added: any) => {
          if (added.E_Posta == teacher.E_Posta) {
            count += 1
            if (count > 1)
              query += ','
            query += `('${school.okul_id}', '${teacher.Ad}', '${teacher.Soyad}', '${teacher.Brans}', '${teacher.E_Posta}', '${teacher.Sifre}')`
          }
        })
      })

      if (query.length) {
        this.teacherService.insertTeachers(query).subscribe(res => console.log(res))
      }
      notAlloweds.map(na => console.log(na))
      notAlloweds.map(na => this.toastService.showToast('warning', na + ' bu eposta ile daha önce bir kayıt oluşturulmuş.'))
    })
  }

  insertStudent(students: any, school: any) {
    let mails = students.map((student: any) => `'${student.E_Posta}'`).join(',')
    let notAlloweds: any[] = []
    let willAdded: any[] = []
    this.studentService.getStudentIdByMail(mails).pipe(
      tap(res => {
        if (res.length) {
          notAlloweds = res
        }
        this.teacherService.getTeacherIdByMail(mails).subscribe(res => {
          if (res.length) {
            notAlloweds = [...notAlloweds, ...res]
          }
          this.schoolService.getSchoolIdByMail(mails).subscribe(res => {
            if (res.length) {
              notAlloweds = [...notAlloweds, ...res]
            }
          })
        })
      })
    ).subscribe(() => {

      let emails = notAlloweds.map(nA => nA.e_posta)
      willAdded = students.filter((student: any) => !emails.includes(student.E_Posta))

      let query: string = ''
      let count: number = 0
      students.map((student: any) => {
        willAdded.map((added: any) => {
          if (added.E_Posta == student.E_Posta) {
            count += 1
            if (count > 1)
              query += ','
            query += `('${school.okul_id}', '${student.Numara}', '${student.Ad}', '${student.Soyad}', '${student.E_Posta}', '${student.Sifre}', '${student.VeliAd}', '${student.VeliSoyad}', '${student.VeliTcKimlikNo}')`
          }
        })
      })

      if (query.length) {
        this.studentService.insertStudents(query).subscribe(res => console.log(res))
      }

      notAlloweds.map(na => this.toastService.showToast('warning', na + ' bu eposta ile daha önce bir kayıt oluşturulmuş.'))
    })
  }

  /*
    insertSchool(formValues: any, school: any, students: any, teachers: any) {
      this.checkIfEmailExists(`'${formValues.e_posta}'`).subscribe(emailExists => {
        if (emailExists) {
          this.toastService.showToast('warning', 'Admin e-postası ile bir kayıt bulunuyor.')
          return
        } else {
          this.insertSchoolData(formValues, school)
          this.insertTeachers(teachers, school)
          this.insertStudents(students, school)
        }
      });
    }
  
    checkIfEmailExists(email: string): Observable<boolean> {
      const schoolExists = this.schoolService.getSchoolIdByMail(email).pipe(map(res => res.length > 0))
      const teacherExists = this.teacherService.getTeacherIdByMail(email).pipe(map(res => res.length > 0))
      const studentExists = this.studentService.getStudentIdByMail(email).pipe(map(res => res.length > 0))
  
      return forkJoin([schoolExists, teacherExists, studentExists]).pipe(
        map(([schoolExists, teacherExists, studentExists]) => schoolExists || teacherExists || studentExists)
      )
    }
  
    insertSchoolData(formValues: any, school: any) {
      this.schoolService.insertSchool(formValues.e_posta, formValues.password, formValues.phone, school.okul_id).subscribe(res => {
        if (res === 'Success') {
          this.toastService.showToast('success', 'Okul kaydı eklendi.')
        }
      })
    }
  
    insertTeachers(teachers: any, school: any) {
      let mails = teachers.map((teacher: any) => `'${teacher.E_Posta}'`).join(',')
      this.checkIfEmailExists(mails).subscribe(res => console.log(res))
    }
  
    insertStudents(students: any, school: any) {
      let mails = students.map((student: any) => `'${student.E_Posta}'`).join(',')
      this.checkIfEmailExists(mails).subscribe(res => console.log(res))
    }
  */
}
