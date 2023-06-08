import { Component, OnInit } from '@angular/core';
import { EventDataService } from '../event-data.service';
import { WaveService } from '../wave.service';

@Component({
  selector: 'app-event-data',
  templateUrl: './event-data.component.html',
  styleUrls: ['./event-data.component.css']
})
export class EventDataComponent implements OnInit {

  constructor(private dataService: EventDataService, private wave: WaveService) { }

  event: number[] = [];

  ngOnInit(): void {
    this.dataService.event$.subscribe((evnt: number[]) => {
      this.event = evnt;

      this.wave.plotWave(evnt);
      return this.event;
    })
  }

}
