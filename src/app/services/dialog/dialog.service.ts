import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { BehaviorSubject } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/views/components/confirmation-modal/confirmation-modal/confirmation-modal.component';
import { DeleteUserComponent } from 'src/app/views/components/delete/delete-user/delete-user.component';
import { ResultCardComponent } from 'src/app/views/components/result-card/result-card/result-card.component';
import { StudentDetailComponent } from 'src/app/views/components/student-detail/student-detail/student-detail.component';
import { TextModalComponent } from 'src/app/views/components/text-modal/text-modal/text-modal.component';
import { UpdateNoteComponent } from 'src/app/views/components/update-note/update-note/update-note.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private nbdialogService: NbDialogService) { }

  private dersAdiSubject = new BehaviorSubject<string>('');

  setDersAdi(dersAdi: string) {
    this.dersAdiSubject.next(dersAdi);
  }

  getDersAdi() {
    return this.dersAdiSubject.asObservable();
  }


  openModal(component: ComponentType<any>, hasBackdrop: boolean, hasScroll: boolean, customclassName?: string, data?: any) {
    const dialogRef = this.nbdialogService.open(component, {
      hasBackdrop: hasBackdrop,
      hasScroll: hasScroll,
      dialogClass: customclassName,
      context: { data: data }
    });
    return dialogRef
  }

  openConfirmationModal(lesson_id: string, ogrenci_numarasi: string, customclassName?: string) {
    const dialogRef = this.nbdialogService.open(ConfirmationModalComponent, {
      hasBackdrop: true,
      hasScroll: true,
      dialogClass: customclassName,
      context: {
        lesson_id: lesson_id,
        student_id: ogrenci_numarasi
      },
    })
    return dialogRef;
  }

  openTextModal(data: any, customclassName?: string) {
    const dialogRef = this.nbdialogService.open(TextModalComponent, {
      hasBackdrop: true,
      hasScroll: true,
      dialogClass: customclassName,
      context: {
        formValues: data,
      }
    })
    return dialogRef;
  }

  openPerformModal(data: any) {
    const dialogRef = this.nbdialogService.open(ResultCardComponent, {
      hasBackdrop: true,
      hasScroll: true,
      context: {
        data: data,
      }
    })
    return dialogRef;
  }

  openDeleteModal(deleted: any) {
    const dialogRef = this.nbdialogService.open(DeleteUserComponent, {
      hasBackdrop: true,
      hasScroll: true,
      context: {
        deleted: deleted,
      }
    })
    return dialogRef;
  }

  openUpdateModal(text: string) {
    const dialogRef = this.nbdialogService.open(UpdateNoteComponent, {
      hasBackdrop: true,
      hasScroll: true,
      context: {
        text: text
      }
    })
    return dialogRef;
  }

  openStudentPerformModal(student: any) {
    const dialogRef = this.nbdialogService.open(StudentDetailComponent, {
      hasBackdrop: true,
      hasScroll: true,
      context: {
        student: student
      }
    })
    return dialogRef;
  }
}