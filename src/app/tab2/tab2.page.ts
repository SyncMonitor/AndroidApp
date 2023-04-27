import { ParkingArea } from './../parkingAreas';
import { Component } from '@angular/core';

import { SensorService } from '../parking.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  parcheggi : ParkingArea[][] = [[]] // Array<Array<ParkingArea>>
  addresses : string[] = []

  constructor(private parkingService: SensorService, private route: Router) {
    this.parkingService.getAllParkingAreas().subscribe( pAreas => {
      this.addresses = []
      let gParkingAreas = []
      for(let par of pAreas){
        if(!this.addresses.includes(par.address)){
          this.addresses.push(par.address)
          gParkingAreas.push(this.groupByAddress(pAreas, par.address))
        }
      }
      this.parcheggi = gParkingAreas
    })
  }

  groupByAddress(p: ParkingArea[], address: string){
    let groupedParkingAreas: ParkingArea[] = []
    for(let par of p){
      if(par.address == address){
        groupedParkingAreas.push(par)
      }
    }
    return groupedParkingAreas
  }

  showMarker(item: ParkingArea) {
    this.route.navigateByUrl('/app/tabs/tab1')
    this.parkingService.emitChange(item)
  }

}
