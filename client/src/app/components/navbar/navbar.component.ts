import { Component } from '@angular/core';
import { ComparisonService } from '../../services/comparison.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private comparisonService: ComparisonService, private mapService: MapService) { }

  isToolTipShowed: boolean = false;


  handleHelpClick() {
    if (!this.isToolTipShowed) {
      this.isToolTipShowed = true;
    } else {
      this.isToolTipShowed = false;
    }
  }

  async handleCompareClick() {
    let link = 'comparison'
    this.mapService.isEventData.next(false);
    return link;
  }


}
