import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { StudentService } from 'src/app/services/student/student.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {

  @Input() deleted: any

  constructor(private dialogRef: NbDialogRef<DeleteUserComponent>,
    private studentService: StudentService,
    private teacherService: TeacherService) { }

  ngOnInit() {
    console.log(this.deleted)
  }

  deleteUser(action: boolean) {
    if (action) {
      console.log('silindi')
      /*
      if(this.deleted.ogrenci_numarasi){
        this.studentService.deleteStudent(this.deleted.ogrenci_id).subscribe(res => console.log(res))
      }else {
        this.teacherService.deleteTeacher(this.deleted.id).subscribe(res => console.log(res))
      }
      */
    }
    else {
      this.dialogRef.close()
    }
  }

}
