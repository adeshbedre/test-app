import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SeatDeallocationService } from '../providers/services/seatDeallocationService';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-seat-deallocation',
  templateUrl: './seat-deallocation.component.html',
  styleUrls: ['./seat-deallocation.component.scss']
})
export class SeatDeallocationComponent implements OnInit {
  public deallocationRequestForm: FormGroup;
  public _selectionExceededRequested: Boolean = true;
  public _buildingId: String;
  public _floorId: Number;
  public _bayId: String;
  public _seatCount: Number;
  public _projectName: String;
  public _requestInitiator: String;
  public bayList = [];
  public floorList = [];
  public buildingList = [];
  public projectList = [];
  public selectedProject: string;
  public selectedBuilding: string;
  public selectedFloor: string;
  public selectedBay: string;

  constructor(private _fb: FormBuilder, private _seatDeallocationService: SeatDeallocationService,
    private _messageService: MessageService) {

  }

  ngOnInit() {
    this.deallocationRequestForm = this._fb.group({
      project: ['', Validators.required],
      building: ['', Validators.required],
      floor: ['', Validators.required],
      bay: ['', Validators.required],
      seatCount: ['', Validators.required],
      requestInitiator: ['', Validators.required],
    });
    this._seatDeallocationService.fetchProjects().subscribe(response => {
      this.projectList = response.results;
    });
  }

  public onProjectChange() {
    this._seatDeallocationService.fetchBuildingsByProject(this.selectedProject).subscribe(response => {
      this.buildingList = response.results;
    });
  }

  public onBuildingChange() {
    this._seatDeallocationService.fetchFloorsByBuilding(this.selectedBuilding).subscribe(response => {
      this.floorList = response.results;
    });
  }

  public onFloorChange() {
    this._seatDeallocationService.fetchBaysByFloor(this.selectedFloor).subscribe(response => {
      this.bayList = response.results;
    });
  }

  ngOnDestroy() {
    //this._subscription.forEach(sub => sub.unsubscribe());
  }
  clearForm() {
    this.deallocationRequestForm.controls['project'].setValue('');
    this.deallocationRequestForm.controls['building'].setValue('');
    this.deallocationRequestForm.controls['floor'].setValue('');
    this.deallocationRequestForm.controls['bay'].setValue('');
    this.deallocationRequestForm.controls['seatCount'].setValue('');
    this.deallocationRequestForm.controls['requestInitiator'].setValue('');
  }
  // constructor(buildingId: string, floorId: number, bayId: string,
  //   seatCount: number, projectName: string, requestInitiator: string, status: string)
  onSubmit(deallocationRequestForm: FormGroup) {
    const seatRequest = new SeatRequestDTO(this.deallocationRequestForm.controls['building'].value,
      this.deallocationRequestForm.controls['floor'].value,
      this.deallocationRequestForm.controls['bay'].value,
      this.deallocationRequestForm.controls['seatCount'].value,
      this.deallocationRequestForm.controls['project'].value,
      this.deallocationRequestForm.controls['requestInitiator'].value,
      'CREATED','DEALLOCATION');
    this._seatDeallocationService.saveSeatRequestService(seatRequest).subscribe(result => {
      this._selectionExceededRequested = true;
      this._messageService.add({
        severity: 'success', summary: 'Success', detail: 'Request created successfully', closable: true
      });
      this.clearForm();
    });
  }
}

class SeatRequestDTO {

  buildingId: string;

  floorId: number;

  bayId: string;

  seatCount: number;

  projectName: string;

  requestInitiator: string;

  status: string;

  type: string;

  constructor(buildingId: string, floorId: number, bayId: string,
    seatCount: number, projectName: string, requestInitiator: string, status: string, type: string) {
    this.buildingId = buildingId;
    this.floorId = floorId;
    this.bayId = bayId;
    this.seatCount = seatCount;
    this.projectName = projectName;
    this.requestInitiator = requestInitiator;
    this.status = status;
    this.type = type;
  }
}


