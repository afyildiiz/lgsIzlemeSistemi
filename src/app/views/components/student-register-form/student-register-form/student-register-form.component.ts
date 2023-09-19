import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student-register-form',
  templateUrl: './student-register-form.component.html',
  styleUrls: ['./student-register-form.component.css']
})
export class StudentRegisterFormComponent {

  @Input() data: any;

  getData(event: any) {
    this.data = event
  }

}
