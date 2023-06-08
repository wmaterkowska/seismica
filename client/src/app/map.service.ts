// @ts-nocheck

import { Injectable, OnInit } from '@angular/core';
import { earthquakesData } from './earthquakesData';
declare let Plotly: any;

@Injectable({
  providedIn: 'root'
})
export class MapService implements OnInit {

  constructor() { }
  ngOnInit(): void {
    // this.plotMap();
  }


  plotMap(earthquakes: any) {

    let lats: number[];
    let lons: number[];
    let magnitudes: number[];


    if (typeof earthquakes.earthquakesData === 'undefined') {
      lats = [];
      lons = [];
      magnitudes = [];
    } else {
      lats = earthquakes.earthquakesData.latitudes;
      lons = earthquakes.earthquakesData.longitudes;
      magnitudes = earthquakes.earthquakesData.magnitudes;
    }

    console.log('plot map');
    console.log(earthquakes, 'data inside plot')

    let mycolorscale = [[0.0, 'rgb(255, 192, 203)'], [1.0, '#4682B4']];

    console.log(lons, lats, magnitudes);

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
      text: magnitudes.map(mag => 'M' + mag),
    }];

    Plotly.newPlot('map', dataMy, layoutMy);

    let myPlot = document.getElementById('map');

    if (myPlot !== null) {
      myPlot.on('plotly_click', function () {

        console.log('clicked');
        alert('Closest point clicked');
      });
    }

  }






}
