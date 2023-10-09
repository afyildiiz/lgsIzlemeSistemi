import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent {

  @Input() student: any

  ngOnInit() {
    console.log(this.student)
  }
}
