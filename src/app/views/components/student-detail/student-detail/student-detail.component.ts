import { Component, Input } from '@angular/core';
import { LogService } from 'src/app/services/log/log.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent {

  @Input() student: any

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.getPerform()
  }

  getPerform() {
    this.logService.getGeneralPerformByStudentIds(`'${this.student.ogrenci_id}'`).subscribe(res => this.student.perform = res)
  }

}
