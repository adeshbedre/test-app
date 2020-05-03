import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bay-layout',
  templateUrl: './bay-layout.component.html',
  styleUrls: ['./bay-layout.component.scss']
})
export class BayLayoutComponent implements OnInit {
  @Input() public seats: Array<Array<Seat>>;
  ngOnInit() {
  }
}

class Seat {
  seatNbr: string;
  occupancy: string;
  project: string;
  currentlySelected: boolean;

  constructor(seatNbr: string, occupancy: string, project: string) {
    this.seatNbr = seatNbr;
    this.occupancy = occupancy;
    this.project = project;
    this.currentlySelected = false;
  }
}