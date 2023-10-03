import { ChangeDetectorRef, Component } from '@angular/core';
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
    private authService: AuthService,
    private cdRef: ChangeDetectorRef) { }

  ngOnChanges() {
    this.isLoggedIn()
  }

  isLoggedIn(): boolean {
    console.log('headerisloggedin')
    return this.authService.isLoggedIn; // Kullanıcı oturum durumu kontrolü
  }

  logout(): void {
    this.authService.logout(); // Kullanıcıyı oturumdan çıkartma işlemi
    this.cdRef.detectChanges();
  }

  openRegisterForm() {
    var dialogref: NbDialogRef<any> = this.dialogService.openModal(RegisterComponent, true, true, 'right-modal')
    dialogref.onClose.subscribe(res => {
      console.log(res);
    })
  }


}
