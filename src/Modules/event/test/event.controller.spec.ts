import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from '../event.controller';
import { EventService } from '../event.service';
import { CreateEventDto } from '../application/dtos/CreateEventDto';
import { EventResponseDto } from '../application/dtos/EventResponseDto';

describe('EventController', () => {
  let eventController: EventController;
  let eventService: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useValue: {
            createEvent: jest.fn(),
            getEventById: jest.fn(),
          },
        },
      ],
    }).compile();

    eventController = module.get<EventController>(EventController);
    eventService = module.get<EventService>(EventService);
  });

  describe('createEvent', () => {
    it('should create an event and return its details', async () => {
      const createEventDto: CreateEventDto = {
        id: '123',
        name: 'Test Event',
        description: 'A test event',
        date: new Date('2024-01-01'),
        location: 'Test Location',
      };

      const mockResponse: EventResponseDto = {
        ...createEventDto,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
      };

      jest.spyOn(eventService, 'createEvent').mockResolvedValue(mockResponse);

      const result = await eventController.createEvent(createEventDto);

      expect(result).toEqual(mockResponse);
      expect(eventService.createEvent).toHaveBeenCalledWith(createEventDto);
    });
  });

  describe('getEventById', () => {
    it('should return an event by its ID', async () => {
      const event_id = '123';
      const mockResponse: EventResponseDto = {
        id: '123',
        name: 'Test Event',
        description: 'A test event',
        date: new Date('2024-01-01'),
        location: 'Test Location',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
      };

      jest.spyOn(eventService, 'getEventById').mockResolvedValue(mockResponse);

      const result = await eventController.getEventById(event_id);

      expect(result).toEqual(mockResponse);
      expect(eventService.getEventById).toHaveBeenCalledWith(event_id);
    });
  });
});
