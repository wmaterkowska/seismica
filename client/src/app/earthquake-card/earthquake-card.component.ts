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

  isShown: boolean = true;

  constructor(private eventDataService: EventDataService,
    private waveService: WaveService,
    private comparisonService: ComparisonService) { }

  ngOnInit(): void {

    this.showEventData();
  }


  async showEventData() {

    const eventsToCompare = this.comparisonService.toCompare.getValue()

    //localStorage
    const eventsToCompareStorage = JSON.parse(localStorage.getItem('toCompare') || '[]');

    console.log(eventsToCompareStorage);

    let text: string = '';
    // for (let i = 0; i < eventsToCompare.length; i++) {
    //   if (eventsToCompare[i][0] === this.date) {
    //     text = eventsToCompare[i][1];
    //   }
    // }
    for (let i = 0; i < eventsToCompareStorage.length; i++) {
      if (eventsToCompareStorage[i][0] === this.date) {
        text = eventsToCompareStorage[i][1];
      }
    }

    (await this.eventDataService.getEventData(this.date))
      .subscribe((evD) => {

        this.waveService.plotWave(evD.eventData.wave, this.date);

        let dataToLoad = [text, ...evD.eventData.metadata];
        // console.log(dataToLoad, 'data to load');

        this.eventDataService.loadEventData(dataToLoad);

        let dta = this.eventDataService.eventData$.getValue();
        // this.eventDataService.dataE.subscribe(dta => {
        console.log({ dta }, this.date);
        const dataToShow = this.eventDataService.prepareData(dta);
        console.log({ dataToShow }, this.date);
        this.data = dataToShow;
        // })

        this.dataLoaded = true;
        return evD;
      });

  }



  deleteClick() {
    console.log(this.comparisonService.toCompare.getValue(), 'beginning');
    this.isShown = false;
    let newToCompare = this.comparisonService.toCompare.getValue().filter(dat => dat[0] !== this.date);
    this.comparisonService.toCompare.next(newToCompare);

    //local storage

    let previousToCompareJson: string | null = localStorage.getItem('toCompare');
    let previousToCompare = JSON.parse(previousToCompareJson || '[]');

    let toStorageArray = previousToCompare.filter(dat => dat[0] !== this.date);

    // let toStorageArray = previousToCompare.concat([[...date, text]]);
    let toStorage = JSON.stringify(toStorageArray);
    localStorage.setItem('toCompare', toStorage);




    // console.log(this.comparisonService.toCompare.getValue(), 'end');
  }


}
