import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { EventsService } from '../../services/events.service';
import { earthquakesData } from '../../types/earthquakesData';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private map: MapService, private eventsService: EventsService) { }

  events: earthquakesData = {
    ids: [],
    times: [],
    latitudes: [],
    longitudes: [],
    depths: [],
    authors: [],
    catalogs: [],
    contributors: [],
    contributorsId: [],
    magTypes: [],
    magnitudes: [],
    magAuthors: [],
    locations: [],
  }

  ngOnInit(): void {

    this.eventsService.events$.subscribe((evnts: earthquakesData) => {
      this.events = evnts;

      const data = this.events;
      this.map.plotMap(data);
      return this.events
    });
  }


}
