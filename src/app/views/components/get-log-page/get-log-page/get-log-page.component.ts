import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    private studentService: StudentService,
    private fb: FormBuilder
  ) { }

  myForm!: FormGroup

  selectedStudent: any = ''
  selectedCategory: any = ''
  currentTeacher: any
  students: any[] = []
  filteredNotes: any[] = []
  notes: any[] = []
  categories: any[] = []
  lesson_id: any
  selectedYear: any = ''
  selectedMonth: any = ''
  lesson_name: any
  months: any[] = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Agustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ]

  years: any[] = [
    '2023', '2024', '2025', '2026'
  ]

  ngOnInit() {
    this.lesson_name = history.state.lesson_name
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

    let year = this.selectedYear
    let month = (parseInt(this.selectedMonth) + 1).toString()

    if (this.selectedYear && this.selectedMonth) {
      this.filteredNotes = this.notes.filter(note => note.ay == month && note.ogrenci_id == this.selectedStudent && note.yil == year);
    }
    else if (this.selectedYear)
      this.filteredNotes = this.notes.filter(f => f.ogrenci_id == month && f.yil == year)
    else if (this.selectedMonth)
      this.filteredNotes = this.notes.filter(f => f.ogrenci_id == month && f.ay == this.selectedMonth)
    else {
      this.filteredNotes = this.notes.filter(f => f.ogrenci_id == month)
    }
  }

  onSelectedYear() {

    let month = (parseInt(this.selectedMonth) + 1).toString()
    let year = this.selectedYear

    if (this.selectedStudent && this.selectedMonth) {
      this.filteredNotes = this.notes.filter(note =>
        note.ogrenci_id == this.selectedStudent &&
        note.ay == month &&
        note.yil == year
      )
    }
    else if (this.selectedStudent) {
      this.filteredNotes = this.notes.filter(note =>
        note.ogrenci_id == this.selectedStudent &&
        note.yil == year
      )
    } else if (this.selectedMonth) {
      this.filteredNotes = this.notes.filter(note =>
        note.ay == month &&
        note.yil == year
      )
    }
    else {
      this.filteredNotes = this.notes.filter(note => note.yil == year)
    }
  }

  onSelectedMonth() {

    let month = (parseInt(this.selectedMonth) + 1).toString()
    let year = this.selectedYear

    if (this.selectedStudent && this.selectedYear) {
      this.filteredNotes = this.notes.filter(note => note.ay == month && note.ogrenci_id == this.selectedStudent && note.yil == year);
    } else if (this.selectedStudent) {
      this.filteredNotes = this.notes.filter(note => note.ay == month && note.ogrenci_id == this.selectedStudent);
    } else if (this.selectedCategory) {
      this.filteredNotes = this.notes.filter(note => note.ay == month && note.kategori_id == this.selectedCategory);
    } else {
      this.filteredNotes = this.notes.filter(note => note.ay == month);
    }
  }

  removeFilters() {
    this.selectedCategory = null
    this.selectedStudent = null
    this.filteredNotes = this.notes
  }
}
