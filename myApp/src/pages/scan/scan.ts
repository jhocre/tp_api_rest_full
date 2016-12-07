import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {
  todo = {}
  logForm() {
    console.log(this.todo)
  }
  constructor(public navCtrl: NavController) {

  }

}
