import { NbDialogRef } from '@nebular/theme';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { LogService } from 'src/app/services/log/log.service';
import { LessonCategoryService } from 'src/app/services/lesson-category/lesson-category.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { TeacherLogService } from 'src/app/services/teacher-log/teacher-log.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  constructor(private dialogRef: NbDialogRef<ConfirmationModalComponent>,
    private lessonCategoryService: LessonCategoryService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private teacherLogService: TeacherLogService,
    private logService: LogService,
    private dialogService: DialogService) { }

  @Input() lesson_id: any;
  @Input() student_id: any;
  myForm!: FormGroup;
  aylik_hedef: any
  hedef_soru: any;
  categories: any[] = []
  selectedCategory: any = ''
  lesson_name: any

  ngOnInit(): void {
    this.getLesson()
    this.myForm = this.fb.group({
      cozulen_soru: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      dogru_sayisi: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      yanlis_sayisi: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      tarih: [new Date().toISOString().split('T')[0]],
    })

    this.myForm.get('tarih')?.valueChanges.subscribe((changes) => {
      console.log(changes)
      this.getGoals(changes)
    });

    this.getCategories()
  }

  getLesson() {
    this.dialogService.getDersAdi().subscribe((res: any) => {
      this.lesson_name = res
    })
  }

  isUpdated: boolean = false

  getGoals(changes?: any) {
    let tarih = this.myForm.value.tarih
    let yil = tarih.split('-')[0]
    let ay = new Date(tarih).getMonth() + 1.

    if (this.selectedCategory)
      this.teacherLogService.getGoals(this.student_id, this.selectedCategory, yil, ay.toString()).subscribe(res => {
        if (res.length) {
          this.aylik_hedef = res[0].aylik_hedef_soru
          this.hedef_soru = res[0].hedef_soru
        }
        else {
          this.hedef_soru = 0;
        }
        this.logService.getNotesByStudentIdAndCategoryId(this.student_id, this.selectedCategory, yil, ay.toString(), tarih).subscribe(res => {
          if (res.length) {
            this.isUpdated = true
            this.myForm.get('cozulen_soru')?.setValue(res[0].cozulen_soru)
            this.myForm.get('dogru_sayisi')?.setValue(res[0].dogru_sayisi)
            this.myForm.get('yanlis_sayisi')?.setValue(res[0].yanlis_sayisi)
          }
        })
      })
  }

  getCategories() {
    this.lessonCategoryService.getCategoriesByLessonid(this.lesson_id).subscribe(res => this.categories = res)
  }

  updateCategory() {
    this.myForm.get('cozulen_soru')?.reset()
    this.myForm.get('dogru_sayisi')?.reset()
    this.myForm.get('yanlis_sayisi')?.reset()
    this.getGoals()
  }

  action(type: boolean): void {
    if (type == true) {
      if (this.myForm.valid && this.selectedCategory) {
        if (this.myForm.value.cozulen_soru >= this.myForm.value.dogru_sayisi + this.myForm.value.yanlis_sayisi) {
          this.myForm.value.kategori_id = this.selectedCategory
          this.myForm.value.hedef_soru = this.hedef_soru;
          this.myForm.value.aylik_hedef_soru = this.aylik_hedef
          this.dialogRef.close({ value: this.myForm.value, isUpdated: this.isUpdated });
        }
      } else {
        this.toastService.showToast('warning', 'form verileri geçerli değil');
      }
    } else {
      this.close();
    }
  }

  close() {
    this.dialogRef.close()
  }

}