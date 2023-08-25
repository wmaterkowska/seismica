import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { earthquakesData } from '../types/earthquakesData';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseURL = 'http://localhost:8080';

  // private events: earthquakesData = {
  //   ids: [],
  //   times: [],
  //   latitudes: [],
  //   longitudes: [],
  //   depths: [],
  //   authors: [],
  //   catalogs: [],
  //   contributors: [],
  //   contributorsId: [],
  //   magTypes: [],
  //   magnitudes: [],
  //   magAuthors: [],
  //   locations: [],
  // };

  events: any = {};

  events$ = new BehaviorSubject<earthquakesData>(this.events);

  constructor(private http: HttpClient) { }

  async getEvents(sdate: string, edate: string, minM: number, maxM: number) {
    return await this.http.get(`${this.baseURL}/earthquakes/${sdate}/${edate}/${minM}/${maxM}`)
      .subscribe((evnts) => {
        this.events = evnts;
        this.events$.next(this.events);
      })
  }

}
