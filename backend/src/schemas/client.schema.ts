import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class Client extends Document {
  @Prop()
  nome: string;

  @Prop()
  cpfCnpj: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
