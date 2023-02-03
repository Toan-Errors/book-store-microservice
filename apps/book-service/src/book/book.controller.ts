import { BookService } from './book.service';
import { Controller, Injectable, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateBookDto } from '@app/common';

@Injectable()
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  private readonly logger = new Logger(BookController.name);

  @MessagePattern({ cmd: 'findAllBooks' })
  async findAllBooks() {
    this.logger.log(`Received find all books command`);
    return this.bookService.findAll();
  }

  @MessagePattern({ cmd: 'createBook' })
  async createBook(data: CreateBookDto) {
    this.logger.log(`Received create book command for ${data.title}`);
    return this.bookService.create(data);
  }

  @MessagePattern({ cmd: 'updateBook' })
  async updateBook(data: {
    id: string;
    book: CreateBookDto;
  }): Promise<CreateBookDto> {
    this.logger.log(`Received update book command for ${data.book.title}`);
    return this.bookService.update(data.id, data.book);
  }

  @MessagePattern({ cmd: 'removeBook' })
  async deleteBook(data: { id: string }): Promise<any> {
    this.logger.log(`Received delete book command for ${data.id}`);
    return this.bookService.delete(data.id);
  }
}
