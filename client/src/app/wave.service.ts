import { Injectable, OnInit } from '@angular/core';
declare let Plotly: any;

@Injectable({
  providedIn: 'root'
})
export class WaveService implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  plotWave(dataArray: number[]) {

    this.processData(dataArray);
  }

  processData(allRows: number[]) {

    let x = [];
    let y = [];

    for (let i = 0; i < allRows.length; i++) {
      let row = allRows[i];
      y.push(row);
      x.push(i);
    }

    this.makePlotly(x, y);
  }

  makePlotly(x: number[], y: number[]) {

    const data = [{
      x: x,
      y: y,
      line: {
        width: 0.5,
        color: 'rgb(190, 229, 176)',
      }
    }]

    const layout = {
      width: 1200,
      height: 300,
      line: {
        width: 0.1,
      },

    }

    Plotly.newPlot('wave', data, layout);
  };



}
