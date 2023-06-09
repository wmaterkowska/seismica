// @ts-nocheck

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventDataService {

  private baseURL = 'http://localhost:3000/eventData';

  // private event: number[] = [];
  private event: any = {}; // (?)
  // private data: string[] = [];

  // event$ = new BehaviorSubject<number[]>(this.event); // (?)
  public eventData$ = new BehaviorSubject<string[]>(this.data);
  public dataE = this.eventData$.asObservable();

  constructor(private http: HttpClient) { }

  async getEventData(date: string) {
    return await this.http.get(`${this.baseURL}/${date}`)
  }


  loadEventData(eventData: string[]) {
    // this.data = eventData;
    this.eventData$.next(eventData);
    // this.dataE.next(eventData);
  }

  retriveEventData() {
    console.log(this.eventData$.getValue(), 'event data value from subscriber');
    return this.eventData$.getValue();
    // return this.dataE.subscribe(data => {this.dataE = data})
  }


}
