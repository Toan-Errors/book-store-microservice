import { Controller, Logger } from '@nestjs/common';
import { AuthorService } from './author.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  private readonly logger = new Logger(AuthorController.name);

  @MessagePattern({ cmd: 'findAllAuthors' })
  async findAllAuthors() {
    this.logger.log(`Received find all authors command`);
    return this.authorService.findAll();
  }

  @MessagePattern({ cmd: 'findAuthorById' })
  async findAuthorById(data: { id: string }) {
    this.logger.log(`Received find author by id command for ${data.id}`);
    return this.authorService.findById(data.id);
  }

  @MessagePattern({ cmd: 'createAuthor' })
  async createAuthor(data: any) {
    this.logger.log(`Received create author command for ${data.name}`);
    return this.authorService.create(data);
  }

  @MessagePattern({ cmd: 'updateAuthor' })
  async updateAuthor(data: { id: string; body: any }) {
    this.logger.log(`Received update author command for ${data.id}`);
    return this.authorService.update(data.id, data.body);
  }

  @MessagePattern({ cmd: 'deleteAuthor' })
  async deleteAuthor(data: { id: string }) {
    this.logger.log(`Received delete author command for ${data.id}`);
    return this.authorService.delete(data.id);
  }
}
