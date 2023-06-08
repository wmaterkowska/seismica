import { Injectable, OnInit } from '@angular/core';
declare let Plotly: any;

@Injectable({
  providedIn: 'root'
})
export class MapService implements OnInit {

  constructor() { }
  ngOnInit(): void {
    this.main();
  }

  main() {

    let mycolorscale = [[0.0, 'rgb(255, 192, 203)'], [1.0, '#4682B4']]

    let lats: number[] = [];
    let lons: number[] = [];
    let magnitudes: number[] = [];

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
        // cmin: magnitudes.reduce((mag1, mag2) => mag1 < mag2),
        // cmax: magnitudes.reduce((mag1, mag2) => mag1 > mag2),
        // color: magnitudes,
        // color: 'fuchsia',
        size: magnitudes.map(mag => mag * 4),
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

  }






}
