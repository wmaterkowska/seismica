import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  }

}
