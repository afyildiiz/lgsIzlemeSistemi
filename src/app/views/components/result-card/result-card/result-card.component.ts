import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css']
})
export class ResultCardComponent {

  @Input() data: any
  status: string = ''

  ngOnInit() {
    if (this.data.performans > 85)
      this.status = 'success'
    else if (this.data.performans < 85 && this.data.performans > 70)
      this.status = 'primary'
    else if (this.data.performans < 70 && this.data.performans > 55)
      this.status = 'warning'
    else
      this.status = 'danger'
  }

}
