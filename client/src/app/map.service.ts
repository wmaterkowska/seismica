// @ts-nocheck

import { Injectable } from '@angular/core';
import { EventDataService } from './event-data.service';
import { WaveService } from './wave.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
declare let Plotly: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  isEventData: BehaviorSubject<Boolean> = new BehaviorSubject(null);
  isEventData$: Observable<Boolean> = this.isEventData.asObservable();

  dateOfEvent: Subject<string> = new BehaviorSubject('');
  dateOfEvent$: Observable<string> = this.dateOfEvent.asObservable();

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
      paper_bgcolor: 'rgba(0,0,0,0)',
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

    // adding onclick event which will send a date to backend to recieve event wave and data and show everything
    let myPlot = document.getElementById('map');

    if (myPlot !== null) {
      myPlot.on('plotly_click', async (data, time: string[]) => {

        // change color of the mark on map
        let pt = data.points[0].pointNumber;
        magnitudes[pt] = 'grey'
        Plotly.restyle('map', 'marker.line.color', [magnitudes]);

        //show loader until it loads the data
        this.eventDataService.showloader();


        //retrieve date from text on map
        let date = data.points[0].text.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/gm);
        this.dateOfEvent.next(date);

        this.isEventData.next(true);

        let dataToShow: string[] = []
        dataToShow.push(data.points[0].text);

        // send call to service to get event data
        (await this.eventDataService.getEventData(date))
          .subscribe(event => {

            dataToShow.push(...event.eventData.metadata);

            this.eventDataService.loadEventData(dataToShow);
            this.waveService.plotWave(event.eventData.wave);

            this.eventDataService.hideloader();
            return event
          });


      });
    }

  }


}
