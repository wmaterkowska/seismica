import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseURL = 'http://localhost:3000';
  private events: {} = {};

  constructor(private http: HttpClient) { }


  getEvents(sdate: string, edate: string, minM: number, maxM: number) {
    this.http.get(`${this.baseURL}/earthquakes/:${sdate}/:${edate}/:${minM}/:${maxM}`)
      .subscribe(events => {
        this.events = events;
        console.log(events);
      })
  }

}
