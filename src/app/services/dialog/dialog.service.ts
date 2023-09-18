import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private nbdialogService: NbDialogService) { }

  openModal(component: ComponentType<any>, hasBackdrop: boolean, hasScroll: boolean, customclassName?: string, data?: any) {
    const dialogRef = this.nbdialogService.open(component, {
      hasBackdrop: hasBackdrop,
      hasScroll: hasScroll,
      dialogClass: customclassName,
      context: { data: data }
    });
    return dialogRef
  }

}