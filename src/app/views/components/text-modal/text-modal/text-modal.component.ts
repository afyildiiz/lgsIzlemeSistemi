import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { LessonCategoryService } from 'src/app/services/lesson-category/lesson-category.service';
import { tap } from 'rxjs'

@Component({
  selector: 'app-text-modal',
  templateUrl: './text-modal.component.html',
  styleUrls: ['./text-modal.component.css']
})
export class TextModalComponent {

  constructor(private lessonCategoryService: LessonCategoryService,
    private fb: FormBuilder) {
  }

  @Input() formValues: any
  @Input() students: any
  myForm!: FormGroup
  categories: any[] = []

  ngOnInit() {
    this.myForm = this.fb.group({
      lessonsArray: this.fb.array([])
    })
    this.getCategories()

    this.myForm.valueChanges.subscribe(newFormValue => this.change(newFormValue))
  }

  get lessonsArray() {
    return this.myForm.get('lessonsArray') as FormArray
  }

  getCategories() {
    this.lessonCategoryService.getLessonsAndCategories().pipe(
      tap(res => this.categories = res),
    ).subscribe(() => this.createForm())
  }

  filteredCategories: any[] = []

  createForm() {

    this.filteredCategories = this.categories.filter(category => category.ders_id == this.formValues.ders.ders_id)
    let count = Math.floor(this.formValues.hedef_soru / this.filteredCategories.length)

    this.filteredCategories.map(category => {
      const group = this.fb.group({
        kategori: [category.kategori_adi],
        hedef_soru: [count],
      })

      this.lessonsArray.push(group)

    })
  }

  change(event: any) {

    let toplam: number = 0
    event.lessonsArray.map((e: any) => {
      toplam += e.hedef_soru
    })
    this.formValues.hedef_soru = toplam
  }

}

/*
  son gecerli olan

constructor(private fb: FormBuilder,
  private lessonCategoryService: LessonCategoryService) { }

@Input() formValues: any
@Input() students: any
myForm!: FormGroup
categories: any[] = []

ngOnInit() {
  this.myForm = this.fb.group({
    lessonsArray: this.fb.array([])
  })
  this.getCategories()
}

get lessonsArray() {
  return this.myForm.get('lessonsArray') as FormArray
}

getCategories() {
  this.lessonCategoryService.getLessonsAndCategories().pipe(
    tap(res => this.categories = res),
  ).subscribe(() => this.createFormObjects())
}

createFormObjects() {
  this.formValues.map((fv: any) => {
    let categories = this.categories.filter(category => category.ders_id == fv.ders.ders_id);

    const kategorilerArray = this.fb.array(
      categories.map((category: any, indis: number) => {
        return this.fb.group({
          [indis]: [category.kategori_adi]
        });
      })
    )

    const studentGroup = this.fb.group({
      ders_adi: [fv.ders.ders_adi],
      ders_id: [fv.ders.ders_id],
      hedef_soru: [fv.hedef_soru],
      kategoriler: kategorilerArray
    });

    this.lessonsArray.push(studentGroup);
  });

  this.lessonsArray.controls.forEach(la => la.get('ders_adi')?.disable());
}

addControl(indis: any) {
  let group = this.lessonsArray.at(indis) as FormGroup;
  let len = Object.keys(group.controls).length;

  group.addControl(`add_${len}`, this.fb.control(''));
}
}

*/



/*
export class TextModalComponent {

  constructor(private fb: FormBuilder,
    private lessonCategoryService: LessonCategoryService) { }

  @Input() formValues: any
  @Input() students: any
  myForm!: FormGroup
  categories: any[] = []

  ngOnInit() {
    this.myForm = this.fb.group({
      lessonsArray: this.fb.array([])
    })
    this.getCategories()

  }

  get lessonsArray() {
    return this.myForm.get('lessonsArray') as FormArray
  }

  get kategoriler() {
    return this.lessonsArray.get('kategoriler') as FormArray
  }


  getCategories() {
    this.lessonCategoryService.getLessonsAndCategories().pipe(
      tap(res => this.categories = res),
    ).subscribe(() => this.createFormObjects())
  }

  createFormObjects() {
    this.formValues.map((fv: any) => {
      let categories = this.categories.filter(category => category.ders_id == fv.ders.ders_id);

      const kategorilerArray = this.fb.array(
        categories.map((category: any, indis: number) => {
          return this.fb.group({
            //[category.kategori_id]: [category.kategori_adi]
            indis: [category.kategori_adi]

          });
        })
      )

      this.lessonsArray.push(
        this.fb.group({
          ders_adi: [fv.ders.ders_adi],
          ders_id: [fv.ders.ders_id],
          hedef_soru: [fv.hedef_soru],
          //secilen: [],
          kategoriler: kategorilerArray
        })
      );
    });
    this.lessonsArray.controls.forEach(la => la.get('ders_adi')?.disable());

    console.log(this.lessonsArray)
  }

  addControl(indis: any) {
    let group = this.lessonsArray.at(indis) as FormGroup
    let len = Object.keys(group.controls).length

    group.addControl(`add_${len}`, this.fb.control(''))
    console.log(group)
  }

}

*/




/*createFormObjects() {
  this.formValues.map((fv: any) => {
    let categories = this.categories.filter(category => category.ders_id == fv.ders.ders_id)

    this.lessonsArray.push(this.fb.group({
      ders_adi: [fv.ders.ders_adi],
      ders_id: [fv.ders.ders_id],
      hedef_soru: [fv.hedef_soru],
      secilen: [],
      kategoriler: categories.map(category => {
        this.fb.array([
          category.kategori_id: [category.kategori_adi]
        ])
      })
    }))

    this.lessonsArray.controls.map(la => la.get('ders_adi')?.disable())
  })
}*/
