import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent {

  constructor(private teacherService: TeacherService,
    private dialogService: DialogService,
    private router: Router) { }

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

  addTeacher() {
    this.router.navigate(['/school/addteacher']);
  }

  deleteTeacher(teacher: any) {
    this.dialogService.openDeleteModal(teacher).onClose.subscribe()
  }
}
