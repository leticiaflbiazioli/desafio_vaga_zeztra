import { Document } from 'mongoose';

export interface Client extends Document {
  nome: string;
  cpfCnpj: string;
}
