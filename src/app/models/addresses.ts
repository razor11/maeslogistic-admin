export class Addresses  {
  id: number;
  contactName: string;
  phoneNumber1: string;
  phoneNumber2: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: string;
  longitude: string;
  addressType: {
    id: number;
    description:string;
  };
}
