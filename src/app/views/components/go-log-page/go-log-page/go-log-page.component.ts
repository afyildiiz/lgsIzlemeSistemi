import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { LessonService } from 'src/app/services/lesson/lesson.service';

@Component({
  selector: 'app-go-log-page',
  templateUrl: './go-log-page.component.html',
  styleUrls: ['./go-log-page.component.css']
})
export class GoLogPageComponent {
  /*
    constructor(private logService: LogService,
      private lessonCategoryService: LessonCategoryService,
      private studentService: StudentService,
      private fb: FormBuilder) { }
  
    students: any[] = []
    categories: any[] = []
    myForm!: FormGroup
    lesson_id: any
    currentTeacher: any
  
    ngOnInit() {
      this.lesson_id = history.state.lesson_id
      this.currentTeacher = localStorage.getItem('currentTeacher')
      this.currentTeacher = JSON.parse(this.currentTeacher)
  
      this.myForm = this.fb.group({
        hedef_soru: [],
        categories: this.fb.array([])
      })
  
      this.getLessons()
    }
  
    getStudents() {
      this.studentService.getStudentsByTeacherId(this.currentTeacher.id).pipe(
        tap(res => this.students = res),
      ).subscribe(() => this.getLessons())
    }
  
    getLessons() {
      //let studentids = this.students.map(student => `'${student.ogrenci_id}'`).join(',')
  
      this.lessonCategoryService.getCategoriesByLessonid(this.lesson_id).subscribe(res => this.categories = res)
    }
  }
  */

  myForm!: FormGroup
  lessons: any[] = []
  selectedMonth: any
  months: any[] = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Agustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ]

  constructor(private lessonService: LessonService,
    private dialogService: DialogService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      monthForm: this.fb.array([]),
    })
    this.getLessonsAndCategories()
  }

  get monthForm() {
    return this.myForm.get('monthForm') as FormArray
  }

  addMonthGroup(lesson?: any) {
    this.monthForm.push(this.fb.group({
      ders: [lesson, [Validators.required]],
      hedef_soru: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
    })
    )
  }

  getLessonsAndCategories() {
    this.lessonService.getLessons().pipe(
      tap(res => this.lessons = res),
    ).subscribe(() => {
      this.lessons.map((lesson: any, indis: number) => {
        this.addMonthGroup(lesson)
      });
    })
  }

  setMonth(event: any) {
    console.log(event)
  }

  /*
  son save
 
  save() {
    let sonuc = this.monthForm.controls.some(c => c.valid == false)
 
    if (sonuc == false) {
      let veriler = this.monthForm.value
      this.dialogService.openTextModal(veriler, this.students).onClose.subscribe(res => console.log('return ', res))
    }
  }*/

  save(indis: any) {
    let sonuc = this.monthForm.controls[indis]

    console.log(indis)

    if (sonuc.valid == true) {
      let veriler = sonuc.value
      this.dialogService.openTextModal(veriler, 'text-modal').onClose.subscribe(res => console.log(res))
    }
  }
}