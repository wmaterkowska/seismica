import { Component, Input, OnInit } from '@angular/core';
import { EventDataService } from '../event-data.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MapService } from '../map.service';
import { ComparisonService } from '../comparison.service';

@Component({
  selector: 'app-event-data',
  templateUrl: './event-data.component.html',
  styleUrls: ['./event-data.component.css']
})
export class EventDataComponent implements OnInit {

  constructor(private dataService: EventDataService, private mapService: MapService, private comparisonService: ComparisonService) { }

  @Input()
  data?: string[] = [];

  ngOnInit(): void {
    this.dataService.dataE.subscribe(evD => {
      if (evD) {

        evD.splice(1, 1);
        evD.splice(-1, 1)

        let dataSeparately: string[] = [];
        evD.forEach((data) => {
          dataSeparately.push(...data.split(': '));
        });

        this.data = dataSeparately;
      }
    });
  }


  addToCompare() {
    let dat = '';
    this.mapService.dateOfEvent$.subscribe(d => { dat = d });
    if (this.comparisonService.toCompare.getValue().length < 4) {
      console.log(dat, 'dat----------------------------')
      this.comparisonService.toCompare.next(this.comparisonService.toCompare.getValue().concat(dat))
    } else {
      alert('You reached the limit of earthquakes to compare.')
    }
    console.log(this.comparisonService.toCompare.getValue());
  }

}
