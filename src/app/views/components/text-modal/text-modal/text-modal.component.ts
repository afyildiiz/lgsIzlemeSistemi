import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { LessonCategoryService } from 'src/app/services/lesson-category/lesson-category.service';
import { tap } from 'rxjs'
import { NbDialogRef } from '@nebular/theme';
import { LogService } from 'src/app/services/log/log.service';
import { StudentService } from 'src/app/services/student/student.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-text-modal',
  templateUrl: './text-modal.component.html',
  styleUrls: ['./text-modal.component.css']
})
export class TextModalComponent {

  constructor(private lessonCategoryService: LessonCategoryService,
    private dialogRef: NbDialogRef<TextModalComponent>,
    private studentService: StudentService,
    private toastService: ToastService,
    private logService: LogService,
    private fb: FormBuilder) {

  }

  @Input() formValues: any
  myForm!: FormGroup
  isUpdate: boolean = false
  categories: any[] = []
  categoriesLen: number = 0
  currentTeacher: any
  selectedYear: any=''
  selectedMonth: any=''
  students: any[] = []
  selectedStudent: any=''
  studentids: string = ''
  months: any[] = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Agustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ]

  ngOnInit() {
    this.currentTeacher = localStorage.getItem('currentTeacher')
    this.currentTeacher = JSON.parse(this.currentTeacher)

    this.myForm = this.fb.group({
      //lessonsArray: this.fb.array([]),
      subjects: this.fb.array([])
    })
    this.getCategories()
    this.getStudents()

    //this.myForm.valueChanges.subscribe(newFormValue => this.change(newFormValue))


    this.subjects.valueChanges.subscribe(newValue => this.formChange(newValue))
  }


  /*get lessonsArray() {
    return this.myForm.get('lessonsArray') as FormArray
  }
  */

  get subjects() {
    return this.myForm.get('subjects') as FormArray

  }

  getCategories() {
    this.lessonCategoryService.getCategoriesByLessonid(this.formValues.ders.ders_id).pipe(
      tap(res => this.categories = res),
    ).subscribe()    //() => this.createForm()
    //() => this.filteredCategories = this.categories.filter(category => category.ders_id == this.formValues.ders.ders_id)
  }

  filteredCategories: any[] = []


  /*
  createForm() {
    this.filteredCategories = this.categories.filter(category => category.ders_id == this.formValues.ders.ders_id)
    let count = Math.floor(this.formValues.hedef_soru / this.filteredCategories.length)

    this.filteredCategories.map(category => {
      const group = this.fb.group({
        [category.kategori_id]: [category.kategori_adi],
        hedef_soru: [count],
      })
      this.lessonsArray.push(group)
    })
  }
  */

  //cat: any[] = []

  addSubject(data?: any) {
    // this.data dizisinden tüm kategori_id'leri içeren bir dizi oluşturun
    const dataKategoriIds = this.data.map(dataItem => dataItem.kategori_id);

    // filteredCategories dizisini dataKategoriIds kullanarak filtreleyin
    this.filteredCategories = this.filteredCategories.filter(fC => {
      return !dataKategoriIds.includes(fC.kategori_id);
    });

    this.filteredCategories.map(f => console.log(f))

    if (data) {
      let array: any[] = [];
      data.forEach((d: any) => {
        array.push({ ders_id: d.ders_id, kategori_id: d.kategori_id, kategori_adi: d.kategori_adi });
        const group = this.fb.group({
          [d.kategori_id]: [d.kategori_adi],
          goal: [d.hedef_soru],
        });
        this.subjects.push(group);
        this.categoriesLen++;
      });
    }
    else if (this.filteredCategories.length > 0) { // this.data.length yerine filteredCategories.length kullanıldı
      let first = this.filteredCategories[0]

      const group = this.fb.group({
        [first.kategori_id]: [first.kategori_adi],
        goal: [''],
      });

      this.subjects.push(group);
      this.data.push(first);
      this.categoriesLen++;
      //this.filteredCategories.shift(); // Ekledikten sonra ilk elemanı kaldırın
    }
    else {
      const group = this.fb.group({
        subject: [''],
        goal: [''],
      });
      this.subjects.push(group);
      this.categoriesLen++;
    }

    console.log(this.filteredCategories);
    console.log(this.data);
  }

  isGreater() {
    if (this.formValues.hedef_soru < this.toplam) {
      this.toastService.showToast("danger", "Toplam hedef soru kategori bazlı hedef sorulardan küçük olamaz.")
      this.formValues.hedef_soru = this.toplam
    }
  }

  toplam: number = 0

  formChange(value: any) {
    this.toplam = 0

    let array: any[] = []
    let subjects: any[] = value.map((val: any) => val.subject)

    this.subjects.controls.map((e: any) => this.toplam += e.value.goal)

    this.categories.map((cat: any) => {
      if (!subjects.includes(cat.kategori_id))
        array.push(cat)
    })
    this.filteredCategories = array

    if (!this.isUpdate)
      this.formValues.hedef_soru = this.toplam
  }
  /*
    change(event: any) {
  
      let toplam: number = 0
      event.lessonsArray.map((e: any) => {
        toplam += e.hedef_soru
      })
      this.formValues.hedef_soru = toplam
    }
    */

  getStudents() {
    this.studentService.getStudentsByTeacherId(this.currentTeacher.id).pipe(
      tap(res => this.students = res)
    ).subscribe(() => this.studentids = this.students.map(student => `'${student.ogrenci_id}'`).join(','))
  }

  data: any[] = []

  updateYear() {
    this.toplam = 0
    this.formValues.hedef_soru = 0
    this.selectedMonth = null
    this.isUpdate = false

    this.subjects.clear()
  }

  updateMonth() {
    this.toplam = 0
    this.formValues.hedef_soru = 0
    this.isUpdate = false

    this.subjects.clear()

    this.getGoals()
  }

  updateStudent() {
    this.selectedMonth = null
    this.toplam = 0
    this.subjects.clear()
  }

  getGoals() {
    if (this.selectedStudent && this.selectedYear)
      this.logService.getGoalsByLessonId(this.selectedStudent, this.formValues.ders.ders_id, { year: this.selectedYear, month: this.selectedMonth + 1 }).pipe(
        tap(res => {
          this.data = res
          if (res.length) {
            this.formValues.hedef_soru = res[0]?.aylik_hedef_soru // toplam hedef soruyu al dbden
            this.isUpdate = true
          }
        }),
      ).subscribe(() => {
        if (this.data.length)
          this.addSubject(this.data)
      })
  }

  close() {
    this.dialogRef.close()
  }

  update() {
    let array: any[] = []
    this.subjects.controls.map(c => {
      array.push({ kategori_id: Object.keys(c.value)[0], hedef_soru: c.value.goal })
    })


    array.map(item => {
      this.logService.updateStudentNote(this.selectedStudent, {
        cozulen_soru: 0, dogru_sayisi: 0, yanlis_sayisi: 0, hedef_soru: item.hedef_soru,
        lesson_id: this.formValues.ders.ders_id, aylik_hedef_soru: this.formValues.hedef_soru,
        kategori_id: item.kategori_id, ay: this.selectedMonth + 1, yil: this.selectedYear
      }).subscribe(res => console.log(res))
    })
  }

  save() {
    /*let array: any[] = []
    this.lessonsArray.controls.map(c => {
      array.push({ kategori_id: Object.keys(c.value)[0], hedef_soru: c.value.hedef_soru })
    })

    this.students.map(student => {
      array.map(array => {
        this.logService.insertNote(student.ogrenci_id, this.formValues.ders.ders_id, this.selectedMonth + 1, array).subscribe(res => console.log(res))
        //console.log(this.selectedMonth + 1 )
        //console.log(student.ogrenci_id, this.formValues.ders.ders_id, array)
      })
    })*/

    let array: any[] = []
    this.subjects.controls.map(c => {
      array.push({ kategori_id: c.value.subject, hedef_soru: c.value.goal, aylik_hedef_soru: this.formValues.hedef_soru })
    })

    console.log(array, this.selectedMonth, this.selectedStudent, this.formValues)


    array.map(array => {
      this.logService.insertNote(this.selectedStudent, this.formValues.ders.ders_id, this.selectedYear,
        this.selectedMonth + 1, array).subscribe(res => console.log(res))
    })
  }
}

/*
    this.students.map(student => {
      array.map(array => {
        this.logService.insertNote(student.ogrenci_id, this.formValues.ders.ders_id, this.selectedMonth + 1, array).subscribe(res => console.log(res))
        //console.log(this.selectedMonth + 1 )
        //console.log(student.ogrenci_id, this.formValues.ders.ders_id, array)
      })
    })
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
