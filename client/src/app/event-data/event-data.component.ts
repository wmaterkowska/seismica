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

  clicked: boolean = false;

  ngOnInit(): void {
    this.dataService.dataE.subscribe(evD => {
      if (evD) {

        evD.splice(1, 1);
        evD.splice(-1, 1);

        let dataSeparately: string[] = [];
        evD.forEach((data) => {
          dataSeparately.push(...data.split(': '));
        });

        this.data = dataSeparately;

        let button = document.getElementById('add-btn');
        if (button) {
          button.classList.replace('clicked', 'add-btn');
        }
        this.clicked = false;
      }
    });
  }


  addToCompare() {

    if (this.clicked === false) {

      let dat = '';
      this.mapService.dateOfEvent$.subscribe(d => { dat = d });
      if (this.comparisonService.toCompare.getValue().length < 4) {
        this.comparisonService.toCompare.next(this.comparisonService.toCompare.getValue().concat(dat))
      } else {
        alert('You reached the limit of earthquakes to compare.')
      }

      let button = document.getElementById('add-btn');
      if (button) {
        button.classList.replace('add-btn', 'clicked');
      }
      this.clicked = true;
    } else {
      let newToCompare = this.comparisonService.toCompare.getValue().filter((date) => date !== date);
      this.comparisonService.toCompare.next(newToCompare);

      let button = document.getElementById('add-btn');
      if (button) {
        button.classList.replace('clicked', 'add-btn');
      }
      this.clicked = false;
    }

    console.log(this.comparisonService.toCompare.getValue(), 'to compare');

  }


}
