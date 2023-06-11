
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventDataService {

  private baseURL = 'http://localhost:3000/eventData';

  public eventData$ = new BehaviorSubject<string[]>(['']);
  public dataE = this.eventData$.asObservable();

  constructor(private http: HttpClient) { }

  async getEventData(date: string) {
    return await this.http.get(`${this.baseURL}/${date}`)
  }


  loadEventData(eventData: string[]) {
    this.eventData$.next(eventData);
  }

  // retriveEventData() {
  //   return this.eventData$.getValue();
  // }


}
