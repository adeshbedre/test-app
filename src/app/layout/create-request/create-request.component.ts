import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { SeatAllocationService } from '../providers/services/seatAllocationService';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {

  public createRequestForm: FormGroup;
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
  public selectedBuilding: string;
  public selectedFloor: string;
  public selectedBay: string;

  constructor(private _fb: FormBuilder, private _seatAllocationService: SeatAllocationService,
    private _messageService: MessageService) {

  }

  ngOnInit() {
    this.createRequestForm = this._fb.group({
      building: ['', Validators.required],
      floor: ['', Validators.required],
      bay: ['', Validators.required],
      seatCount: ['', Validators.required],
      projectName: ['', Validators.required],
      requestInitiator: ['', Validators.required],
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
    //this._subscription.forEach(sub => sub.unsubscribe());
  }
  clearForm() {
    this.createRequestForm.controls['building'].setValue('');
    this.createRequestForm.controls['floor'].setValue('');
    this.createRequestForm.controls['bay'].setValue('');
    this.createRequestForm.controls['seatCount'].setValue('');
    this.createRequestForm.controls['projectName'].setValue('');
    this.createRequestForm.controls['requestInitiator'].setValue('');
  }
 // constructor(buildingId: string, floorId: number, bayId: string,
 //   seatCount: number, projectName: string, requestInitiator: string, status: string)
  onSubmit(createRequestForm: FormGroup) {
    const seatRequest = new SeatRequestDTO(this.createRequestForm.controls['building'].value,
      this.createRequestForm.controls['floor'].value,
      this.createRequestForm.controls['bay'].value,
      this.createRequestForm.controls['seatCount'].value,
      this.createRequestForm.controls['projectName'].value,
      this.createRequestForm.controls['requestInitiator'].value,
      'CREATED','ALLOCATION');
    this._seatAllocationService.saveSeatRequestService(seatRequest).subscribe(result => {
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
