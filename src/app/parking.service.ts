import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ParkingArea } from './parkingAreas';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private url = 'assets/getAllParkingAreas.json';

  emitChangeSubject = new Subject<ParkingArea>()
  changeObserver = this.emitChangeSubject.asObservable()

  constructor(private http: HttpClient) {}

  emitChange(change: ParkingArea){
    this.emitChangeSubject.next(change)
  }

  getAllParkingAreas() {
    return this.http.get<ParkingArea[]>(this.url)
  }

}
