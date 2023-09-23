import { Component } from '@angular/core';
import { LessonCategoryService } from 'src/app/services/lesson-category/lesson-category.service';
import { LessonService } from 'src/app/services/lesson/lesson.service';

@Component({
  selector: 'app-student-lessons',
  templateUrl: './student-lessons.component.html',
  styleUrls: ['./student-lessons.component.css']
})
export class StudentLessonsComponent {

  /*lessons: any[] = [];
  categories: any[] = [];*/

  lessonsWithCategories: any[] = [];
  //currentStudent: any;
  currentLesson: any;

  lesson_names: any[] = [];


  constructor(private lessonService: LessonService,
    private lessonCategoryService: LessonCategoryService) { }

  ngOnInit() {
    /*this.lessonService.getLessons().subscribe(res => this.lessons = res);*/

    this.lessonService.getLessonsAndCategories().subscribe(res => {
      this.lessonsWithCategories = res;
      console.log(res);
      res.map((res: any) => {
        if (!this.lesson_names.includes(res.ders_adi))
          this.lesson_names.push(res.ders_adi);
      })
    });
  }

  getCategories(ders: string) {
    this.currentLesson = this.lessonsWithCategories.filter(lesson => lesson.ders_adi == ders);
  }

  getDataByCategoryId(kategori_id: string) {
     
  }
}
