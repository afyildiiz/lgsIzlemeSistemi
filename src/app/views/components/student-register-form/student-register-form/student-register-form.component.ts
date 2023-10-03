import { Component, Input } from '@angular/core';
import { DataBySheet } from 'src/app/models/excel-models/dataBySheet';

@Component({
  selector: 'app-student-register-form',
  templateUrl: './student-register-form.component.html',
  styleUrls: ['./student-register-form.component.css']
})
export class StudentRegisterFormComponent {

  @Input() data: any;
  databySheets: DataBySheet[] = [{
    sheet: { sheetName: 'Öğrenciler', columnNames: ['Numara', 'Ad', 'Soyad', 'E_Posta', 'Sifre', 'VeliAd', 'VeliSoyad', 'VeliTcKimlikNo'] },
    data: []
  }];
  sheetNames: any;

  ngOnInit() {
    if (this.databySheets.length)
      this.sheetNames = this.databySheets.map(d => d.sheet?.sheetName);
  }

  getData(event: any) {
    this.data = event
  }

}
