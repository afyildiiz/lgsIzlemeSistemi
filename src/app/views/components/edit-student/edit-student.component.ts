import { Component, ViewChild } from '@angular/core';
import { StudentService } from 'src/app/services/student/student.service';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { LogService } from 'src/app/services/log/log.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent {

  constructor(private studentService: StudentService,
    private logService: LogService,
    private lessonService: LessonService,
    private dialogService: DialogService,
    private router: Router) { }

  students: any[] = []
  currentTeacher: any;
  lessons: any[] = []
  performs: any[] = []

  ngOnInit() {
    this.currentTeacher = localStorage.getItem('currentTeacher');

    this.getStudents();
  }

  getStudents() {
    let teacherId = JSON.parse(this.currentTeacher).id;
    this.studentService.getStudentsByTeacherId(teacherId).pipe(
      tap(res => this.students = res),
    ).subscribe(res => this.getLessons())
  }

  getLessons() {
    this.lessonService.getLessons().pipe(
      tap((res: any) => this.lessons = res)
    ).subscribe(() => this.getGeneralPerformByStudentIds())

  }

  getGeneralPerformByStudentIds() {
    let studentids: string = ''
    studentids = this.students.map(student => {
      return `'${student.ogrenci_id}'`
    }).join(',')

    this.logService.getGeneralPerformByStudentIds(studentids).pipe(
      tap(res => this.performs = res)
    ).subscribe(() => {
      this.performs.map((res: any) => {
        this.lessons.map(lesson => {
          if (res.ders_id == lesson.ders_id)
            lesson.perform = res.performans
        })
      })
    })
  }

  getLogPage(lesson_id: string, lesson_name: any) {
    this.router.navigate(['/teacher/getlogpage'], { state: { lesson_id: lesson_id, lesson_name: lesson_name } })
  }

  getPerformByLessons(lessonid: string) {
    //this.logService.getGeneralPerformByLessonId(lessonid).subscribe(res => this.performs.push({ ders_id: lessonid, performans: res[0].ortalama_performans }))
  }

  goLogPage(lesson_id: string, ders_adi: string) {
    let ders = lesson_id;
    let hedef_soru = 0;

    this.dialogService.setDersAdi(ders_adi)
    // Modal içine göndermek istediğiniz verileri bir nesne içinde toplayın ve state ile iletin
    const modalData = { ders: { ders_id: ders }, hedef_soru: hedef_soru };

    // Dialog açma işlemini gerçekleştirin ve modalData'yı ileterek ders adını içeri aktarın
    this.dialogService.openTextModal(modalData, 'text-modal').onClose.subscribe(res => console.log(res));
  }

  selectStudent(index: any, name: any, surname: any) {
    let currentStudent = this.students[index]

    this.router.navigate(['/teacher/studentperform'], { state: { student: currentStudent, lessons: this.lessons, ad: name, soyad: surname } })
    //tıklandıgında bir modal acılsın orda kullanıcı adı title olarak girilsin ardından result table gibi veya bir
    //dashboard gibi kullanıcının verileri okunsun her ders için aylık tıklandııgnda haftalık ve gunluk istatistikler
  }
}
