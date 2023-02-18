import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Newletter } from './newletter.schema';

@Injectable()
export class NewletterService {
  constructor(
    @InjectModel(Newletter.name)
    private readonly newletterModel: Model<Newletter>,
  ) {}
}
