import { Document } from 'mongoose';
import { Client } from './client.interface';

export interface Transaction extends Document {
  id: string;
  data: Date;
  valor: number;
  client: Client;
}
