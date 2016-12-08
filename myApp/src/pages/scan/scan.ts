import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';

import {BarcodeScanner} from 'ionic-native';

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

  scan() {
    BarcodeScanner.scan().then((barcodeData) => {
      let isbn = barcodeData.text;
      let r = confirm("have you read it ?");
      if (r == true) {
        alert("Added to read list");
      } else {
        alert("Added to unread list");
      }
    }, (err) => {
      alert("You have an error :" + err + ", please enter your ISBN code manually");
      document.getElementsByTagName('form')[1].style.display = "block";
    })
  }
}

