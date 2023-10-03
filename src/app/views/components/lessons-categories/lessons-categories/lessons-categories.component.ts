import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { LessonCategoryService } from 'src/app/services/lesson-category/lesson-category.service';
import { LogService } from 'src/app/services/log/log.service';
import { tap } from 'rxjs';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-lessons-categories',
  templateUrl: './lessons-categories.component.html',
  styleUrls: ['./lessons-categories.component.css']
})
export class LessonsCategoriesComponent {

  constructor(private lessonCategoryService: LessonCategoryService,
    private router: Router,
    private dialogService: DialogService,
    private logService: LogService) { }

  currentLessonId: any;
  currentCategoryId: any;
  categories: any[] = [];
  student: any;

  ngOnInit() {
    this.currentLessonId = history.state.lessonId;
    this.student = localStorage.getItem('currentStudent')
    this.student = JSON.parse(this.student);

    if (this.currentLessonId)
      this.getCategories()
  }

  getCategories() {
    this.lessonCategoryService.getCategoriesByLessonid(this.currentLessonId).pipe(
      tap(res => this.categories = res),
      tap(() => this.getPerform())
    ).subscribe()
  }

  perform: any[] = [];

  getPerform() {
    this.logService.getPerformOfCategories(this.student.ogrenci_id).pipe(
      tap(res => this.perform = res)
    ).subscribe(() => this.categories.map(category => {
      this.perform.map(e => {
        if (e.kategori_id == category.kategori_id) {
          //category.performans = e
          let items: NbMenuItem[] = [
            {
              title: 'Çözülen Soru',
              expanded: true,
              badge: {
                text: e.toplam_cozulen_soru,
                status: 'primary',
              },
            },
            {
              title: 'Doğru Sayısı',
              expanded: true,
              badge: {
                text: e.toplam_dogru_sayisi,
                status: 'success',
              },
            },
            {
              title: 'Performans Yüzdesi',
              expanded: true,
              badge: {
                text: e.performans.toFixed(2),
                status: e.performans > 80 ? 'success' : 'warning',
              },
            }
          ]
          category.performans = items
        }
      })
    }))
  }

  goLogPage(category_id: string) {
    this.currentCategoryId = category_id;
    this.router.navigate(['/student/logpage'], { state: { currentCategory: category_id } })
  }

  insertLog(category_id: string) {
    this.dialogService.openConfirmationModal(category_id, this.student.ogrenci_id).onClose.subscribe((res: any) => {
      if (res)
        if (res.hedef_soru == 0)
          this.logService.insertStudentNote(this.student.ogrenci_id, {
            kategori_id: category_id,
            hedef_soru: 0,
            cozulen_soru: res.cozulen_soru,
            dogru_sayisi: res.dogru_sayisi,
            yanlis_sayisi: res.yanlis_sayisi,
            tarih: res.tarih
          }).subscribe(res => console.log(res))
        else
          this.logService.updateStudentNote(this.student.ogrenci_id, {
            cozulen_soru: res.cozulen_soru,
            dogru_sayisi: res.dogru_sayisi,
            yanlis_sayisi: res.yanlis_sayisi,
            tarih: res.tarih,
            kategori_id: category_id
          }).subscribe(res => console.log(res))
    });
  }
}
