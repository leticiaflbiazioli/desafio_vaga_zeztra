import { Client } from 'src/interfaces/client.interface';

export class CreateTransactionDto {
  id: string;
  data: Date;
  valor: number;
  client: Client;
}
