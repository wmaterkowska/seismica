// @ts-nocheck

import { Injectable, Output } from '@angular/core';
import { EventDataService } from './event-data.service';
import { WaveService } from './wave.service';
import { EventEmitter } from 'stream';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
declare let Plotly: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  isEventData: Subject<Boolean> = new BehaviorSubject(null);
  isEventData$: Observable<Boolean> = this.isEventData.asObservable();

  constructor(private eventDataService: EventDataService, private waveService: WaveService) { }

  async plotMap(earthquakes: any) {

    let lats: number[];
    let lons: number[];
    let magnitudes: number[];
    let places: string[];
    let times: string[];

    if (typeof earthquakes.earthquakesData === 'undefined') {
      lats = [];
      lons = [];
      magnitudes = [];
      places = [];
      times = [];
    } else {
      lats = earthquakes.earthquakesData.latitudes;
      lons = earthquakes.earthquakesData.longitudes;
      magnitudes = earthquakes.earthquakesData.magnitudes;
      places = earthquakes.earthquakesData.locations;
      times = earthquakes.earthquakesData.times;
    }

    let text = [];

    for (let i = 0; i < lats.length; i++) {
      let txt = `magnitude: ${magnitudes[i]} \n time: ${times[i]} \n ${places[i]}`
      text.push(txt);
    }


    let mycolorscale = [[0.0, 'rgb(255, 192, 203)'], [1.0, '#4682B4']];

    var layoutMy = {
      geo: {
        scope: 'world',
        showcoastlines: false,
        showlakes: true,
        lakecolor: 'white',
        projection: {
          type: 'robinson',
        },
        showland: true,
        landcolor: 'rgb(217, 217, 217)',
      },
      width: 1100,
      height: 700,
      lataxis: {
        showgrid: true,
        gridwidth: 0.5,
        dtick: 10,
      },
    };

    let dataMy = [{
      type: "scattergeo",
      // projectionType: "natural earth",
      lon: lons,
      lat: lats,
      mode: 'markers',
      marker: {
        color: magnitudes,
        autocolorscale: false,
        colorscale: mycolorscale,
        cmin: magnitudes.length === 0 ? 0 : magnitudes.reduce((mag1, mag2) => mag1 < mag2 ? mag1 : mag2),
        cmax: magnitudes.length === 0 ? 10 : magnitudes.reduce((mag1, mag2) => mag1 > mag2 ? mag1 : mag2),
        size: magnitudes.map(mag => mag * 4),
        line: {
          width: 0,
        },
        colorbar: {
          thickness: 15,
          len: 0.7,
          title: 'magnitudes',
        },
      },
      text: text,
      // text: magnitudes.map(mag => 'M' + mag),
    }];

    Plotly.newPlot('map', dataMy, layoutMy);

    // adding onclick event
    let myPlot = document.getElementById('map');

    if (myPlot !== null) {
      myPlot.on('plotly_click', async (time: string[]) => {

        let date = time.points[0].text.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/gm);

        this.isEventData.next(true);

        (await this.eventDataService.getEventData(date))
          .subscribe(event => {

            console.log(event, 'event');

            this.eventDataService.loadEventData(event.eventData.metadata);

            this.waveService.plotWave(event.eventData.wave);
            return event
          });

      });
    }

  }


}
