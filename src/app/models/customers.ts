export class Customers {
  id!: number;
  firstName!: string;
  middleName!: string;
  lastName!: string;
  userName!: string;
  email!: string;
  password!: string;
  telephone!:string;
  companyName!:string;
  addresses!:[
    {
      contactName: string;
      phoneNumber1: string;
      phoneNumber2: string;
      email: string;
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
      addressType: {
        id: number,
        description: string
      };

    }
  ];

 }


