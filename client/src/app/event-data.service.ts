//@ts-nocheck

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

  // hideloader(date: string) {
  //   let htmlElement = document.getElementById(`loading-${date}`);
  //   if (htmlElement !== null) {
  //     htmlElement.style.display = 'none';
  //   }
  // }

  // showloader(date: string) {
  //   let htmlElement = document.getElementById(`loading-${date}`);
  //   if (htmlElement !== null) {
  //     htmlElement.style.display = 'inline';
  //   }
  // }

  prepareData(evD: string[]) {
    evD.forEach(field => {
      // console.log('evD', field, evD.indexOf(field));
    })
    let dataPrepared: string[] = [];

    let titleData = [...evD[0].split('\n')];

    dataPrepared.push('place: ' + titleData[2]); //place
    dataPrepared.push(titleData[0]); //mag
    dataPrepared.push(titleData[1]); // time

    dataPrepared.push(...evD[1].split(': ')); //dataset
    dataPrepared.push('station information');
    dataPrepared.push(...evD[3].split(' ')); //SID
    dataPrepared.push(...evD[7].split(' ')); //lat
    dataPrepared.push(...evD[8].split(' ')); //lon
    dataPrepared.push(...evD[9].split(' ')); //elevation

    dataPrepared.push('wave information');
    dataPrepared.push(...evD[4].split(' ')); //sample count
    dataPrepared.push(...evD[5].split(' ')); //sample rate
    dataPrepared.push(...evD[6].split(' ')); //start time

    dataPrepared.push('event information');
    dataPrepared.push(...evD[10].split(' ')) //depth
    dataPrepared.push(...evD[11].split(' ')) //azimuth
    dataPrepared.push(...evD[12].split(' ')) //dip deg

    dataPrepared.push('instrument');
    dataPrepared.push(evD[13].split(': ')[1]);
    // dataPrepared.push(...evD[13].split(': ')) //instrument
    // dataPrepared.push(...evD[14].split(' ')) //scale factor
    // dataPrepared.push(...evD[15].split(' ')) //scale freq hz
    // dataPrepared.push(...evD[16].split(' ')) //scale units
    // dataPrepared.push(...evD[17].split(' ')) //field unit
    // dataPrepared.push(...evD[18].split(' ')) //field type

    console.log('dataPrepared', dataPrepared)
    return dataPrepared;
  }



}
