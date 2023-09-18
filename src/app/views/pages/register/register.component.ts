import { Component, ViewChild } from '@angular/core';
import { NbDialogRef, NbStepperComponent } from '@nebular/theme';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private toastService: ToastService) { }

  @ViewChild('stepper') stepper!: NbStepperComponent;
  @ViewChild(RegisterFormComponent) registerFormComponent!: RegisterFormComponent;
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
    let logDatas = this.registerFormComponent.onSubmit();
    if (logDatas != false) {
      this.toastService.showToast('success', 'Okul kayıt işlemi başarılı.');
    } else {
      this.toastService.showToast('warning', 'Okul kayıt işlemi yapılırken bir hata ile karşılaşıldı.');
    }
  }

}
