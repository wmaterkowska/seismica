//@ts-nocheck

import { Component, Input, OnInit } from '@angular/core';
import { ComparisonService } from '../comparison.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {


  constructor(private comparisonService: ComparisonService) { }

  @Input() dates: string[] = this.comparisonService.toCompare.getValue().slice(1);

  ngOnInit(): void {

    this.getEventsToCompareData();

    console.log(this.events, 'events==============')
  }

  async getEventsToCompareData() {

    // this.events = await this.comparisonService.getDataToCompare();
    // console.log(this.events, 'events ++++++++++++++++++');
    // return this.events;
    // this.events = await this.comparisonService.earthquakesD.getValue();
  }




}
