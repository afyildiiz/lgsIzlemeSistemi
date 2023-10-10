import { Component, Input } from '@angular/core';
import { DataBySheet } from 'src/app/models/excel-models/dataBySheet';

@Component({
  selector: 'app-teacher-register-form',
  templateUrl: './teacher-register-form.component.html',
  styleUrls: ['./teacher-register-form.component.css']
})
export class TeacherRegisterFormComponent {

  @Input() data: any;
  databySheets: DataBySheet[] = [{
    sheet: { sheetName: 'Öğretmenler', columnNames: ['Ad', 'Soyad', 'Brans', 'E_Posta', 'Sifre'] },
    data: []
  }];
  sheetNames: any;

  ngOnInit() {
    if (this.databySheets.length)
      this.sheetNames = this.databySheets.map(e => e.sheet?.sheetName);
  }
  getData(event: any) {
    this.data = event
  }

}

