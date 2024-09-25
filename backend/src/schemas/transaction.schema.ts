import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document,
  HydratedDocument,
  Schema as MongooseSchema,
  Types,
} from 'mongoose';
import { Client } from './client.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction extends Document {
  @Prop()
  id: string;

  @Prop({ type: Date })
  data: Date;

  @Prop()
  valor: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Client.name })
  client: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
