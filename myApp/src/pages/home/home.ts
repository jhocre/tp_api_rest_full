import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todo = {}
  logForm() {
    console.log(this.todo)
  }
  constructor(public navCtrl: NavController) {

  }

}
