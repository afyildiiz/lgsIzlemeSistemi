import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from 'src/app/services/student/student.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { tap } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-assign-mentor',
  templateUrl: './assign-mentor.component.html',
  styleUrls: ['./assign-mentor.component.css']
})
export class AssignMentorComponent {

  constructor(private teacherService: TeacherService,
    private studentService: StudentService,
    private toastService: ToastService,
    private fb: FormBuilder) { }

  myForm!: FormGroup;
  teachers: any[] = [];
  students: any[] = [];
  currentSchool: any;

  ngOnInit() {
    this.currentSchool = localStorage.getItem('schoolAdmin');
    this.myForm = this.fb.group({})

    this.getTeachers();
    this.getStudents();
  }

  getTeachers() {
    this.teacherService.getTeacherBySchoolId(JSON.parse(this.currentSchool).okul_id).subscribe(res => this.teachers = res);
    /*this.studentService.getStudentsAndTeachersBySchoolId(JSON.parse(this.currentSchool).okul_id)
      .subscribe(res => console.log(res))*/
  }

  getStudents() {
    this.studentService.getStudentsBySchoolId(JSON.parse(this.currentSchool).okul_id).pipe(
      tap(res => this.students = res),
    ).subscribe(() => this.createFormObject());
  }

  createFormObject() {
    this.students.map(student => {
      let sonuc = this.teachers.find(teacher => student.teacher_id == teacher.id)
      if (sonuc) {
        const newFormControl = this.fb.control(student.teacher_id);
        this.myForm.addControl(student.ogrenci_numarasi, newFormControl);
      } else {
        this.myForm.addControl(student.ogrenci_numarasi, this.fb.control(''));
      }
    })
  }

  assignMentor() {
    this.students.map(student => {
      let teacher = this.myForm.get(student.ogrenci_numarasi.toString())
      if (teacher?.dirty)
        this.studentService.setTeacher(student.ogrenci_id, teacher.value).subscribe(res => console.log(res));
    })
  }

  // her öğrenci için ayrı sorgu atıyor insert sorguları için hepsini bir anda yapmaya çalış
}
