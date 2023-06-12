//@ts-nocheck

import { Component, Input, OnInit } from '@angular/core';
import { EventDataService } from '../event-data.service';
import { WaveService } from '../wave.service';
import { ComparisonService } from '../comparison.service';

@Component({
  selector: 'app-earthquake-card',
  templateUrl: './earthquake-card.component.html',
  styleUrls: ['./earthquake-card.component.css']
})
export class EarthquakeCardComponent implements OnInit {

  @Input()
  date?: string = '';

  data?: string[] = [];

  dataLoaded: boolean = false;

  constructor(private eventDataService: EventDataService,
    private waveService: WaveService,
    private comparisonService: ComparisonService) { }

  ngOnInit(): void {

    this.showEventData();
  }


  async showEventData() {

    // this.eventDataService.showloader(this.date);


    const eventsToCompare = this.comparisonService.toCompare.getValue()
    let text: string = '';
    for (let i = 0; i < eventsToCompare.length; i++) {
      if (eventsToCompare[i][0] === this.date) {
        text = eventsToCompare[i][1];
      }
    }

    (await this.eventDataService.getEventData(this.date))
      .subscribe((evD) => {

        this.waveService.plotWave(evD.eventData.wave, this.date);

        let dataToLoad = [text, ...evD.eventData.metadata]

        this.eventDataService.loadEventData(dataToLoad);
        this.eventDataService.dataE.subscribe(dta => {
          const dataToShow = this.eventDataService.prepareData(dta);
          this.data = dataToShow;
        })

        console.log('end of code');
        this.dataLoaded = true;
        // this.eventDataService.hideloader(this.date);
        return evD;
      });

  }



}
