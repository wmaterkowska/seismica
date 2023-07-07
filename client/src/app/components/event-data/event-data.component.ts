import { Component, Input, OnInit } from '@angular/core';
import { EventDataService } from '../../services/event-data.service';
import { MapService } from '../../services/map.service';
import { ComparisonService } from '../../services/comparison.service';

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
  dataLoaded: boolean = true;
  isEventData: Boolean = this.mapService.isEventData.getValue()

  ngOnInit(): void {

    this.mapService.dataLoaded.subscribe(dL => this.dataLoaded = dL);

    this.eventDataService.dataE.subscribe(evD => {
      if (evD) {

        const dataToShow = this.eventDataService.prepareData(evD);

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

      if (JSON.parse(localStorage.getItem('toCompare') || '[]').length < 6) {
        let date = dat;
        let text = this.mapService.textOfEvent.getValue();

        //local storage
        if (localStorage.getItem('toCompare')) {
          let previousToCompareJson: string | null = localStorage.getItem('toCompare');
          let previousToCompare = JSON.parse(previousToCompareJson || '[]');
          let toStorageArray = previousToCompare.concat([[...date, text]]);
          let toStorage = JSON.stringify(toStorageArray);
          localStorage.setItem('toCompare', toStorage);
        } else {
          localStorage.setItem('toCompare', JSON.stringify([[...date, text]]));
        }

        this.comparisonService.toCompare.next(this.comparisonService.toCompare.getValue().concat([[...date, text]]))
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
  }
}
