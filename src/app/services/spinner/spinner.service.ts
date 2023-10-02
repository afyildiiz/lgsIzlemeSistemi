import { Injectable } from '@angular/core';
import { NbSpinnerService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinnerService: NbSpinnerService,
    ) { }

}
