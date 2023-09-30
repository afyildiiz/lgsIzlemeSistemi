import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent {

  currentStudent: any;

  ngOnInit() {
    this.currentStudent = localStorage.getItem('currentStudent');
    this.currentStudent = JSON.parse(this.currentStudent);
  }

  items: NbMenuItem[] = [
    {
      title: 'Profil',
      expanded: true,
      children: [
        {
          title: 'Hesap Ayarlarım',
          link: '/student/profile',
        },

        {
          title: 'Çıkış Yap',
        },
      ],
    },
  ];
}
