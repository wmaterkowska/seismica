//@ts-nocheck

import { Component, Input, OnInit } from '@angular/core';
import { ComparisonService } from '../comparison.service';
import { EventDataService } from '../event-data.service';
import { WaveService } from '../wave.service';
import { earthquakeData } from '../earthquakesData';

@Component({
  selector: 'app-earthquake-card',
  templateUrl: './earthquake-card.component.html',
  styleUrls: ['./earthquake-card.component.css']
})
export class EarthquakeCardComponent implements OnInit {

  @Input()
  date?: string = '';

  data?: string[] = [];

  constructor(private comparisonService: ComparisonService,
    private eventDataService: EventDataService,
    private waveService: WaveService) { }

  ngOnInit(): void {

    this.showEventData();
  }


  async showEventData() {

    (await this.eventDataService.getEventData(this.date))
      .subscribe(evD => {

        console.log(evD, 'data earthquake card');
        this.data = evD.eventData.metadata;
        this.waveService.plotWave(evD.eventData.wave, this.date);

        evD.EventData.metadata.splice(1, 1);
        evD.EventData.metadata.splice(-1, 1);

        let dataSeparate: string[] = []
        evD.eventData.metadata.forEach(element => {
          dataSeparate.push(...element.split(':'));
        });

        this.eventDataService.loadEventData(dataSeparate);
      });

  }



}
