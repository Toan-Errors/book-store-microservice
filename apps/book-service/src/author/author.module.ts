import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorController } from './author.controller';
import { Author, AuthorSchema } from './author.schema';
import { AuthorService } from './author.service';
import { AwardModule } from './award/award.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Author.name,
        schema: AuthorSchema,
      },
    ]),
    AwardModule,
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
