// @ts-nocheck

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventDataService {

  private baseURL = 'http://localhost:3000/eventData';

  private event: any = {}; // (?)

  public eventData$ = new BehaviorSubject<string[]>(this.data);
  public dataE = this.eventData$.asObservable();

  constructor(private http: HttpClient) { }

  async getEventData(date: string) {
    return await this.http.get(`${this.baseURL}/${date}`)
  }


  loadEventData(eventData: string[]) {
    this.eventData$.next(eventData);
  }

  retriveEventData() {
    console.log(this.eventData$.getValue(), 'event data value from subscriber');
    return this.eventData$.getValue();
  }


}
