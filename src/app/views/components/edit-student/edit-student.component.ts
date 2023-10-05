import { Component, ViewChild } from '@angular/core';
import { StudentService } from 'src/app/services/student/student.service';
import { TeacherLogComponent } from '../teacher-log/teacher-log.component';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent {

  constructor(private studentService: StudentService,
    private lessonService: LessonService,
    private dialogService: DialogService,
    private router: Router) { }

  @ViewChild(TeacherLogComponent) teacherLogComponent!: TeacherLogComponent;
  students: any[] = []
  //selectedStudents: any[] = []
  currentTeacher: any;
  lessons: any[] = []

  ngOnInit() {
    this.currentTeacher = localStorage.getItem('currentTeacher');

    this.getStudents();
    this.getLessons()
  }


  getStudents() {
    let teacherId = JSON.parse(this.currentTeacher).id;
    this.studentService.getStudentsByTeacherId(teacherId).subscribe(res => this.students = res)
  }


  /*
  selectionChange(event: any[]) {
    event.map(e => {
      if (e === 'all')
        this.selectedStudents = this.students.map(student => student)
    })
  }
  */

  getLessons() {
    this.lessonService.getLessons().subscribe(res => this.lessons = res)
  }

  getLogPage(lesson_id: string) {
    this.router.navigate(['/teacher/getlogpage'], { state: { lesson_id: lesson_id } })
  }

  goLogPage(lesson_id: string) {

    let ders = lesson_id
    let hedef_soru = 0

    this.dialogService.openTextModal({ ders: { ders_id: ders }, hedef_soru: hedef_soru }, 'text-modal').onClose.subscribe(res => console.log(res))
    //this.router.navigate(['/teacher/gologpage'], { state: { lesson_id: lesson_id } }) //gologpage
  }

  selectStudent(index: any) {
    let currentStudent = this.students[index]

    this.router.navigate(['/teacher/studentperform'], { state: { student: currentStudent, lessons: this.lessons } })
    //tıklandıgında bir modal acılsın orda kullanıcı adı title olarak girilsin ardından result table gibi veya bir
    //dashboard gibi kullanıcının verileri okunsun her ders için aylık tıklandııgnda haftalık ve gunluk istatistikler
  }
}
