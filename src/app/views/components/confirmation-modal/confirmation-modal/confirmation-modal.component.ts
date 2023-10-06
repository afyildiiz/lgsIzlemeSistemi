import { NbDialogRef } from '@nebular/theme';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { LogService } from 'src/app/services/log/log.service';
import { LessonCategoryService } from 'src/app/services/lesson-category/lesson-category.service';

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
    private logService: LogService) { }

  @Input() lesson_id: any;
  @Input() student_id: any;
  myForm!: FormGroup;
  hedef_soru: any;
  categories: any[] = []
  selectedCategory: any=''

  ngOnInit(): void {
    this.myForm = this.fb.group({
      cozulen_soru: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      dogru_sayisi: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      yanlis_sayisi: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      tarih: [new Date().toISOString().split('T')[0]],
    })

    this.myForm.get('tarih')?.valueChanges.subscribe(changes => {
      this.getGoals(changes)
    });

    this.getCategories()
  }

  getGoals(changes?: any) {
    this.logService.getNotesByStudentIdAndCategoryId(this.student_id, this.selectedCategory, this.myForm.value.tarih).subscribe(res => {
      console.log(res)
      if (res.length) {
        this.hedef_soru = res[0].hedef_soru
        this.myForm.get('cozulen_soru')?.setValue(res[0].cozulen_soru)
        this.myForm.get('dogru_sayisi')?.setValue(res[0].dogru_sayisi)
        this.myForm.get('yanlis_sayisi')?.setValue(res[0].yanlis_sayisi)
      }
      else
        this.hedef_soru = 0;
    })
    /*
    kodun calısma mantıgı:
    tarihte veya konularda herhangi bir değişiklik oldugunda gidiyor ve notlar tablosuna mevcut ogrenci id'si ile mevcut kategoride
    ve mevcut tarihte bir hedef soru var mı diye sorgu atıyor.

    bu sorguda ayı vererek önce secilen konuda bu aya ait hedeflenen soru var mı onu döndür hedef_soru olarak
    ardından günü vererek kullanıcı belir

    */
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
          this.dialogRef.close(this.myForm.value);
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