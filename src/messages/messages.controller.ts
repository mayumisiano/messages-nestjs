import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Post, 
  NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  messagesService: MessagesService;

  constructor() {
    //DONT DO THIS ON REAL APPS! USE DEPENDENCY INJECTION
    this.messagesService = new MessagesService();
  }

  @Get()
  listmessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);

    if(!message) {
      throw new NotFoundException(`Message ${id} not found!`);
    }
    return message;
  }
}
