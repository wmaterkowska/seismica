import { Component, Directive, Input, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { EventsService } from '../events.service';
import { earthquakesData } from '../earthquakesData';

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

  // _events: earthquakesData = {
  //   "ids": [
  //     11678318,
  //     11678157,
  //     11678052,
  //     11676552,
  //     11675664,
  //     11675432,
  //     11673338,
  //     11672929,
  //     11671702,
  //     11670576,
  //     11669397
  //   ],
  //   "times": [
  //     "2023-04-03T14:59:42Z",
  //     "2023-04-03T03:06:57Z",
  //     "2023-04-02T18:04:11Z",
  //     "2023-03-30T17:33:08Z",
  //     "2023-03-28T09:18:28Z",
  //     "2023-03-27T22:19:15Z",
  //     "2023-03-22T16:00:34Z",
  //     "2023-03-21T16:47:23Z",
  //     "2023-03-18T17:12:51Z",
  //     "2023-03-16T00:56:00Z",
  //     "2023-03-14T00:49:08Z"
  //   ],
  //   "latitudes": [
  //     0.8431,
  //     52.7227,
  //     -4.3258,
  //     -35.6663,
  //     41.148,
  //     -8.2105,
  //     -23.4122,
  //     36.5169,
  //     -2.839,
  //     -30.1743,
  //     -5.4168
  //   ],
  //   "longitudes": [
  //     98.8133,
  //     158.4935,
  //     143.1593,
  //     -73.4965,
  //     142.805,
  //     158.9268,
  //     -66.5016,
  //     70.9381,
  //     -79.848,
  //     -176.1982,
  //     146.8558
  //   ],
  //   "depths": [
  //     92.66,
  //     101,
  //     70,
  //     26,
  //     34,
  //     85.976,
  //     228,
  //     192,
  //     63.549,
  //     10,
  //     213
  //   ],
  //   "authors": [
  //     "us,usauto,pt,at",
  //     "us,pt,at,usauto",
  //     "us,pt,at,usauto",
  //     "us,usauto,pt,at",
  //     "us,usauto,at,pt",
  //     "us,usauto,pt",
  //     "us,usauto,at,pt",
  //     "us,usauto,pt,at",
  //     "pt,us,usauto",
  //     "us,pt,usauto",
  //     "us,usauto,at,pt"
  //   ],
  //   "catalogs": [
  //     "NEIC PDE",
  //     "NEIC PDE",
  //     "NEIC PDE",
  //     "NEIC PDE",
  //     "NEIC PDE",
  //     "NEIC PDE",
  //     "NEIC PDE",
  //     "NEIC PDE",
  //     "NEIC PDE",
  //     "NEIC PDE",
  //     "NEIC PDE"
  //   ],
  //   "contributors": [
  //     "us",
  //     "us",
  //     "us",
  //     "us",
  //     "us",
  //     "us",
  //     "us",
  //     "us",
  //     "us",
  //     "us",
  //     "us"
  //   ],
  //   "contributorsId": [
  //     "us6000k1qa",
  //     "pt23093000",
  //     "pt23092000",
  //     "us6000k0xf",
  //     "us6000k09q",
  //     "us6000k05c",
  //     "us7000jlxu",
  //     "us7000jln7",
  //     "pt23077000",
  //     "pt23075000",
  //     "us7000jjp7"
  //   ],
  //   "magTypes": [
  //     "mww",
  //     "mww",
  //     "mww",
  //     "mww",
  //     "Mww",
  //     "mww",
  //     "mww",
  //     "Mww",
  //     "Mww",
  //     "Mww",
  //     "mww"
  //   ],
  //   "magnitudes": [
  //     6.1,
  //     6.5,
  //     7,
  //     6.3,
  //     6,
  //     6.1,
  //     6.4,
  //     6.5,
  //     6.8,
  //     7,
  //     6.3
  //   ],
  //   "magAuthors": [
  //     "us",
  //     "us",
  //     "us",
  //     "us",
  //     "us",
  //     "us",
  //     "us",
  //     "us",
  //     "us",
  //     "us",
  //     "us"
  //   ],
  //   "locations": [
  //     "NORTHERN SUMATRA, INDONESIA",
  //     "NEAR EAST COAST OF KAMCHATKA",
  //     "NEW GUINEA, PAPUA NEW GUINEA",
  //     "OFF COAST OF CENTRAL CHILE",
  //     "HOKKAIDO, JAPAN REGION",
  //     "SOLOMON ISLANDS",
  //     "JUJUY PROVINCE, ARGENTINA",
  //     "HINDU KUSH REGION, AFGHANISTAN",
  //     "NEAR COAST OF ECUADOR",
  //     "KERMADEC ISLANDS REGION",
  //     "EASTERN NEW GUINEA REG., P.N.G."
  //   ]
  // }

  ngOnInit(): void {

    this.eventsService.events$.subscribe((evnts: earthquakesData) => {
      // console.log({ evnts })
      this.events = evnts;

      const data = this.events;
      // console.log(data, 'this events map component')
      this.map.plotMap(data);
      return this.events
    });
    // this.map.plotMap(this.events);

  }


}
