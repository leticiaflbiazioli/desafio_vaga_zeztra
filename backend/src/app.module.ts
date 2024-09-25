import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientService } from './client.service';
import { Client, ClientSchema } from './schemas/client.schema';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ClientService, TransactionService],
  exports: [],
})
export class AppModule {}
