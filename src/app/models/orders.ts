
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
    value: number;
  };
  embarcation: {
    embarcation: number;
  };
  orderDetail: [
    {
    itemsCant: number;
    description: string;
    weight: number;
    height: number;
    width: number;
    length: number;
    amount: number;
    }
  ];
  totals: {
    discount: number;
  }
}
