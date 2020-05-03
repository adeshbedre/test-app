import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { SeatAllocationService } from '../providers/services/seatAllocationService';
import { SeatDeallocationService } from '../providers/services/seatDeallocationService';
import { Router } from '@angular/router';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-approve-request',
  templateUrl: './approve-request.component.html',
  styleUrls: ['./approve-request.component.scss'],
  animations: [routerTransition()]
})
export class ApproveRequestComponent implements OnInit, OnDestroy {

  requests: any[];
  cols: any[];
  private _subscription: Subscription[] = [];

  constructor(private _seatAllocationService: SeatAllocationService, private _seatDeallocationService: SeatDeallocationService, private _router: Router) { }
  private _page = 0;
  private _size = 10;

  ngOnInit() {
    this._subscription.push(this._seatAllocationService.fetchRequests(this._page + '', this._size + '').subscribe(res => {
      this.requests = res.results;
    }));
    this.cols = [
      { field: 'requestId', header: 'Request Id' },
      { field: 'buildingId', header: 'Building Id' },
      { field: 'floorId', header: 'Floor Id' },
      { field: 'bayId', header: 'Bay Id' },
      { field: 'seatCount', header: 'No of Seats Requested' },
      { field: 'projectName', header: 'Project Name' },
      { field: 'requestInitiator', header: 'Request Initiator' },
      { field: 'status', header: 'Status' },
      { field: 'type', header: 'Type' }
    ];
    this._subscription.push(this._seatDeallocationService.fetchRequests(this._page + '', this._size + '').subscribe(res => {
      this.requests = res.results;
    }));
    this.cols = [
      { field: 'requestId', header: 'Request Id' },
      { field: 'buildingId', header: 'Building Id' },
      { field: 'floorId', header: 'Floor Id' },
      { field: 'bayId', header: 'Bay Id' },
      { field: 'seatCount', header: 'No of Seats Requested' },
      { field: 'projectName', header: 'Project Name' },
      { field: 'requestInitiator', header: 'Request Initiator' },
      { field: 'status', header: 'Status' },
      { field: 'type', header: 'Type' }
    ];
  }
  ngOnDestroy() {
    this._subscription.forEach(sub => sub.unsubscribe());
  }

  onRowSelect(event) {
    sessionStorage.setItem('selectedRequest', JSON.stringify(event.data));
    this._router.navigate(['/allocate-seats']);
  }
  paginate(event) {
    this._page = event.first; //Index of the first record
    this._size = event.rows; // Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
  }
}
