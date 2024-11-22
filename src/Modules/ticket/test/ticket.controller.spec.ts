import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from '../ticket.controller';
import { TicketService } from '../ticket.service';
import { CreateTicketDto } from '../application/dtos/CreateTicketDto';
import { TicketResponseDto } from '../application/dtos/TicketResponseDto';

describe('TicketController', () => {
  let ticketController: TicketController;
  let ticketService: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [
        {
          provide: TicketService,
          useValue: {
            createTicket: jest.fn(),
            getTicketById: jest.fn(),
          },
        },
      ],
    }).compile();

    ticketController = module.get<TicketController>(TicketController);
    ticketService = module.get<TicketService>(TicketService);
  });

  describe('createTicket', () => {
    it('should create a ticket and return its details', async () => {
      const createTicketDto: CreateTicketDto = {
        id: '123',
        event_id: 'event-1',
        buyerName: 'John Doe',
        buyerEmail: 'john.doe@example.com',
        price: 50.0,
        purchasedAt: new Date('2024-01-01'),
      };

      const mockResponse: TicketResponseDto = {
        ...createTicketDto,
      };

      jest.spyOn(ticketService, 'createTicket').mockResolvedValue(mockResponse);

      const result = await ticketController.createTicket(createTicketDto);

      expect(result).toEqual(mockResponse);
      expect(ticketService.createTicket).toHaveBeenCalledWith(createTicketDto);
    });
  });

  describe('getTicketById', () => {
    it('should return a ticket by its ID', async () => {
      const ticketId = '123';
      const mockResponse: TicketResponseDto = {
        id: '123',
        event_id: 'event-1',
        buyerName: 'John Doe',
        buyerEmail: 'john.doe@example.com',
        price: 50.0,
        purchasedAt: new Date('2024-01-01'),
      };

      jest
        .spyOn(ticketService, 'getTicketById')
        .mockResolvedValue(mockResponse);

      const result = await ticketController.getTicketById(ticketId);

      expect(result).toEqual(mockResponse);
      expect(ticketService.getTicketById).toHaveBeenCalledWith(ticketId);
    });
  });
});
