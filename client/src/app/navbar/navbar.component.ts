import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isToolTipShowed: boolean = false;


  handleHelpClick() {
    if (!this.isToolTipShowed) {
      this.isToolTipShowed = true;
    } else {
      this.isToolTipShowed = false;
    }
  }

}
