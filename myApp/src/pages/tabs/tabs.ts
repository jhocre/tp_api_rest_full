import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { BookPage } from '../book/book';
import { ScanPage } from '../scan/scan';
import { CommandPage } from '../command/command';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab0Root: any = HomePage;
  tab1Root: any = BookPage;
  tab2Root: any = ScanPage;
  tab3Root: any = CommandPage;

  constructor() {

  }
}
