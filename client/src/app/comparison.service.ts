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

  toCompare: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  earthquakesD: BehaviorSubject<earthquakeData[]> = new BehaviorSubject([]);

  eventsD: [] = [];

  constructor(private eventDataService: EventDataService, private waveService: WaveService) { }



  async getDataToCompare(date: string) {
    await this.eventDataService.getEventData(date);
  }

}
