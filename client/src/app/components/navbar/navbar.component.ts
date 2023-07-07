import { Component } from '@angular/core';
import { ComparisonService } from '../../services/comparison.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private comparisonService: ComparisonService) { }

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
    // let link = await this.comparisonService.getDataToCompare();
    return link;
  }


}
