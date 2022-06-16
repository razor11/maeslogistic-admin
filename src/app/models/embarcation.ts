export class embarcation {
  id!: number;
  EstimatedDepartureDate!: Date;
  EstimatedArrivingDate!: Date;
  VeselNumber!: string;
  LogisticOperator!: {
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
  volumenCapacity:number;
  tracking: {
    id: number;
    description: string;
  };
}
