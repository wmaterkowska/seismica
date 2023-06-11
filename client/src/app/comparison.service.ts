//@ts-nocheck

import { Injectable, Input } from '@angular/core';
import { EventDataService } from './event-data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { WaveService } from './wave.service';
import { earthquakeData } from './earthquakesData';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {

  toCompare: BehaviorSubject<string[]> = new BehaviorSubject(['']);
  // toCompare$: Observable<string[]> = this.toCompare.asObservable();

  // @Input() earthquakesD: string[][] = [];
  earthquakesD: BehaviorSubject<earthquakeData[]> = new BehaviorSubject([]);

  eventsD: [] = [];

  constructor(private eventDataService: EventDataService, private waveService: WaveService) { }


  // async getDataToCompare() {
  //   let arrayOfEventsDateToCompare: string[] = [];
  //   this.toCompare.getValue().forEach((arrDate) => {
  //     if (arrDate !== '' && arrDate) {
  //       arrayOfEventsDateToCompare.push(arrDate);
  //     } else { return }
  //   })
  //   console.log(arrayOfEventsDateToCompare, 'data to compare');


  //   for (let date in arrayOfEventsDateToCompare) {
  //     (await this.eventDataService.getEventData(date))
  //       .subscribe((evData) => {
  //         console.log({ evData });
  //         let data: earthquakeData = evData as earthquakeData;
  //         console.log(data);
  //         this.earthquakesD.next(data.eventData);
  //         // this.eventDataService.loadEventData(data.eventData.metadata);
  //         // this.waveService.plotWave(data.eventData.wave);
  //         this.eventsD.push(data.eventData);
  //       });
  //   }

  //   console.log(this.eventsD, 'eventsD')
  //   return this.eventsD;

  // }


  async getDataToCompare(date: string) {
    await this.eventDataService.getEventData(date);
  }

}
