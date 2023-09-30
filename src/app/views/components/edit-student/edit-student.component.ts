import { Component, ViewChild } from '@angular/core';
import { StudentService } from 'src/app/services/student/student.service';
import { TeacherLogComponent } from '../teacher-log/teacher-log.component';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent {

  constructor(private studentService: StudentService) { }

  @ViewChild(TeacherLogComponent) teacherLogComponent!: TeacherLogComponent;
  students: any[] = []
  selectedStudents: any[] = []
  currentTeacher: any;

  ngOnInit() {
    this.currentTeacher = localStorage.getItem('currentTeacher');

    this.getTeachersStudents();
  }

  getTeachersStudents() {
    let teacherId = JSON.parse(this.currentTeacher).id;
    this.studentService.getStudentsByTeacherId(teacherId).subscribe(res => this.students = res)
    //this.selectedStudents = this.students
  }

  selectionChange(event: any[]) {
    event.map(e => {
      if (e === 'all')
        this.selectedStudents = this.students.map(student => student)
    })
  }

}
