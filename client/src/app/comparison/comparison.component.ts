
import { Component, Input, OnInit } from '@angular/core';
import { ComparisonService } from '../comparison.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {

  constructor(private comparisonService: ComparisonService) { }

  @Input() dates: string[] = this.comparisonService.toCompare.getValue()[0];

  ngOnInit(): void {
    const toCompare = this.comparisonService.toCompare.getValue();
    const dates: string[] = [];

    for (let el of toCompare) {
      dates.push(el[0]);
    }

    this.dates = dates;
  }




}
