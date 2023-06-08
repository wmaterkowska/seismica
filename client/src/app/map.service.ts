// @ts-nocheck

import { Injectable, OnInit } from '@angular/core';
import { earthquakesData } from './earthquakesData';
import { EventDataService } from './event-data.service';
import { WaveService } from './wave.service';
declare let Plotly: any;

@Injectable({
  providedIn: 'root'
})
export class MapService implements OnInit {

  constructor(private eventDataService: EventDataService, private waveService: WaveService) { }

  ngOnInit(): void {
    // this.plotMap();
  }


  async plotMap(earthquakes: any) {

    let lats: number[];
    let lons: number[];
    let magnitudes: number[];
    let times: string[];

    if (typeof earthquakes.earthquakesData === 'undefined') {
      lats = [];
      lons = [];
      magnitudes = [];
      times = []
    } else {
      lats = earthquakes.earthquakesData.latitudes;
      lons = earthquakes.earthquakesData.longitudes;
      magnitudes = earthquakes.earthquakesData.magnitudes;
      times = earthquakes.earthquakesData.times;
    }

    // console.log(earthquakes, 'data inside plot')

    let mycolorscale = [[0.0, 'rgb(255, 192, 203)'], [1.0, '#4682B4']];

    // console.log(lons, lats, magnitudes);

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
        // color: magnitudes,
        // color: 'fuchsia',
        size: magnitudes.map(mag => mag * 4),
        // size: 20,
        line: {
          width: 0,
        },
        colorbar: {
          thickness: 10,
          len: 0.7,
          title: 'magnitudes',
        },
      },
      text: times,
      // text: magnitudes.map(mag => 'M' + mag),
    }];

    Plotly.newPlot('map', dataMy, layoutMy);

    let myPlot = document.getElementById('map');

    console.log(this.eventDataService);

    if (myPlot !== null) {
      myPlot.on('plotly_click', async (time: string[]) => {
        console.log('clicked');

        console.log(time.points[0].text, 'time');
        // let data: number[] = [];

        let date = time.points[0].text.slice(0, -1);

        (await this.eventDataService.getEventData(date))
          .subscribe(event => {
            console.log(event)
            this.waveService.plotWave(event.eventData);
            return event
          });

        // this.waveService.plotWave(data);

        // console.log(data, 'data');

      });
    }

  }


}
