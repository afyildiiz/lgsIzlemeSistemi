import { Component } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent {

  constructor(private teacherService: TeacherService) { }

  schoolAdmin: any;
  teachers: any[] = [];

  ngOnInit() {
    let school = localStorage.getItem('schoolAdmin');
    this.schoolAdmin = school ? JSON.parse(school) : {};
    this.getTeachers();
  }

  getTeachers() {
    if (this.schoolAdmin.okul_id)
      this.teacherService.getTeacherBySchoolId(this.schoolAdmin.okul_id).subscribe(res => this.teachers = res);
  }
}
