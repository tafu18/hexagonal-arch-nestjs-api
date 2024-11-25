import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './application/dtos/CreateTicketDto';
import { TicketResponseDto } from './application/dtos/TicketResponseDto';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async createTicket(
    @Body() createTicketDto: CreateTicketDto,
  ): Promise<TicketResponseDto> {
    return await this.ticketService.createTicket(createTicketDto);
  }

  @Get(':id')
  async getTicketById(
    @Param('id') ticketId: string,
  ): Promise<TicketResponseDto> {
    return await this.ticketService.getTicketById(ticketId);
  }

  @Get(':id')
  async getTicketBy(@Param('id') ticketId: string): Promise<TicketResponseDto> {
    return await this.ticketService.getTicketById(ticketId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.ticketService.delete(id);
  }
}
