import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent {

  constructor(private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private toastService: ToastService
  ) { }

  myForm!: FormGroup

  ngOnInit() {
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }

  onSubmit() {
    if (this.myForm.valid) {
      let username = this.myForm.value.username
      let password = this.myForm.value.password
      this.adminService.getAdmin(username, password).subscribe(res => {
        if (res.length)
          this.router.navigate(['admin/register'])
        else
          this.toastService.showToast('warning', 'Giriş bilgileri yanlış.')
      })
    }
  }
}
