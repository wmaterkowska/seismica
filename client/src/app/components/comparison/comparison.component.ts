
import { Component, Input, OnInit } from '@angular/core';
import { ComparisonService } from '../../services/comparison.service';

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
    //local storage 
    const toCompareStorage = JSON.parse(localStorage.getItem('toCompare') || '[]');


    for (let el of toCompareStorage) {
      dates.push(el[0]);
    }


    this.dates = dates;
  }
}
