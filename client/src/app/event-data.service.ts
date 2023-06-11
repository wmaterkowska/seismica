
import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventDataService {

  private baseURL = 'http://localhost:3000/eventData';

  public eventData$ = new BehaviorSubject<string[]>(['']);
  public dataE = this.eventData$.asObservable();

  public load$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  async getEventData(date: string) {
    this.load$.next(true);
    return await this.http.get(`${this.baseURL}/${date}`)
    // .subscribe(Response => {
    //   if (Response) {
    //     this.hideloader();
    //   }
    // });
  }


  loadEventData(eventData: string[]) {
    this.eventData$.next(eventData);
  }

  // retriveEventData() {
  //   return this.eventData$.getValue();
  // }

  hideloader() {
    let htmlElement = document.getElementById('loading');
    if (htmlElement !== null) {
      htmlElement.style.display = 'none';
    }
  }

  showloader() {
    let htmlElement = document.getElementById('loading');
    if (htmlElement !== null) {
      htmlElement.style.display = 'inline';
    }
  }



}
