//@ts-nocheck

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventDataService {

  private baseURL = 'http://localhost:3000/eventData';

  private event: number[] = [];

  event$ = new BehaviorSubject<number[]>(this.event);

  constructor(private http: HttpClient) { }

  async getEventData(date: string) {
    return await this.http.get(`${this.baseURL}/${date}`)
    // .map(res => res)
    // .subscribe((evnt) => {
    //   this.event = evnt;
    //   console.log(this.event, 'event');
    //   this.event$.next(this.event);
    // })
  }

}
