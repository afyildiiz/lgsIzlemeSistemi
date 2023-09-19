import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-teacher-register-form',
  templateUrl: './teacher-register-form.component.html',
  styleUrls: ['./teacher-register-form.component.css']
})
export class TeacherRegisterFormComponent {

  @Input() data: any;

  getData(event: any) {
    this.data = event
  }

}

