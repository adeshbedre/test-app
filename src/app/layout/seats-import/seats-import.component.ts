import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SeatAllocationService } from '../providers/services/seatAllocationService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-seats-import',
  templateUrl: './seats-import.component.html',
  styleUrls: ['./seats-import.component.scss'],
  animations: [routerTransition()]
})
export class SeatsImportComponent implements OnInit {

  @ViewChild('inputFile') fileInput: ElementRef;

  public selectedFileName = 'No file selected';
  public selectedfile: File;
  public seats: Array<Array<Seat>> = new Array<Array<Seat>>();
  public selectedSeats: Array<Seat> = new Array<Seat>();
  public saveSeats: Array<Seat> = new Array<Seat>();
  public importSeatLayoutForm: FormGroup;
  public bayList = [];
  public floorList = [];
  public buildingList = [];
  public _selectionExceededRequested = true;
  public selectedBuilding: string;
  public selectedFloor: string;
  public selectedBay: string;

  constructor(private _seatsService: SeatAllocationService, private _fb: FormBuilder, private _messageService: MessageService) { }

  ngOnInit() {
    this.importSeatLayoutForm = this._fb.group({
      building: ['', Validators.required],
      floor: ['', Validators.required],
      bay: ['', Validators.required]
    });
    this._seatsService.fetchBuildings().subscribe(response => {
      this.buildingList = response.results;
    });
  }

  public onClick() {
    console.log(this.importSeatLayoutForm);
  }

  public onBuildingChange() {
    this._seatsService.fetchFloorsByBuilding(this.selectedBuilding).subscribe(response => {
      this.floorList = response.results;
    });
  }

  public onFloorChange() {
    this._seatsService.fetchBaysByFloor(this.selectedFloor).subscribe(response => {
      this.bayList = response.results;
    });
  }

  fileChange(event) {
    console.log('Building', this.selectedBuilding);
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFileName = fileList[0].name;
      this.selectedfile = fileList[0];
      console.log(this.selectedfile.type);
      const reader = new FileReader();
      reader.readAsText(this.selectedfile, 'UTF-8');
      reader.onload = (fileLoadEvent) => {
        const excelContentAsString = reader.result;
        const allRows = (<String>excelContentAsString).split('\n');

        for (let i = 0; i < allRows.length; i++) {
          if (allRows[i] || allRows[i].trim() !== '') {
            const cellValues = allRows[i].split(',');
            const rowSeats: Seat[] = this.fecthRowSeats(cellValues, i);
            this.seats.push(rowSeats);
          }
        }
        console.log(this.seats);

      };
    }
  }

  public fecthRowSeats(rowCellsList: Array<string>, rowId: number) {
    const rowSeats: Seat[] = [];
    rowCellsList.forEach((eachCellValue, colId) => {
      const seatValues = eachCellValue.split('|');
      const building = this.importSeatLayoutForm.controls.building.value;
      const floor = this.importSeatLayoutForm.controls.floor.value;
      const bay = this.importSeatLayoutForm.controls.bay.value;
      const eachSeat: Seat = new Seat(building, floor, bay,
        seatValues[0], seatValues[1], seatValues[2], rowId, colId);
      rowSeats.push(eachSeat);
      this.saveSeats.push(eachSeat);
    });
    return rowSeats;
  }

  uploadCsv() {
    this._seatsService.saveTemplateService(this.saveSeats).subscribe(result => {
      this._messageService.add({
        severity: 'success', summary: 'Success', detail: 'Seats saved successfully', closable: true
      });
      this.seats = new Array<Array<Seat>>();
      this.selectedFileName = 'No file selected';
      this.fileInput.nativeElement.value = '';
    });
  }

  cancelUpload() {
    this.seats = new Array<Array<Seat>>();
    this.selectedFileName = 'No file selected';
    this.fileInput.nativeElement.value = '';
  }

}

class Seat {
  building: string;
  floor: string;
  bayId: string;
  seatNbr: string;
  occupancy: string;
  project: string;
  rowId: number;
  colId: number;
  constructor(building: string, floor: string, bayId: string,
    seatNbr: string, occupancy: string, project: string, rowId: number, colId: number) {
    this.building = building;
    this.floor = floor;
    this.bayId = bayId;
    this.seatNbr = seatNbr;
    this.occupancy = occupancy;
    this.project = project;
    this.rowId = rowId;
    this.colId = colId;
  }
}
