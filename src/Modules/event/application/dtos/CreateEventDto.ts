export class CreateEventDto {
  id: string;
  name: string;
  description?: string;
  date: Date;
  location: string;

  constructor(
    id: string,
    name: string,
    date: Date,
    location: string,
    description?: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.location = location;
  }
}
