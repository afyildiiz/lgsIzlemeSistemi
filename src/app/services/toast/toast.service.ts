import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastrService: NbToastrService) { }

  showToast(status: string, message: string) {
    switch (status) {
      case 'success':
        this.toastrService.success(message, 'Başarılı');
        break;

      case 'danger':
        this.toastrService.danger(message, 'Tehlike');
        break;

      case 'warning':
        this.toastrService.warning(message, 'Uyarı');
        break;

      case 'info':
        this.toastrService.info(message, 'Bilgilendirme');
        break;

      default:
        this.toastrService.default(message, status);
        break;
    }
  }
}
