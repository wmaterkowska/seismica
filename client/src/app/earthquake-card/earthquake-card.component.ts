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

  data?: any;

  constructor(private comparisonService: ComparisonService,
    private eventDataService: EventDataService,
    private waveService: WaveService) { }

  ngOnInit(): void {

    this.showEventData();

    // this.waveService.plotWave(dates);
    // let dataSeparately: string[] = [];
    // this.comparisonService.earthquakesD.forEach((data) => {
    //   let d = data as earthquakeData;
    //   console.log(d, 'data====================')
    //   dataSeparately.push(d.metadata[0]) //.split(': '));

    //   this.eventDataService.loadEventData(dataSeparately);
    //   this.waveService.plotWave(d.wave);

    // });

    // this.data = dataSeparately;
  }


  async showEventData() {

    (await this.eventDataService.getEventData(this.date))
      .subscribe(evD => {

        console.log(evD, 'data earthquake card');
        this.waveService.plotWave(evD.eventData.wave);



      });


    // this.dates = await this.comparisonService.toCompare.getValue();



    // this.data = await this.comparisonService.getDataToCompare();

    // console.log(this.data, 'data earthquake card')
  }



}
