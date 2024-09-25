import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dtos/client.dto';
import { Client } from './schemas/client.schema';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name)
    private clientModel: Model<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    return this.clientModel.create(createClientDto);
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }

  async findByCpfCnpj(cpfCnpj: string): Promise<Client> {
    return this.clientModel.findOne({ cpfCnpj }).exec();
  }
}
