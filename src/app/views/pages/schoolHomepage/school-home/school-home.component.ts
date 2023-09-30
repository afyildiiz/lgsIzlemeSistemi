import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-school-home',
  templateUrl: './school-home.component.html',
  styleUrls: ['./school-home.component.css']
})
export class SchoolHomeComponent {

  items: NbMenuItem[] = [
    {
      title: 'Profil',
      expanded: true,
      children: [
        {
          title: 'Hesap Ayarları',
          link: '/school/profile',
        },
        {
          title: 'Öğretmenler',
          link: '/school/teachers',
        },
        {
          title: 'Öğrenciler',
          link: '/school/students',
        },
        {
          title: 'Mentor Ata',
          link: '/school/assign',
        },
        {
          title: 'Çıkış Yap',
        },
      ],
    }
  ];
}
