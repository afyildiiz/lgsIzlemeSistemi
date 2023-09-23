import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DialogService } from '../../../services/dialog/dialog.service';
import { RegisterComponent } from '../../../views/pages/register/register.component';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private dialogService: DialogService,
    private authService: AuthService) { }

  isLoggedIn: boolean = false;

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(res => {
      this.isLoggedIn = res
    });
  }

  ngOnChanges() {
    this.authService.isLoggedIn.subscribe(res => this.isLoggedIn = res);
    console.log(this.isLoggedIn)
  }

  openRegisterForm() {
    var dialogref: NbDialogRef<any> = this.dialogService.openModal(RegisterComponent, true, true, 'right-modal')
    dialogref.onClose.subscribe(res => {
      console.log(res);
    })
  }


}
