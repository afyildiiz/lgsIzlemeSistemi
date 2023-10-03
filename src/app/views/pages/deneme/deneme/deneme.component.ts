import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-deneme',
  templateUrl: './deneme.component.html',
  styleUrls: ['./deneme.component.css']
})
export class DenemeComponent {

  constructor(private fb: FormBuilder) { }

  myForm!: FormGroup;
  currentIndex: number = 0;

  ngOnInit() {
    this.myForm = this.fb.group({
      teachers: this.fb.array([this.createTeacher()])
    })
  }
  get teachers() {
    return this.myForm.get('teachers') as FormArray;
  }

  createTeacher(): FormGroup {
    return this.fb.group({
      name: [''],
      surname: [''],
      age: ['']
    });
  }

  addTeacher() {
    this.teachers.push(this.createTeacher());
    console.log(this.teachers)
  }

  save() {
    console.log(this.myForm.value)
  }

}
