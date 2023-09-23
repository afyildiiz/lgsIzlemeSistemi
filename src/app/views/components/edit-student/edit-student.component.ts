import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent {

  constructor(private studentService: StudentService,
    private fb: FormBuilder) { }

  myForm!: FormGroup;
  students: any[] = []
  currentTeacher: any;

  ngOnInit() {
    this.currentTeacher = localStorage.getItem('currentTeacher');

    this.myForm = this.fb.group({
      students: new FormControl(this.students),
    })
    this.getTeachersStudents();
  }

  getTeachersStudents() {
    let teacherId = JSON.parse(this.currentTeacher).id;
    //öğretmenin öğrencileri varsa onlar dönüyor
    this.studentService.getStudentsByTeacherId(teacherId).subscribe(res => this.students = res)
  }

  onSubmit() {
    let teacherId = JSON.parse(this.currentTeacher).id;
    this.studentService.setTeacher(teacherId).subscribe(res => console.log(res));
    console.log(this.currentTeacher);
  }
}
