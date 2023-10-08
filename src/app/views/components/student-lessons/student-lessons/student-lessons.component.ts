import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';
import { LogService } from 'src/app/services/log/log.service';
import { tap } from 'rxjs'
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-student-lessons',
  templateUrl: './student-lessons.component.html',
  styleUrls: ['./student-lessons.component.css']
})
export class StudentLessonsComponent {

  lessons: any[] = [];
  currentStudent: any;

  constructor(
    private logService: LogService,
    private dialogService: DialogService,
    private router: Router) { }

  ngOnInit() {
    this.currentStudent = localStorage.getItem('currentStudent')
    this.currentStudent = JSON.parse(this.currentStudent)

    this.getLessons()

  }

  getLessons() {
    this.logService.getPerformofLessons(this.currentStudent.ogrenci_id).pipe(
      tap(res => this.lessons = res)
    ).subscribe(() => {
      this.lessons.map(e => {

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
      })

    })
  }

  chooseLesson(event: any) {
    this.router.navigate(['/student/categories'], { state: { lessonId: event } });
  }

  goLogPage(lesson_id: string,ders_adi:any) {
    this.router.navigate(['/student/logpage'], { state: { lesson_id: lesson_id,ders_adi:ders_adi } })
  }

  getLogPage(lesson_id: string) {
    this.router.navigate(['/teacher/getlogpage'], { state: { lesson_id: lesson_id } })
  }

  insertLog(lesson_id: string,ders_adi:any) { //category_id: string

    //this.router.navigate(['/student/logpage'], { state: { currentLesson: lesson_id } })

    this.dialogService.setDersAdi(ders_adi)
    this.dialogService.openConfirmationModal(lesson_id, this.currentStudent.ogrenci_id, 'confirmation-modal').onClose.subscribe((res: any) => {
      if (res) {
        let ay = res.tarih.split('-')[1]
        if (res.hedef_soru == 0) {
          this.logService.insertStudentNote(this.currentStudent.ogrenci_id, {
            lesson_id: lesson_id,
            hedef_soru: 0,
            kategori_id: res.kategori_id,
            cozulen_soru: res.cozulen_soru,
            dogru_sayisi: res.dogru_sayisi,
            yanlis_sayisi: res.yanlis_sayisi,
            tarih: res.tarih,
            aylik_hedef_soru: 0,
            ay: ay,
            yil: '2023'
          }).subscribe(res => console.log(res))
        }
        else {
          let ay = res.tarih.split('-')[1]
          this.logService.updateStudentNote(this.currentStudent.ogrenci_id, {
            cozulen_soru: res.cozulen_soru,
            dogru_sayisi: res.dogru_sayisi,
            yanlis_sayisi: res.yanlis_sayisi,
            kategori_id: res.kategori_id,
            tarih: res.tarih,
            lesson_id: lesson_id,
            hedef_soru: res.hedef_soru,
            ay: ay,
            yil: '2023'
          }).subscribe(res => console.log(res))
        }
      }
    });
  }
}
