//@ts-nocheck

import { Component, Input } from '@angular/core';
import { ComparisonService } from '../comparison.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent {

  constructor(private comparisonService: ComparisonService) { }

  @Input() dates: string[] = this.comparisonService.toCompare.getValue().slice(1);

}
