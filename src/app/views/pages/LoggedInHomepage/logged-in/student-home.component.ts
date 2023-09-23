import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent {

  items: NbMenuItem[] = [
    {
      title: 'Profil',
      expanded: true,
      children: [
        {
          title: 'Hesap Ayarlarım',
          link: '/studenthomepage/profile',
        },

        {
          title: 'Çıkış Yap',
        },
      ],
    },
    {
      title: 'Derslerim',
      expanded: true,
      link: '/studenthomepage/lessons'
    }
  ];
}
