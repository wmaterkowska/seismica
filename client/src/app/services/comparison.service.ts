//@ts-nocheck

import { Injectable } from '@angular/core';
import { EventDataService } from '../services/event-data.service';
import { BehaviorSubject } from 'rxjs';
import { earthquakeData } from '../types/earthquakesData';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {

  toCompare: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  earthquakesD: BehaviorSubject<earthquakeData[]> = new BehaviorSubject([]);

  eventsD: [] = [];

  constructor(private eventDataService: EventDataService) { }



  async getDataToCompare(date: string) {
    await this.eventDataService.getEventData(date);
  }

}
