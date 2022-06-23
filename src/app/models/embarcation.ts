export class embarcation {
  id!: number;
  EstimatedDepartureDate!: Date;
  EstimatedArrivingDate!: Date;
  VeselNumber!: string;
  logisticOperator!: {
    id: number;
    Name: string;
    Country: string;
    ZipCode: string;
    City: string;
    Street: string;
    Suite: string;
    ContactNumber: string;
  };
  WeigthCapacity!: number;
  WeigthCapacityUsed: number;
  volumeCapacity:number;
  volumeCapacityUsed: number;
  tracking: {
    id: number;
    description: string;
  };
}
