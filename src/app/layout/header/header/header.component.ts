import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DialogService } from '../../../services/dialog/dialog.service';
import { RegisterComponent } from '../../../views/pages/register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private dialogService: DialogService) { }


  openRegisterForm() {
    var dialogref: NbDialogRef<any> = this.dialogService.openModal(RegisterComponent, true, true, 'right-modal')
    dialogref.onClose.subscribe(res => {
      console.log(res);
    })
  }
  

}
