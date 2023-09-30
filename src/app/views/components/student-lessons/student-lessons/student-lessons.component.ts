import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';
import { LogService } from 'src/app/services/log/log.service';
import { tap } from 'rxjs'

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
    private router: Router) { }

  ngOnInit() {
    this.currentStudent = history.state.student

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
}
