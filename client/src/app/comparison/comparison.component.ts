import { Component, Input, OnInit } from '@angular/core';
import { ComparisonService } from '../comparison.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {
  @Input() earthquakesD: string[] = [];


  constructor(private comparisonService: ComparisonService) { }

  ngOnInit(): void {
    this.earthquakesD = this.comparisonService.earthquakesD.getValue();
  }





}
