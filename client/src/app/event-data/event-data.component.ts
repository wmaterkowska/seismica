import { Component, OnInit } from '@angular/core';
import { EventDataService } from '../event-data.service';

@Component({
  selector: 'app-event-data',
  templateUrl: './event-data.component.html',
  styleUrls: ['./event-data.component.css']
})
export class EventDataComponent implements OnInit {

  constructor(private dataService: EventDataService) { }

  data: string[] = [];

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
    // console.log(this.data, 'data event-data component');
  }

}
