import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {


  constructor(private router: Router) { }

  navigate(path: string,loggedFor?:string) {
    switch (path){
      case 'student':
        loggedFor='Öğrenci'
        break;
      case 'teacher':
        loggedFor='Öğretmen'
        break;
      case 'admin':
        loggedFor='Yönetici'
        break
    }
    this.router.navigate(['/login'], { state: { path: path, loggedFor:loggedFor}})


    
  }

}
