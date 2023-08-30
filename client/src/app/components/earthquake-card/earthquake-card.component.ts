//@ts-nocheck

import { Component, Input, OnInit } from '@angular/core';
import { EventDataService } from '../../services/event-data.service';
import { WaveService } from '../../services/wave.service';
import { ComparisonService } from '../../services/comparison.service';

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

    //localStorage
    const eventsToCompareStorage = JSON.parse(localStorage.getItem('toCompare') || '[]');

    let text: string = '';

    for (let i = 0; i < eventsToCompareStorage.length; i++) {
      if (eventsToCompareStorage[i][0] === this.date) {
        text = eventsToCompareStorage[i][1];
      }
    }

    (await this.eventDataService.getEventData(this.date))
      .subscribe((evD) => {

        this.waveService.plotWave(evD.wave, this.date);

        let dataToLoad = [text, ...evD.metadata];

        this.eventDataService.loadEventData(dataToLoad);

        let dta = this.eventDataService.eventData$.getValue();
        const dataToShow = this.eventDataService.prepareData(dta);
        this.data = dataToShow;

        this.dataLoaded = true;
        return evD;
      });
  }



  deleteClick() {
    this.isShown = false;
    let newToCompare = this.comparisonService.toCompare.getValue().filter(dat => dat[0] !== this.date);
    this.comparisonService.toCompare.next(newToCompare);

    //local storage
    let previousToCompareJson: string | null = localStorage.getItem('toCompare');
    let previousToCompare = JSON.parse(previousToCompareJson || '[]');

    let toStorageArray = previousToCompare.filter(dat => dat[0] !== this.date);

    let toStorage = JSON.stringify(toStorageArray);
    localStorage.setItem('toCompare', toStorage);

  }
}
