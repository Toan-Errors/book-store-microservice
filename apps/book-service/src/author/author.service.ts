import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Author } from './author.schema';

@Injectable()
export class AuthorService {
  constructor(private readonly authorModel: Model<Author>) {}
}
