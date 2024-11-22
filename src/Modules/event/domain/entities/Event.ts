export class Event {
  id: string; // UUID veya otomatik olarak oluşturulmuş bir ID
  name: string;
  description?: string;
  date: Date;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  tickets: any[];

  constructor(
    id: string,
    name: string,
    date: Date,
    location: string,
    createdAt: Date,
    updatedAt: Date,
    description?: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.location = location;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Örnek bir iş kuralı: Etkinliğin güncellenip güncellenemeyeceğini kontrol eder.
  canBeUpdated(): boolean {
    const now = new Date();
    return now < this.date; // Geçmiş bir etkinlik güncellenemez
  }
}
