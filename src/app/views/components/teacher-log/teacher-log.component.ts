import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { LessonService } from 'src/app/services/lesson/lesson.service';

@Component({
  selector: 'app-teacher-log',
  templateUrl: './teacher-log.component.html',
  styleUrls: ['./teacher-log.component.css']
})
export class TeacherLogComponent {

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

    if (sonuc.valid == true) {
      let veriler = sonuc.value
      this.dialogService.openTextModal(veriler, 'text-modal').onClose.subscribe()
    }
  }
}
