import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { LogService } from 'src/app/services/log/log.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-get-log-page',
  templateUrl: './get-log-page.component.html',
  styleUrls: ['./get-log-page.component.css']
})
export class GetLogPageComponent {

  constructor(private logService: LogService,
    private studentService: StudentService
  ) { }

  selectedStudent: any
  selectedCategory: any
  currentTeacher: any
  students: any[] = []
  filteredNotes: any[] = []
  notes: any[] = []
  categories: any[] = []
  lesson_id: any
  selectedMonth: any

  months: any[] = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Agustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ]

  ngOnInit() {
    this.lesson_id = history.state.lesson_id
    this.currentTeacher = localStorage.getItem('currentTeacher')
    this.currentTeacher = JSON.parse(this.currentTeacher)

    this.getStudentsByTeacherId()
  }

  getStudentsByTeacherId() {
    this.studentService.getStudentsByTeacherId(this.currentTeacher.id).pipe(
      tap(res => this.students = res)
    ).subscribe(() => this.getLogsByLessonId())
  }

  getLogsByLessonId() {
    let studentids = this.students.map(student => `'${student.ogrenci_id}'`).join(',')

    this.logService.getNotesByLessonId(studentids, this.lesson_id).pipe(
      tap(res => this.notes = res),
      tap(res => this.filteredNotes = res)
    ).subscribe(() => {
      this.notes.map(note => {
        if (!this.categories.some(category => category.kategori_id == note.kategori_id))
          this.categories.push({ kategori_adi: note.kategori_adi, kategori_id: note.kategori_id })
      })
    })
  }

  onSelectedStudent(event: any) {
    if (this.selectedCategory && this.selectedMonth)
      this.filteredNotes = this.notes.filter(note => note.ay == this.selectedMonth + 1 && note.ogrenci_id == this.selectedStudent && note.kategori_id == this.selectedCategory)
    else
      this.filteredNotes = this.notes.filter(note => note.ogrenci_id == event)
  }

  onSelectedCategory(event: any) {
    this.selectedCategory = event

    if (this.selectedStudent && this.selectedMonth)
      this.filteredNotes = this.notes.filter(note => note.ay == this.selectedMonth + 1 && note.ogrenci_id == this.selectedStudent && note.kategori_id == this.selectedCategory)
    else
      this.filteredNotes = this.notes.filter(note => (note.kategori_id == this.selectedCategory && note.ogrenci_id == this.selectedStudent))
  }

  removeFilters() {
    this.selectedCategory = null
    this.selectedStudent = null
    this.filteredNotes = this.notes
  }

  updateMonth() {
    let month = this.selectedMonth + 1

    this.filteredNotes = this.notes.filter(note => note.ay == month && note.ogrenci_id == this.selectedStudent && note.kategori_id == this.selectedCategory)

  }
}
