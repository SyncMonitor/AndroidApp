import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';
import { SensorService } from '../parking.service';
import { ParkingArea } from '../parkingAreas';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  map: Leaflet.Map = {} as any;
  panelOpenState = false;
  sensors: ParkingArea[] = []
  redIcon = Leaflet.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  greenIcon = Leaflet.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  markers: any[] = [];
  info: string = "";
  grouped: any[] = [];

  constructor(private sensorService: SensorService) {
    sensorService.changeObserver.subscribe(sensor => {
      setTimeout(() => {
        this.showMarker(sensor)
      }, 500);

    })
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.map = Leaflet.map("map").setView([45.406435, 11.876761], 12);
      Leaflet.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 21,
        subdomains:['mt0','mt1','mt2','mt3']
      }).addTo(this.map);

      this.sensorService
        .getAllParkingAreas()
        .subscribe(data => {
          this.sensors = data;
          for (let i = 0; i <= this.sensors.length; ++i) {
            if (this.sensors[i].value){
              this.markers[i] = Leaflet.marker([parseFloat(this.sensors[i].latitude),
                                                parseFloat(this.sensors[i].longitude)], {icon: this.redIcon}).addTo(this.map);}
            else {
              this.markers[i] = Leaflet.marker([parseFloat(this.sensors[i].latitude),
                                                parseFloat(this.sensors[i].longitude)], {icon: this.greenIcon}).addTo(this.map);}
            this.markers[i].bindPopup(this.getInfo(this.sensors[i]), {closeButton: false});
          }
      });

      this.sensorService
        .getAllParkingAreas()
        .subscribe(data => {
          this.sensors = data;
          this.grouped = this.sensors.reduce((group : any, current)=> {
          const groupingKey = `${current.address}`;
          group[groupingKey]= group[groupingKey] || [];
          group[groupingKey].push(current);
          return group;}, {})
        });
    }, 500)

  }

  getInfo (sensor: ParkingArea) {
    this.info = sensor.address + "<br>";
    if (sensor.value){
      this.info = this.info + "Parcheggio: occupato" + "<br>";}
    else{
      this.info = this.info + "Parcheggio: libero" + "<br>";}
    this.info = this.info + "Sensore: " + sensor.id;
    return this.info;
  }

  showMarker(item: ParkingArea) {
    this.map.setView([parseFloat(item.latitude), parseFloat(item.longitude)], 21);
    for (let j = 0; j <= this.markers.length; ++j) {
      if (this.markers[j].getLatLng().lat == parseFloat(item.latitude) &&
          this.markers[j].getLatLng().lng == parseFloat(item.longitude)) {
            this.markers[j].openPopup();}
    }
  }
}
