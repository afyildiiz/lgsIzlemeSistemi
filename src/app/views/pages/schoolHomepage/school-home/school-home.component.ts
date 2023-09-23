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
          link: '/schoolhomepage/profile',
        },
        {
          title: 'Öğretmenler',
          link: '/schoolhomepage/teachers',
        },
        {
          title: 'Öğrenciler',
          link: '/schoolhomepage/students',
        },
        {
          title: 'Çıkış Yap',
        },
      ],
    }
  ];
}
