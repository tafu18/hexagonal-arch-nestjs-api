export class Ticket {
  id: string; // UUID veya otomatik ID
  event_id: string; // Biletin bağlı olduğu etkinlik
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

  // İş kuralı: İade yapılabilir mi?
  canBeRefunded(): boolean {
    const now = new Date();
    const refundDeadline = new Date(this.purchasedAt);
    refundDeadline.setDate(refundDeadline.getDate() + 7); // 7 gün iade süresi
    return now <= refundDeadline;
  }
}
