import { Document } from 'mongoose';

export interface BookInterface extends Document {
  readonly title: string;
  readonly author: string;
  readonly description: string;
  readonly ISBN: string;
  readonly price: string;
  readonly createAt: Date;
}
