import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cities } from '../../../datamodels/cityDataModel'
import { districts } from '../../../datamodels/districtDataModel'
import { SchoolService } from 'src/app/services/school/school.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  constructor(private fB: FormBuilder,
    private schoolService: SchoolService) { }

  myForm!: FormGroup;
  selectedCity: any;
  selectedDistrict: any;
  selectedSchool: any;
  cities: any;
  districts: any;
  schools: any[] = [];

  ngOnInit() {
    this.cities = cities;
    this.myForm = this.fB.group({
      //schoolName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/)]],
      //city: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/)]],
      //district: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/)]],
      //street: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/)]],
      //fullAddress: [''],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
      e_posta: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
    })
  }

  onSelectCity(event: any) {
    this.selectedCity = this.cities[event - 1]
    this.districts = districts.filter(d => d.il_kodu == this.selectedCity.il_kodu);
  }

  onSelectDistrict(event: any) {
    this.selectedDistrict = this.districts.find((d: any) => d.ilce_adi == event);
    this.getSchools(this.selectedDistrict.il_kodu, this.selectedDistrict.ilce_kodu)
  }

  getSchools(il_kodu: number, ilce_kodu: number) {
    this.schoolService.getSchoolsByDistrict(il_kodu, ilce_kodu).subscribe(res => this.schools = res.message);
  }


  onSubmit() {
    if (this.myForm.valid) {
      return { formValues: this.myForm.value, school: this.selectedSchool };
    }
    else {
      return false;
    }
  }

}
