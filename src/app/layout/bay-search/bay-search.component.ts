import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SeatAllocationService } from '../providers/services/seatAllocationService';
import { Subscription } from '../../../../node_modules/rxjs';
import { routerTransition } from '../../router.animations';
import { Validators, FormBuilder, FormGroup, FormControl, Form } from '@angular/forms';

@Component({
  selector: 'app-bay-search',
  templateUrl: './bay-search.component.html',
  styleUrls: ['./bay-search.component.scss'],
  animations: [routerTransition()]
})
export class BaySearchComponent implements OnInit, OnDestroy {
  public seats: Array<Array<Seat>> = new Array<Array<Seat>>();
  public bayList = [];
  public floorList = [];
  public buildingList = [];
  public selectedSeats: Array<Seat> = new Array<Seat>();
  private _subscription: Subscription[] = [];
  public selectedRequest: any;
  public baySearchForm: FormGroup;
  public showLayout: Boolean = false;
  public selectedBuilding: string;
  public selectedFloor: string;
  public selectedBay: string;

  constructor(private _seatAllocationService: SeatAllocationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.baySearchForm = this.formBuilder.group({
      building: ['', Validators.required],
      floor: ['', Validators.required],
      bay: ['', Validators.required]
    });
    this._seatAllocationService.fetchBuildings().subscribe(response => {
      this.buildingList = response.results;
    });
  }

  public onBuildingChange() {
    this._seatAllocationService.fetchFloorsByBuilding(this.selectedBuilding).subscribe(response => {
      this.floorList = response.results;
    });
  }

  public onFloorChange() {
    this._seatAllocationService.fetchBaysByFloor(this.selectedFloor).subscribe(response => {
      this.bayList = response.results;
    });
  }

  ngOnDestroy() {
    this._subscription.forEach(sub => sub.unsubscribe());
  }

  onSearch(form: any) {
    sessionStorage.setItem('baySearchForm', JSON.stringify(form.value));
    this._subscription.push(this._seatAllocationService.
      fetchLayout(form.value.building, form.value.floor, form.value.bay).subscribe(res => {
        this.showLayout = true;
        this.seats = res.results;
      }));
  }

  public clearForm() {
    this.baySearchForm.controls['building'].setValue('');
    this.baySearchForm.controls['floor'].setValue('');
    this.baySearchForm.controls['bay'].setValue('');
    this.seats = [];
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

class AllocationRequest {
  requestId: string;
  buildingId: string;
  floorId: string;
  bayId: string;
  seatCount: number;
  projectName: boolean;
  requestInitiator: string;
  status: string;

  constructor(requestId: string,
    buildingId: string,
    floorId: string,
    bayId: string,
    seatCount: number,
    projectName: boolean,
    requestInitiator: string,
    status: string) {
    this.requestId = requestId;
    this.buildingId = buildingId;
    this.floorId = floorId;
    this.bayId = bayId;
    this.seatCount = seatCount;
    this.projectName = projectName;
    this.requestInitiator = requestInitiator;
    this.status = status;
  }
}
