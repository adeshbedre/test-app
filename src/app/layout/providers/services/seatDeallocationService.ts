import { Http, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SubmitSeatsDTO } from '../../interfaces/seat-allocation.interface';

@Injectable()
export class SeatDeallocationService {

    private _fetchRequests = environment.fetchRequests;
    private _fetchLayout = environment.fetchLayout;
    private _saveSeatsTemplate = environment.saveSeatTemplateUrl;
    private _approveRequest = environment.approveRequest;
    private _saveSeatRequestTemplate = environment.saveRequestUrl;
    private _rejectRequest = environment.rejectRequest;
    private _fetchProjects = environment.fetchProjects;
    private _fetchBuildingsByProjects = environment.fetchBuildingsByProject;
    private _fetchFloorsByBuilding = environment.fetchFloorsByBuilding;
    private _fetchBaysByFloor = environment.fetchBaysByFloor;

    constructor(private _http: Http, private _httpClient: HttpClient) { }

    public fetchProjects(): Observable<any> {
        return this._http.get(this._fetchProjects)
            .pipe(map((response: Response) => <any>response.json()),
                tap(response => console.log('FetchProjects Response received')),
                catchError(this.handleError));
    }

    public fetchBuildingsByProject(project: string): Observable<any> {
        return this._http.get(this._fetchBuildingsByProjects)
            .pipe(map((response: Response) => <any>response.json()),
                tap(response => console.log('FetchBuildingsByProject Response received')),
                catchError(this.handleError));
    }

    public fetchFloorsByBuilding(building: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('building', building);
        return this._http.get(this._fetchFloorsByBuilding, { search: params })
            .pipe(map((response: Response) => <any>response.json()),
                tap(response => console.log('FetchFloorsByBuilding Response received')),
                catchError(this.handleError));
    }

    public fetchBaysByFloor(floor: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('floor', floor);
        return this._http.get(this._fetchBaysByFloor, { search: params })
            .pipe(map((response: Response) => <any>response.json()),
                tap(response => console.log('FetchBaysByFloor Response received')),
                catchError(this.handleError));
    }

    public fetchRequests(page: string, size: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('page', page);
        params.set('size', size);
        return this._http.get(this._fetchRequests, { search: params })
            .pipe(
                map((response: Response) => <any>response.json()),
                tap(response => console.log('end progress bar here')),
                catchError(this.handleError)
            );
    }

    public fetchLayout(buildingId: string, floorId: string, bayId: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('building', buildingId);
        params.set('floor', floorId);
        params.set('bayId', bayId);
        return this._http.get(this._fetchLayout, { search: params })
            .pipe(
                map((response: Response) => <any>response.json()),
                tap(response => console.log('end progress bar here')),
                catchError(this.handleError)
            );
    }

    public approveRequest(submitSeatsDTO: SubmitSeatsDTO): Observable<any> {
        return this._http.post(this._approveRequest, submitSeatsDTO )
            .pipe(
                map((response: Response) => <any>response.json()),
                catchError(this.handleError)
            );
    }

    public rejectRequest(submitSeatsDTO: SubmitSeatsDTO): Observable<any> {
        return this._http.post(this._rejectRequest, submitSeatsDTO )
            .pipe(
                map((response: Response) => <any>response.json()),
                catchError(this.handleError)
            );
    }

    public saveTemplateService(seats) {
        return this._httpClient.post(this._saveSeatsTemplate, seats);
    }

    public saveSeatRequestService(seatRequest) {
        return this._httpClient.post(this._saveSeatRequestTemplate, seatRequest);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        return Observable.throw(error.json().error || 'Server error');
    }
}
