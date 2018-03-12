import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
  // Inputs
  @Input() titulo: string;
  @Input() data: number[];
  @Input() labels: string[];

  constructor() { console.log(this.data); }

  ngOnInit() {
    console.log(this.data);
  }

}


