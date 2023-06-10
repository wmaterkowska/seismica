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
  toCompare$: Observable<string[]> = this.toCompare.asObservable();

  // @Input() earthquakesD: string[][] = [];
  earthquakesD: BehaviorSubject<string[]> = new BehaviorSubject([''])

  constructor(private eventDataService: EventDataService, private waveService: WaveService) { }


  async getDataToCompare() {
    let arrayOfEventsDateToCompare: string[] = [];
    this.toCompare.getValue().forEach((arrDate) => {
      if (arrDate[0] !== '' && arrDate) {
        arrayOfEventsDateToCompare.push(arrDate[0]);
      } else { return }
    })
    console.log(arrayOfEventsDateToCompare, 'data to compare');


    for (let date in arrayOfEventsDateToCompare) {
      (await this.eventDataService.getEventData(date))
        .subscribe((evData) => {
          console.log({ evData });
          let data: earthquakeData = evData as earthquakeData;

          this.earthquakesD.next(data.eventData.metadata);
          // console.log('data ==================', data.eventData.wave);
          this.eventDataService.loadEventData(data.eventData.metadata);
          this.waveService.plotWave(data.eventData.wave);

        });

    }
    return '/comparison';

  }


}
