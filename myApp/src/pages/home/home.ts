import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';

let user = "stephane";
let psw = "root";

let listRead = [];
let listUnread = [];
let manualIsbn = "";
let connexion = "";


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

  connect() {
    let userid = prompt('Enter your loggin :', '');
    let password = prompt('Enter your password :', '');
    alert('userid = ' + userid + '\npassword = ' + password);

    if (userid === user && password === psw) {
      alert("you are now connected");
      connexion = "yes";
      document.getElementById("connected").style.display="block";
      document.getElementById("notConnected").style.display="none";
    } else {
      alert("Wrong loggin or password");
    }
  }

  scan() {
    if (connexion == "yes") {
      BarcodeScanner.scan().then((barcodeData) => {

        let isbn = barcodeData.text;

        if (listRead.indexOf(isbn) > -1 || listUnread.indexOf(isbn) > -1) {
          alert("Book allready added to list");
        } else {
          let r = confirm("Have you read it, "+isbn+" ?");
          if (r == true) {
            alert("Added to read list");
            listRead.push(isbn);
          } else {
            alert("Added to unread list");
            listUnread.push(isbn);
          }
        }


      }, (err) => {
        alert("You have an error :" + err + ", please enter your ISBN code manually");
      })
    } else {
      alert("you need to be connected");
    }
  }

    enter() {
      if (connexion == "yes") {

        manualIsbn = prompt("Enter the book ISBN please");
        console.log(manualIsbn);

        if (manualIsbn != "") {
          if (listRead.indexOf(manualIsbn) > -1 || listUnread.indexOf(manualIsbn) > -1) {
            alert("Book allready added to list");
          } else {
            let r = confirm("Have you read it, "+manualIsbn+" ?");
            if (r == true) {
              alert("Added to read list");
              listRead.push(manualIsbn);
            } else {
              alert("Added to unread list");
              listUnread.push(manualIsbn);
            }
          }
        }else{
          alert("Please enter an ISBN");
        }
      } else {
        alert("you need to be connected");
      }
    }


    check() {
      if (connexion == "yes") {
        alert("READ :\n" + listRead.join("\n") + "\nUNREAD :\n" + listUnread.join("\n"));
      } else {
        alert("you need to be connected");
      }
    }

  }
