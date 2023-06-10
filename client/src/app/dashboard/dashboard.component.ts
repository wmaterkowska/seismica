import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isEvent: Boolean = false;

  constructor(private serv: MapService) { }


  ngOnInit(): void {
    this.serv.isEventData.subscribe(data => this.isEvent = data);
  }


}
