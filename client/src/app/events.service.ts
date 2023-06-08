//@ts-nocheck

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { earthquakesData } from './earthquakesData';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseURL = 'http://localhost:3000';

  private events: earthquakesData = {
    ids: [],
    times: [],
    latitudes: [],
    longitudes: [],
    depths: [],
    authors: [],
    catalogs: [],
    contributors: [],
    contributorsId: [],
    magTypes: [],
    magnitudes: [],
    magAuthors: [],
    locations: [],
  };

  // events: any = {};

  events$ = new BehaviorSubject<earthquakesData>(this.events);
  // currentEvents = this.events$.asObservable();

  constructor(private http: HttpClient) { }


  async getEvents(sdate: string, edate: string, minM: number, maxM: number) {
    return await this.http.get(`${this.baseURL}/earthquakes/${sdate}/${edate}/${minM}/${maxM}`)
      // .pipe(map(evs => Object.assign(new earthquakesData(), evs)))
      .subscribe((evnts) => {
        console.log(evnts, 'service');
        this.events = evnts;
        // this.events = {
        //   longitudes: evnts.longitudes
        // }
        console.log(this.events.longitudes);
        this.events$.next(this.events);
      })
  }

}
