import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'seismica';

  isEvent: Boolean = false;

  constructor(private serv: MapService) { }


  ngOnInit(): void {
    this.serv.isEventData.subscribe(data => this.isEvent = data);
  }





}
