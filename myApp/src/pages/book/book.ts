import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';



@Component({
  selector: 'page-book',
  templateUrl: 'book.html'
})
export class BookPage {

  todo = {}
  logForm() {
    console.log(this.todo)
  }
  constructor(public navCtrl: NavController) {

  }

}
