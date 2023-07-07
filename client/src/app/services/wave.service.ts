import { Injectable } from '@angular/core';
declare let Plotly: any;

@Injectable({
  providedIn: 'root'
})
export class WaveService {

  constructor() { }

  plotWave(dataArray: number[], date?: string) {

    let x = [];
    let y = [];

    for (let i = 0; i < dataArray.length; i++) {
      let row = dataArray[i];
      y.push(row);
      x.push(i);
    }

    const data = [{
      x: x,
      y: y,
      line: {
        width: 0.5,
        color: '#4682B4',
      }
    }]

    const layout = {
      width: 1000,
      height: 300,
      line: {
        width: 0.1,
      },

    }

    let divName: string = '';
    if (date) {
      divName = 'wave' + date;
    } else {
      divName = 'wave';
    }

    Plotly.newPlot(divName, data, layout);
  }
}
