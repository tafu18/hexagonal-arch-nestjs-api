export class CreateTicketDto {
  id: string;
  event_id: string;
  buyerName: string;
  buyerEmail: string;
  price: number;
  purchasedAt: Date;

  constructor(
    id: string,
    event_id: string,
    buyerName: string,
    buyerEmail: string,
    price: number,
    purchasedAt: Date,
  ) {
    this.id = id;
    this.event_id = event_id;
    this.buyerName = buyerName;
    this.buyerEmail = buyerEmail;
    this.price = price;
    this.purchasedAt = purchasedAt;
  }
}
