import { Component, Input, OnInit } from '@angular/core';
import { EventDataService } from '../event-data.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MapService } from '../map.service';
import { ComparisonService } from '../comparison.service';

@Component({
  selector: 'app-event-data',
  templateUrl: './event-data.component.html',
  styleUrls: ['./event-data.component.css']
})
export class EventDataComponent implements OnInit {

  constructor(private eventDataService: EventDataService, private mapService: MapService, private comparisonService: ComparisonService) { }

  @Input()
  data?: string[] = [];

  clicked: boolean = false;

  ngOnInit(): void {
    this.eventDataService.dataE.subscribe(evD => {
      if (evD) {

        const dataToShow = this.prepareData(evD);

        this.data = dataToShow;

        let button = document.getElementById('add-btn');
        if (button) {
          button.classList.replace('clicked', 'add-btn');
        }
        this.clicked = false;
      }
    });
  }


  addToCompare() {

    if (this.clicked === false) {

      let dat = '';
      this.mapService.dateOfEvent$.subscribe(d => { dat = d });
      if (this.comparisonService.toCompare.getValue().length < 4) {
        this.comparisonService.toCompare.next(this.comparisonService.toCompare.getValue().concat(dat))
      } else {
        alert('You reached the limit of earthquakes to compare.')
      }

      let button = document.getElementById('add-btn');
      if (button) {
        button.classList.replace('add-btn', 'clicked');
      }
      this.clicked = true;
    } else {
      let newToCompare = this.comparisonService.toCompare.getValue().filter((date) => date !== date);
      this.comparisonService.toCompare.next(newToCompare);

      let button = document.getElementById('add-btn');
      if (button) {
        button.classList.replace('clicked', 'add-btn');
      }
      this.clicked = false;
    }

    console.log(this.comparisonService.toCompare.getValue(), 'to compare');

  }

  prepareData(evD: string[]) {
    evD.forEach(field => {
      console.log('evD', field, evD.indexOf(field));
    })
    let dataPrepared: string[] = [];

    let titleData = [...evD[0].split('\n')];

    dataPrepared.push(titleData[1]); // time
    dataPrepared.push(titleData[2]); //place
    dataPrepared.push(titleData[0]); //mag

    dataPrepared.push(...evD[1].split(': ')); //dataset
    dataPrepared.push('station information');
    dataPrepared.push(...evD[3].split(': ')); //SID
    dataPrepared.push(...evD[7].split(': ')); //lat
    dataPrepared.push(...evD[8].split(': ')); //lon
    dataPrepared.push(...evD[9].split(': ')); //elevation

    dataPrepared.push('wave information');
    dataPrepared.push(...evD[4].split(': ')); //sample count
    dataPrepared.push(...evD[5].split(': ')); //sample rate
    dataPrepared.push(...evD[6].split(': ')); //start time

    dataPrepared.push('event information');
    dataPrepared.push(...evD[10].split(': ')) //depth
    dataPrepared.push(...evD[11].split(': ')) //azimuth
    dataPrepared.push(...evD[12].split(': ')) //dip deg

    dataPrepared.push('instrument information');
    dataPrepared.push(...evD[13].split(': ')) //instrument
    dataPrepared.push(...evD[14].split(': ')) //scale factor
    dataPrepared.push(...evD[15].split(': ')) //scale freq hz
    dataPrepared.push(...evD[16].split(': ')) //scale units
    dataPrepared.push(...evD[17].split(': ')) //field unit
    dataPrepared.push(...evD[18].split(': ')) //field type

    console.log('dataPrepared', dataPrepared)
    return dataPrepared;
  }


}
