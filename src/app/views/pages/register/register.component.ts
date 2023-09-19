import { Component, ViewChild } from '@angular/core';
import { NbStepperComponent } from '@nebular/theme';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TeacherRegisterFormComponent } from '../../components/teacher-register-form/teacher-register-form/teacher-register-form.component';
import { StudentRegisterFormComponent } from '../../components/student-register-form/student-register-form/student-register-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private toastService: ToastService,
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

  register() {
    let schoolDatas = this.registerFormComponent.onSubmit();
    let teacherDatas = this.teacherRegisterFormComponent.data;
    let studentDatas = this.studentRegisterFormComponent.data;

    if (schoolDatas != false) {
      console.log(schoolDatas)
      console.log(teacherDatas)
      console.log(studentDatas)

    } else {
      this.toastService.showToast('warning', 'kayıt işlemi yapılırken bir hata ile karşılaşıldı.');
    }
  }

}
