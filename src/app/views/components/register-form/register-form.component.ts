import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  constructor(private fB: FormBuilder) { }

  myForm!: FormGroup;

  ngOnInit() {
    this.myForm = this.fB.group({
      schoolName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/)]],
      district: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/)]],
      street: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/)]],
      fullAddress: [''],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
    })
  }

  onSubmit() {
    if (this.myForm.valid) {
      return this.myForm.value;
    }
    else {
      return false;
    }
  }

}
