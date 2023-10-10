import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { LessonCategoryService } from 'src/app/services/lesson-category/lesson-category.service';
import { LogService } from 'src/app/services/log/log.service';

@Component({
  selector: 'app-student-perform',
  templateUrl: './student-perform.component.html',
  styleUrls: ['./student-perform.component.css']
})
export class StudentPerformComponent {

  constructor(private logService: LogService,
    private lessonCategoryService: LessonCategoryService) { }

  student: any
  lessons: any[] = []
  isShown: boolean = false
  selectedLesson: any
  allNotes: any[] = []
  takenLesson: any
  monthlyPerform: any[] = []
  weeklyPerform: any[] = []
  dailyPerform: any[] = []

  studentName: any = ''
  studentSurname: any = ''

  lessonSelected: boolean = false;

  lessonNotes: any[] = []
  months: any[] = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Agustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ]

  ngOnInit() {
    this.studentSurname = history.state.soyad
    this.studentName = history.state.ad
    this.student = history.state.student
    this.lessons = history.state.lessons
    console.log(this.lessons)
    console.log(this.studentName, this.studentSurname)
  }

  isMenuOpen: boolean = false; // Başlangıçta menü kapalı

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Menüyü açma/kapama işlemi
  }

  showCardss(lesson: any) {
    this.lessonSelected = true;
  }

  takeLessonName(lesson: any) {
    this.takenLesson = lesson.ders_adi
  }
  getAllNotes(lesson_id: any) {
    this.logService.getNotesByLessonId(`'${this.student.ogrenci_id}'`, lesson_id).pipe(
      tap(res => this.lessonNotes = res)
    ).subscribe()
  }

  showCards(lesson: any) {
    this.takenLesson = lesson.ders_adi
    if (this.selectedLesson && this.selectedLesson.ders_id != lesson.ders_id) {
      this.monthlyPerform = []
      this.weeklyPerform = []
      this.dailyPerform = []
    }
    this.isShown = true
    this.selectedLesson = lesson
    this.getMonthlyPerform()
    this.getWeeklyPerform()
    this.getDailyPerform()
    this.lessonSelected = true;

  }

  getMonthlyPerform() {
    this.logService.getMonthlyPerformByStudentIdAndLessonId(this.student.ogrenci_id, this.selectedLesson.ders_id).pipe(
      tap(res => this.monthlyPerform = res)
    ).subscribe(/*(res) => {
      if (res.length) {
        this.monthlyPerform.map(p => {
          if (p.performans != 0 && p.performans != null && p.calisma_performansi != 0 && p.calisma_performansi != null) {
            p.performans = p.performans.toFixed(2)
            p.calisma_performansi = p.calisma_performansi.toFixed(2)
          }
        })
      }
    }*/)
  }

  getWeeklyPerform() {
    this.logService.getWeeklyPerformByStudentIdAndLessonId(this.student.ogrenci_id, this.selectedLesson.ders_id).pipe(
      tap(res => this.weeklyPerform = res)
    ).subscribe(/*res => {
      if (res.length) {
        this.weeklyPerform.map(p => {
          if (p.performans != 0 && p.performans != null && p.calisma_performansi != 0 && p.calisma_performansi != null) {
            p.performans = p.performans.toFixed(2)
            p.calisma_performansi = p.calisma_performansi.toFixed(2)
          }
        })
      }
    }*/)
  }

  getDailyPerform() {
    this.logService.getDailyPerformByStudentIdAndLessonId(this.student.ogrenci_id, this.selectedLesson.ders_id).pipe(
      tap(res => this.dailyPerform = res) // res => this.dailyPerform = res
    ).subscribe(/*res => {
      if (res.length) {
        this.weeklyPerform.map(p => {
          if (p.performans != 0 && p.performans != null && p.calisma_performansi != 0 && p.calisma_performansi != null) {
            //p.performans = p.performans.toFixed(2)
            p.calisma_performansi = p.calisma_performansi.toFixed(2)
          }
        })
      }
    }*/)
  }
}
