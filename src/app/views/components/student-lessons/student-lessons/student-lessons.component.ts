import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';
import { LogService } from 'src/app/services/log/log.service';
import { tap } from 'rxjs'
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-student-lessons',
  templateUrl: './student-lessons.component.html',
  styleUrls: ['./student-lessons.component.css']
})
export class StudentLessonsComponent {

  lessons: any[] = []
  performs: any[] = []
  currentStudent: any

  constructor(
    private logService: LogService,
    private lessonService: LessonService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit() {
    this.currentStudent = localStorage.getItem('currentStudent')
    this.currentStudent = JSON.parse(this.currentStudent)

    this.getLessons()

  }

  getLessons() {
    this.lessonService.getLessons().pipe(
      tap(res => this.lessons = res),
      tap(res => console.log(res))
    ).subscribe(() => {
      this.getLessonPerforms()
      /*this.lessons.map(e => {

        let color = (e.performans > 85) ? 'success' : (e.performans > 70) ? 'info' : (e.performans > 50) ? 'warning' : 'danger'

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
              status: color,
            },
          }
        ]
        e.perform = items
      })*/

    })
  }

  getLessonPerforms() {
    this.logService.getPerformofLessons(this.currentStudent.ogrenci_id).pipe(
      tap(res => this.performs = res)
    ).subscribe(() => this.performs.map(p => {
      this.lessons.map(lesson => {
        if (lesson.ders_id == p.ders_id)
          lesson.perform = p
      })
    }))
  }

  chooseLesson(event: any) {
    this.router.navigate(['/student/categories'], { state: { lessonId: event } });
  }

  goLogPage(lesson_id: string, ders_adi: any) {
    this.router.navigate(['/student/logpage'], { state: { lesson_id: lesson_id, ders_adi: ders_adi } })
  }

  getLogPage(lesson_id: string) {
    this.router.navigate(['/teacher/getlogpage'], { state: { lesson_id: lesson_id } })
  }

  insertLog(lesson_id: string, ders_adi: any) { //category_id: string

    //this.router.navigate(['/student/logpage'], { state: { currentLesson: lesson_id } })

    this.dialogService.setDersAdi(ders_adi)
    this.dialogService.openConfirmationModal(lesson_id, this.currentStudent.ogrenci_id, 'confirmation-modal').onClose.subscribe((res: any) => {
      if (res) {

        if (res.isUpdated === true) {
          let tarih = res.value.tarih.split('-')[1]
          let yil = res.value.tarih.split('-')[0]
          let ay = new Date(tarih).getMonth() + 1

          console.log(tarih)
          console.log(yil)

          this.logService.updateStudentNote(this.currentStudent.ogrenci_id, {
            cozulen_soru: res.value.cozulen_soru,
            dogru_sayisi: res.value.dogru_sayisi,
            yanlis_sayisi: res.value.yanlis_sayisi,
            kategori_id: res.value.kategori_id,
            tarih: res.value.tarih,
            lesson_id: lesson_id,
            hedef_soru: res.value.hedef_soru,
            ay: ay,
            yil: yil
          }).subscribe(res => {
            if (res == 'Success')
              this.toastService.showToast('success', 'Ders güncelleme işlemi başarılı.')
          })
        }
        else if (res.isUpdated === false) {
          let tarih = res.value.tarih.split('-')[1]
          let yil = res.value.tarih.split('-')[0]
          let ay = new Date(tarih).getMonth() + 1

          console.log(tarih)
          console.log(yil)

          this.logService.insertStudentNote(this.currentStudent.ogrenci_id, {
            lesson_id: lesson_id,
            hedef_soru: 0,
            kategori_id: res.value.kategori_id,
            cozulen_soru: res.value.cozulen_soru,
            dogru_sayisi: res.value.dogru_sayisi,
            yanlis_sayisi: res.value.yanlis_sayisi,
            tarih: res.value.tarih,
            aylik_hedef_soru: 0,
            ay: ay,
            yil: yil
          }).subscribe(res => {
            if (res == 'Success')
              this.toastService.showToast('success', 'Ders kayıt işlemi başarılı.')
          })
        }

      }
    })
  }
}
