import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { LessonCategoryService } from 'src/app/services/lesson-category/lesson-category.service';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { LogService } from 'src/app/services/log/log.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-log-page',
  templateUrl: './log-page.component.html',
  styleUrls: ['./log-page.component.css']
})
export class LogPageComponent {

  /*
    constructor(private logService: LogService,
      private lessonCategoryService: LessonCategoryService,
      private toastService: ToastService,
      private fb: FormBuilder) { }
  
    @Input() currentStudent: any;
    myForm!: FormGroup
    data: any[] = [];
    teacher: any;
    categories: any[] = [];
    currentCategoryId: any;
  
    ngOnInit() {
      this.currentCategoryId = history.state.currentCategory
  
      if (!this.currentStudent) {
        this.currentStudent = localStorage.getItem('currentStudent');
        this.currentStudent = JSON.parse(this.currentStudent);
      }
  
      this.myForm = this.fb.group({
        date: [new Date().toISOString().split('T')[0], [Validators.required]], //new Date().toISOString().split('T')[0], [Validators.required
        formArray: this.fb.array([])
      })
      this.getNotes(this.currentStudent.ogrenci_id)
  
      this.getCategories();
    }
  
    ngOnChanges() {
      this.teacher = localStorage.getItem('currentTeacher');
      //if (this.currentStudent)
      //this.getNotes(this.currentStudent.ogrenci_numarasi);
    }
  
    get formArray() {
      return this.myForm.get('formArray') as FormArray;
    }
  
  
    getNotes(student_id: string) {
      /*let date = this.myForm.get('date')?.value
      if (date) {
        this.logService.getNotesByStudentId(student_id, date).pipe(
          tap(res => this.data = res),
        ).subscribe(() => setTimeout(() => this.createForm(), 200));
      }*/

  /*this.logService.getLastNotes(student_id, this.currentCategoryId).pipe(
    tap(res => this.data = res),
    tap(res => console.log(res)),
  ).subscribe(() => this.createForm());
  
}
*/
  /*
    getCategories() {
      this.lessonCategoryService.getCategories().subscribe(res => this.categories = res);
      //this.lessonService.getLessons().subscribe(res => this.categories = res);
    }
  
    currentCategory: any;
  
    createForm() {
      if (this.data.length)
        this.data.map((e: any) => {
          this.currentCategory = e.kategori_adi
          this.formArray.push(this.fb.group({
            kategori: [e.kategori_id],
            hedef_soru: [{ value: e.hedef_soru, disabled: true }],
            cozulen_soru: [e.cozulen_soru],
            dogru_sayisi: [e.dogru_sayisi],
            yanlis_sayisi: [e.yanlis_sayisi],
            tarih: [{ value: e.tarih.split('T')[0], disabled: true }]
          }));
        })
  
    }
  
    updateSelectedDate() {
      this.formArray.clear();
      this.getNotes(this.currentStudent.ogrenci_id);
    }
  
    addGroup() {
      this.formArray.push(this.fb.group({
        kategori: [],
        hedef_soru: [''],
        cozulen_soru: [''],
        dogru_sayisi: [''],
        yanlis_sayisi: [''],
        tarih: ['']
      })
      )
    }
  
    save() {
      let keys = Object.keys(this.formArray.value)
      keys.map((key: any) => {
        if (this.formArray.get(key)?.dirty == true) {
          let value = this.formArray.get(key)?.value
          if (value.cozulen_soru < (value.dogru_sayisi + value.yanlis_sayisi)) {
            this.toastService.showToast('warning', 'Doğru ve yanlış sayıların toplamı çözülen soru sayısından fazla olamaz.');
            console.log(value)
            return;
          }
          this.logService.updateStudentNote(this.currentStudent.ogrenci_id, {
            cozulen_soru: value.cozulen_soru, dogru_sayisi: value.dogru_sayisi,
            yanlis_sayisi: value.yanlis_sayisi, tarih: this.data[key].tarih,
            kategori_id: value.kategori
          }).subscribe(res => console.log(res))
        }
      })
    }
  
    insert() {
      let keys = Object.keys(this.formArray.value)
  
      keys.map(key => {
        if (this.formArray.get(key)?.dirty == true) {
          let value = this.formArray.get(key)?.value
          this.logService.insertStudentNote(this.currentStudent.ogrenci_id, {
            kategori_id: value.kategori,
            hedef_soru: value.hedef_soru,
            cozulen_soru: 0,
            dogru_sayisi: 0,
            yanlis_sayisi: 0,
            tarih: value.tarih
          }).subscribe(res => console.log(res))
        }
      })
    }
    */


  constructor(private logService: LogService,
    private dialogService: DialogService) { }
  ders_adi: any

  currentStudent: any;
  datas: any[] = []
  currentLessonId: any;
  selectedYear: any = new Date().getFullYear()
  selectedMonth: any = new Date().getMonth() + 1;
  months: any[] = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Agustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ]

  years: any[] = ['2023', '2024', '2025', '2026']

  ngOnInit() {
    this.currentLessonId = history.state.lesson_id
    this.ders_adi = history.state.ders_adi
    this.currentStudent = localStorage.getItem('currentStudent');
    this.currentStudent = JSON.parse(this.currentStudent);

    this.getNotes()
  }

  ngOnChanges() {

  }

  getNotes() {
    if (this.selectedYear) {
      if (this.selectedMonth) {
        this.logService.getNotesByStudentIdAndLessonId(this.currentStudent.ogrenci_id, this.currentLessonId, this.selectedYear, this.selectedMonth).pipe(
          tap(res => this.datas = res),
        ).subscribe()
        return
      }

      this.logService.getNotesByStudentIdAndLessonId(this.currentStudent.ogrenci_id, this.currentLessonId, this.selectedYear).pipe(
        tap(res => this.datas = res),
      ).subscribe()

    }
  }

  showMonthlyPerform() {
    if (this.datas.length) {
      let cozulen_soru: number = 0
      let dogru_sayisi: number = 0
      let yanlis_sayisi: number = 0
      let hedef_soru: number = 0
      let performans: any
      let calisma_performansi: any

      this.datas.map(data => {
        cozulen_soru += data.cozulen_soru
        dogru_sayisi += data.dogru_sayisi
        yanlis_sayisi += data.yanlis_sayisi
        hedef_soru += data.hedef_soru
      })
      performans = ((dogru_sayisi / cozulen_soru) * 100).toFixed(2)

      if (isNaN(cozulen_soru) || isNaN(hedef_soru) || hedef_soru === 0) {
        calisma_performansi = 0
      } else {
        calisma_performansi = ((cozulen_soru / hedef_soru) * 100).toFixed(2)
      }

      this.dialogService.openPerformModal({
        calisma_performansi,
        cozulen_soru, dogru_sayisi,
        yanlis_sayisi, performans
      })
    }
  }

}
