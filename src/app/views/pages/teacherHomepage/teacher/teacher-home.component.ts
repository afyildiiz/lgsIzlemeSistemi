import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})
export class TeacherHomeComponent {

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

  items: NbMenuItem[] = [
    {
      title: 'Profil',
      expanded: true,
      children: [
        {
          title: 'Hesap Ayarlarım',
          link: '/teacherhomepage/profile',
        },

        {
          title: 'Çıkış Yap',
        },
      ],
    },
    {
      title: 'Öğrenciler',
      link: '/teacherhomepage/students'
    },
  ];
}

