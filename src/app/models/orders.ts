
export class Order {
  general: {
    company: number;
    orderDate: string;
  };
  shipper: {
    customer: number;
    shippingAddress: number;
    destinationAddress: number;
  };
  shipping: {
    shippingType: number;
    serviceType: number;
    packageType: number;
    packageCant: number;
    packageContent: string;
    packageDimensions: string;
    value: number;
    serviceCost: number;
    marineInsurance: number;
  };
  embarcation: {
    embarcation: number;
  };
  orderDetail: {
    itemsCant: number;
    description: string;
    weight: number;
    height: number;
    width: number;
    length: number;
    price: number;
    discount: number;
    taxes: number;
    subtotal: number;
  };
}
