import { Component, OnInit, OnDestroy, Renderer, ElementRef, ViewChild } from '@angular/core';
import { SeatAllocationService } from '../providers/services/seatAllocationService';
import { Subscription } from '../../../../node_modules/rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SubmitSeatsDTO } from '../interfaces/seat-allocation.interface';
import { StatusCodes } from '../../app.constants';


@Component({
  selector: 'app-seat-allocation',
  templateUrl: './seat-allocation.component.html',
  styleUrls: ['./seat-allocation.component.scss']
})
export class SeatAllocationComponent implements OnInit, OnDestroy {
  @ViewChild('rejectSeatAllocation') private _rejectModal: ElementRef;
  public seats: Array<Array<Seat>> = new Array<Array<Seat>>();
  public selectedSeats: Array<Seat> = new Array<Seat>();
  public _subscription: Subscription[] = [];
  public selectedRequest: any;
  public _requestFlag = false;
  public closeResult: string;
  public _submitSeatsDTO: SubmitSeatsDTO;
  public _rejectComments: string;

  constructor(private _seatAllocationService: SeatAllocationService, private _router: Router, private _messageService: MessageService,
    private _modalService: NgbModal, private _renderer: Renderer) { }

  ngOnInit() {
    this.selectedRequest = JSON.parse(sessionStorage.getItem('selectedRequest'));
    if (this.selectedRequest == null) {
      this._router.navigate(['/approve-request']);
    }
    this._subscription.push(this._seatAllocationService.
      fetchLayout(this.selectedRequest.buildingId, this.selectedRequest.floorId, this.selectedRequest.bayId).subscribe(res => {
        this.seats = res.results;
      }));
  }
  ngOnDestroy() {
    this._subscription.forEach(sub => sub.unsubscribe());
  }

  public selectDeselectAvailableSeats(selectedSeat: Seat) {
    if (selectedSeat.currentlySelected) {
      const index = this.selectedSeats.indexOf(selectedSeat);
      if (index !== -1) {
        this.selectedSeats.splice(index, 1);
      }
    } else {
      this.selectedSeats.push(selectedSeat);
      if (this.selectedSeats.length + 1 > this.selectedRequest.seatCount) {
        this._requestFlag = true;
        this._messageService.add({
          severity: 'error', summary: 'Error', detail: 'Selection of seats exceeded more than requested'
          , closable: true
        });
      }
    }
    selectedSeat.currentlySelected = !selectedSeat.currentlySelected;
  }

  onClose() {
    this._messageService.clear();
  }

  onReject() {
    this._renderer.setElementClass(this._rejectModal.nativeElement, 'show', true);
    this._renderer.setElementStyle(this._rejectModal.nativeElement, 'display', 'block');
  }

  hideModal() {
    this._renderer.setElementClass(this._rejectModal.nativeElement, 'show', false);
    this._renderer.setElementStyle(this._rejectModal.nativeElement, 'display', 'none');
  }

  onSubmit() {
    this._submitSeatsDTO = <SubmitSeatsDTO>{};
    const seatIds: string[] = [];
    this.selectedSeats.forEach(element => {
      seatIds.push(element.seatId);
    });
    this._submitSeatsDTO.seatIds = seatIds;
    this._submitSeatsDTO.requestId = this.selectedRequest.requestId;
    this._submitSeatsDTO.comments = '';
    this._seatAllocationService.approveRequest(this._submitSeatsDTO).subscribe(response => {
      if (response.statusCd = StatusCodes.RESULTS_FOUND) {
        this._requestFlag = true;
        this._messageService.add({
          severity: 'success', summary: 'Success', detail: 'Request has been approved successfully'
          , closable: true
        });
      } else {
        this._requestFlag = true;
        this._messageService.add({
          severity: 'error', summary: 'Error', detail: 'Error while approving the request'
          , closable: true
        });
      }
    });
  }

  onRejectCommentsSubmit() {
    this._submitSeatsDTO = <SubmitSeatsDTO>{};
    this._submitSeatsDTO.requestId = this.selectedRequest.requestId;
    this._submitSeatsDTO.comments = this._rejectComments;
    this._seatAllocationService.rejectRequest(this._submitSeatsDTO).subscribe(response => {
      if (response.statusCd = StatusCodes.RESULTS_FOUND) {
        this._requestFlag = true;
        this._messageService.add({
          severity: 'success', summary: 'Success', detail: 'Request has been Rejected successfully'
          , closable: true
        });
      } else {
        this._requestFlag = true;
        this._messageService.add({
          severity: 'error', summary: 'Error', detail: 'Error while rejecting the request'
          , closable: true
        });
      }
    });
    this.hideModal();
  }
}

class Seat {
  seatNbr: string;
  occupancy: string;
  project: string;
  currentlySelected: boolean;
  seatId: string;

  constructor(seatNbr: string, occupancy: string, project: string, seatId: string) {
    this.seatNbr = seatNbr;
    this.occupancy = occupancy;
    this.project = project;
    this.currentlySelected = false;
    this.seatId = seatId;
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
  type: string;

  constructor(requestId: string,
    buildingId: string,
    floorId: string,
    bayId: string,
    seatCount: number,
    projectName: boolean,
    requestInitiator: string,
    status: string,
    type: string) {
    this.requestId = requestId;
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

