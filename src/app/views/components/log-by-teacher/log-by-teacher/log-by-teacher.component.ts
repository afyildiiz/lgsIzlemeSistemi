import { Component } from '@angular/core';
import { LessonCategoryService } from 'src/app/services/lesson-category/lesson-category.service';
import { LogService } from 'src/app/services/log/log.service';

@Component({
  selector: 'app-log-by-teacher',
  templateUrl: './log-by-teacher.component.html',
  styleUrls: ['./log-by-teacher.component.css']
})
export class LogByTeacherComponent {

  constructor(private logService: LogService,
    private lessonCategoryService: LessonCategoryService) { }

  lesson_id: any
  categories: any[] = []

  ngOnInit() {
    this.lesson_id = history.state.lesson_id

    this.getCategories()
  }

  getCategories() {
    this.lessonCategoryService.getCategoriesByLessonid(this.lesson_id).subscribe(res => this.categories = res)
  }

}
