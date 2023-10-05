import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {

  constructor(private studentService: StudentService,
    private dialogService: DialogService,
    private router: Router) { }

  schoolAdmin: any;
  students: any[] = [];

  ngOnInit() {
    let school = localStorage.getItem('schoolAdmin');
    this.schoolAdmin = school ? JSON.parse(school) : {};
    this.getStudents();
  }

  getStudents() {
    if (this.schoolAdmin.okul_id)
      this.studentService.getStudentsBySchoolId(this.schoolAdmin.okul_id).subscribe(res => this.students = res);
  }

  addStudent() {
    this.router.navigate(['/school/addstudent']);
  }

  deleteStudent(student: any) {
    this.dialogService.openDeleteModal(student).onClose.subscribe(() => console.log('s'))
  }
}
