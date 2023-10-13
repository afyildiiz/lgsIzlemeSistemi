import { Component, Input } from '@angular/core';
import { LogService } from 'src/app/services/log/log.service';
import { tap } from 'rxjs'

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent {

  @Input() lesson: any
  @Input() students: any[] = []
  performs: any[] = []

  constructor(private logService: LogService) { }

  ngOnInit() {

    this.getLessonPerform()
  }

  getLessonPerform() {
    let lessonid = this.lesson.ders_id
    let studentids = this.students.map((student: any) => `'${student.ogrenci_id}'`).join(',')

    this.logService.getGeneralPerformByStudentIdsandLessonId(studentids, lessonid).pipe(
      tap((res: any) => this.performs = res),
    ).subscribe(() => this.getAllOfGoalsByStudentIdsAndLessonId())
  }

  allGoals: any[] = []

  getAllOfGoalsByStudentIdsAndLessonId() {
    let studentids = this.students.map(student => `'${student.ogrenci_id}'`).join(',')
    this.logService.getAllOfGoalsByStudentIdsAndLessonId(studentids, this.lesson.ders_id).pipe(
      tap(res => this.allGoals = res)
    ).subscribe(() => {
      this.performs.map(perform => {
        this.allGoals.map(goal => {
          if (perform.ogrenci_id == goal.ogrenci_id && perform.ders_id == goal.ders_id)
            perform.hedef = goal.sum
        })
      })
    })
  }

  sortOrder = 'asc'; // Sıralama varsayılan olarak artan sıradadır.

  sortBy(column: string): void {
    this.performs.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (this.sortOrder === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });

    // Sıralama düzenini tersine çevir
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }
}

