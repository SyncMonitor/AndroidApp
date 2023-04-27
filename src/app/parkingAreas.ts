export class ParkingArea{
    constructor(
      public id: number,
      public fkSensorId: number,
      public latitude: string,
      public longitude: string,
      public address: string,
      public value: boolean
    ){ }
}
