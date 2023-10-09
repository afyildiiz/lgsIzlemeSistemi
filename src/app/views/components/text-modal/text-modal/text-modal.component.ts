import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { LessonCategoryService } from 'src/app/services/lesson-category/lesson-category.service';
import { EMPTY, catchError, finalize, forkJoin, from, mergeMap, of, switchMap, tap } from 'rxjs'
import { NbDialogRef } from '@nebular/theme';
import { LogService } from 'src/app/services/log/log.service';
import { StudentService } from 'src/app/services/student/student.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';

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
    private fb: FormBuilder,
    private dialogservice: DialogService) {

  }

  @Input() formValues: any
  myForm!: FormGroup
  isUpdate: boolean = false
  categories: any[] = []
  categoriesLen: number = 0
  currentTeacher: any
  selectedYear: any = ''
  selectedMonth: any = ''
  students: any[] = []
  selectedStudent: any = ''
  studentids: string = ''
  months: any[] = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Agustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ]
  ngOnInit() {
    this.getCurrentLesson()
    this.currentTeacher = localStorage.getItem('currentTeacher')
    this.currentTeacher = JSON.parse(this.currentTeacher)

    this.myForm = this.fb.group({
      subjects: this.fb.array([])
    })
    this.getCategories()
    this.getStudents()

    this.subjects.valueChanges.subscribe((newWalue) => this.formChange(newWalue))
  }

  dersAdi!: string;
  getCurrentLesson() {
    this.dialogservice.getDersAdi().subscribe((dersAdi: any) => {
      this.dersAdi = dersAdi;
    });
  }

  get subjects() {
    return this.myForm.get('subjects') as FormArray

  }

  getCategories() {
    this.lessonCategoryService.getCategoriesByLessonid(this.formValues.ders.ders_id).pipe(
      tap(res => this.categories = res),
    ).subscribe(() => this.addSubject())
  }

  getGeneralPerformByLessonId() {
    /*let ids = this.students.map((student: any) => {
      `'${student.ogrenci_id}'`
    }).join(',')*/

    this.logService.getGeneralPerformByStudentIds(this.studentids).subscribe(res => console.log(res))
  }

  filteredCategories: any[] = []

  addSubject(data?: any) {
    this.categories.map((cat: any) => {
      const group = this.fb.group({
        [cat.kategori_id]: [cat.kategori_adi],
        hedef_soru: []
      })
      this.subjects.push(group)
    })

    console.log(this.subjects.controls)
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
    value.map((val: any) => this.toplam += val.hedef_soru)
    this.formValues.hedef_soru = this.toplam
  }

  getStudents() {
    this.studentService.getStudentsByTeacherId(this.currentTeacher.id).pipe(
      tap(res => this.students = res),
    ).subscribe(() => this.studentids = this.students.map(student => `'${student.ogrenci_id}'`).join(','))
  }

  data: any[] = []

  getGoals() {
    if (this.selectedStudent && this.selectedYear)
      this.logService.getGoalsByLessonId(this.selectedStudent, this.formValues.ders.ders_id, { year: this.selectedYear, month: this.selectedMonth }).pipe(
        tap(res => {
          this.data = res
          if (res.length) {
            this.formValues.hedef_soru = res[0]?.aylik_hedef_soru
            this.isUpdate = true
          }
        }),
      ).subscribe(() => {
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
  insertedids: any[] = []
  updatedids: any[] = []

  openUpdateDialog(student: any, array: any[]) {
    const text = `${student.ad} ${student.soyad} adlı öğrencinin belirtilen tarihte girilmiş bir hedefi bulunmakta. Değerleri güncellemek ister misiniz?`;
    return this.dialogservice.openUpdateModal(text).onClose.pipe(
      switchMap(response => {
        if (response == true) {
          return from(array).pipe(
            mergeMap(arr => {
              console.log(arr)
              console.log(student.ogrenci_id)
              return this.logService.updateNote(student.ogrenci_id, {
                kategori_id: arr.kategori_id,
                hedef_soru: arr.hedef_soru,
                aylik_hedef_soru: arr.aylik_hedef_soru
              }, { yil: this.selectedYear, ay: this.selectedMonth });
            })
          );
        } else {
          this.updatedids.push(student.ogrenci_id);
          this.insertedids = this.insertedids.filter(id => !this.updatedids.includes(id)
          )
          return EMPTY
        }
      }),
      tap(() => {
        // Güncelleme işlemi tamamlandığında updatedids dizisini güncelle
        this.updatedids.push(student.ogrenci_id);

        this.insertedids = this.insertedids.filter(id => !this.updatedids.includes(id)
        )
      })
    );
  }

  /*
    son hali
  save() {
    let insertedids: any[] = [];
    let array: any[] = [];
    let studentids: string = '';

    this.subjects.controls.map((c: any, indis: number) => {
      array.push({ kategori_id: Object.keys(c.value)[0], hedef_soru: c.value.hedef_soru, aylik_hedef_soru: this.formValues.hedef_soru });
    });

    if (this.selectedStudent === 'all') {
      this.insertedids = this.students.map(st => st.ogrenci_id)

      studentids = this.students.map(st => `'${st.ogrenci_id}'`).join(',');
    } else {
      this.insertedids.push(this.selectedStudent)
      studentids = `'${this.selectedStudent}'`;
    }

    // Daha sonra bu işlemleri kullanabilirsiniz
    this.logService.isUpdated(studentids, { yil: this.selectedYear, ay: this.selectedMonth }).pipe(
      switchMap(res => {
        if (res.length) {
          return forkJoin(res.map((student: any) => this.openUpdateDialog(student, array)));
        } else {
          return of([]);
        }
      }),
      tap(updatedResponses => {
        // Güncelleme yanıtlarını işleyin
        console.log(updatedResponses);
      }),
      catchError(error => {
        // Hata işleme
        console.error(error);
        return of([]);
      })
    ).subscribe(() => {
      // İşlem tamamlandığında yapılacaklar
      // Update işlemi tamamlandığında yapılacaklar
      this.students.forEach(student => {
        if (!this.updatedids.includes(student.ogrenci_id)) {
          insertedids.push(student.ogrenci_id);
        }
      });

      // İşlem tamamlandığında insertedids dizisini güncelle

      if (this.insertedids.length) {
        this.insertedids.map(id => {
          console.log(id)
          array.map(arr => {
            console.log(arr)
            this.logService.insertNote(id, this.formValues.ders.ders_id, this.selectedYear, this.selectedMonth,
              {
                kategori_id: arr.kategori_id,
                hedef_soru: arr.hedef_soru || 0,
                aylik_hedef_soru: arr.aylik_hedef_soru
              }).subscribe()
          })
          this.insertedids.shift()

        })
      }
    });

  }*/
  save() {
    let array: any[] = [];
    let studentids: string = '';

    this.subjects.controls.map((c: any, indis: number) => {
      array.push({ kategori_id: Object.keys(c.value)[0], hedef_soru: c.value.hedef_soru, aylik_hedef_soru: this.formValues.hedef_soru });
    });

    if (this.selectedStudent === 'all') {
      this.insertedids = this.students.map(st => st.ogrenci_id)

      studentids = this.students.map(st => `'${st.ogrenci_id}'`).join(',');
    } else {
      this.insertedids.push(this.selectedStudent)

      studentids = `'${this.selectedStudent}'`;
    }
    console.log(studentids)

    // Daha sonra bu işlemleri kullanabilirsiniz
    this.logService.isUpdated(studentids, { yil: this.selectedYear, ay: this.selectedMonth }, this.formValues.ders.ders_id).pipe(
      switchMap(res => {
        if (res.length) {
          return forkJoin(res.map((student: any) => this.openUpdateDialog(student, array)));
        } else {
          return of([]);
        }
      }),
      tap(updatedResponses => {
        // Güncelleme yanıtlarını işleyin
        console.log(updatedResponses);
      }),
      catchError(error => {
        // Hata işleme
        console.error(error);
        return of([]);
      })
    ).subscribe(() => {

      // İşlem tamamlandığında insertedids dizisini güncelle
      if (this.insertedids.length) {
        this.insertedids.forEach(id => {
          console.log(id);
          array.forEach(arr => {
            console.log(arr);
            this.logService.insertNote(id, this.formValues.ders.ders_id, this.selectedYear, this.selectedMonth,
              {
                kategori_id: arr.kategori_id,
                hedef_soru: arr.hedef_soru || 0,
                aylik_hedef_soru: arr.aylik_hedef_soru
              }).subscribe();
          });
        });
        this.insertedids = []; // insertedids dizisini boşaltın
      }
    });
  }


}


/*save() {

  let array: any[] = []
  this.subjects.controls.map((c: any, indis: number) => {
    array.push({ kategori_id: Object.keys(c.value)[0], hedef_soru: c.value.hedef_soru, aylik_hedef_soru: this.formValues.hedef_soru })
  })

  let studentids: string = ''

  if (this.selectedStudent === 'all') {
    studentids = this.students.map(st => `'${st.ogrenci_id}'`).join(',')
  } else {
    studentids = `'${this.selectedStudent}'`
  }

  let insertedids: any[] = []

  let updatedids: any[] = []

  this.logService.isUpdated(studentids, { yil: this.selectedYear, ay: this.selectedMonth }).subscribe(res => {
    if (res.length) {
      let text: string = ''
      res.map((res: any) => {
        updatedids.push(res.ogrenci_id)
        text = `${res.ad} ${res.soyad} adlı öğrencinin belirtilen tarihte girilmiş bir hedefi bulunmakta. Değerleri güncellemek ister misiniz?`
        this.dialogservice.openUpdateModal(text).onClose.pipe(
          tap(response => {
            if (response) {
              array.map((arr: any) => {
                if (arr.hedef_soru) {
                  this.logService.updateNote(res.ogrenci_id, {
                    kategori_id: arr.kategori_id, hedef_soru: arr.hedef_soru
                    , aylik_hedef_soru: arr.aylik_hedef_soru
                  }, { yil: this.selectedYear, ay: this.selectedMonth }).subscribe(res => console.log(res))
                }
              })
            }
          })
        )
      })
    }
  })
  this.students.map(student => {
    if (!updatedids.includes(student))
      insertedids.push(student.ogrenci_id)
  })

}*/

/*
  save() {
 
    let insertedids: any[] = []
    let updatedids: any[] = []
    let array: any[] = []
    let studentids: string = ''
 
    this.subjects.controls.map((c: any, indis: number) => {
      array.push({ kategori_id: Object.keys(c.value)[0], hedef_soru: c.value.hedef_soru, aylik_hedef_soru: this.formValues.hedef_soru })
    })
 
    if (this.selectedStudent === 'all') {
      studentids = this.students.map(st => `'${st.ogrenci_id}'`).join(',')
    } else {
      studentids = `'${this.selectedStudent}'`
    }
 
    this.logService.isUpdated(studentids, { yil: this.selectedYear, ay: this.selectedMonth }).pipe(
      tap(res => {
        if (res.length) {
          res.map((res: any) => {
            updatedids.push(res.ogrenci_id)
            let text = `${res.ad} ${res.soyad} adlı öğrencinin belirtilen tarihte girilmiş bir hedefi bulunmakta. Değerleri güncellemek ister misiniz?`
            this.dialogservice.openUpdateModal(text).onClose.pipe(
              tap(response => {
                console.log(response)
                if (response == true) {
                  array.map((arr: any) => {
                    if (arr.hedef_soru) {
                      this.logService.updateNote(res.ogrenci_id, {
                        kategori_id: arr.kategori_id, hedef_soru: arr.hedef_soru
                        , aylik_hedef_soru: arr.aylik_hedef_soru
                      }, { yil: this.selectedYear, ay: this.selectedMonth }).subscribe(res => console.log(res))
                    }
                  })
                }
              })
            ).subscribe()
          })
        }
      })
    ).subscribe()
 
    this.students.map((student: any) => {
      if (!updatedids.includes(student.ogrenci_id)) {
        insertedids.push(student.ogrenci_id)
      }
    })
 
 
    insertedids.map(id => {
      array.map((arr: any) => {
        if (arr.hedef_soru) {
          this.logService.insertNote(id, this.formValues.ders.ders_id, this.selectedYear, this.selectedMonth, {
            aylik_hedef_soru: arr.aylik_hedef_soru, hedef_soru: arr.hedef_soru, kategori_id: arr.kategori_id
          }).subscribe(res => console.log(res))
        }
      })
    })
  }
  */