import { Injectable } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dtos/client.dto';
import { CreateTransactionDto } from './dtos/transaction.dto';
import { Transaction } from './schemas/transaction.schema';
import { IListDataProps, TransactionService } from './transaction.service';

interface IParsedData {
  id: string;
  nome: string;
  cpfCnpj: string;
  data: string;
  valor: string;
}

export interface IListResponse {
  data: Transaction[];
  pagination: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  };
}

@Injectable()
export class AppService {
  constructor(
    private clientService: ClientService,
    private transactionService: TransactionService,
  ) {}

  parseData(data: string) {
    const dataContent = data.split(/\r?\n/);
    const parsedData = [];
    dataContent.forEach((line) => {
      const lineContent = line.split(';');
      const parsedLine = {};
      lineContent.forEach((param) => {
        const paramData = param.split(':');
        if (paramData.length === 2) {
          parsedLine[paramData[0]] = paramData[1];
        }
      });
      parsedData.push(parsedLine);
    });
    return parsedData;
  }

  processData(data: IParsedData[]) {
    data.forEach(async (processingData) => {
      let client = await this.clientService.findByCpfCnpj(
        processingData.cpfCnpj,
      );
      if (!client) {
        try {
          const newClient = {
            nome: processingData.nome,
            cpfCnpj: processingData.cpfCnpj,
          } as CreateClientDto;
          client = await this.clientService.create(newClient);
        } catch (error) {
          console.error('Failed to create new client', error);
        }
      }

      let transaction = await this.transactionService.findByTransactionId(
        processingData.id,
      );
      if (!transaction) {
        try {
          const newTransaction = {
            id: processingData.id,
            valor: Number(processingData.valor),
            data: new Date(processingData.data),
            client: client.id,
          } as CreateTransactionDto;
          transaction = await this.transactionService.create(newTransaction);
        } catch (error) {
          console.error('Failed to create new transaction', error);
        }
      }
    });
  }

  async listData({
    page,
    itemsPerPage,
    filter,
  }: IListDataProps): Promise<IListResponse> {
    try {
      const { data, totalDocuments } = await this.transactionService.findAll({
        page,
        itemsPerPage,
        filter,
      });
      return {
        data,
        pagination: {
          currentPage: page,
          itemsPerPage: itemsPerPage,
          totalPages: Math.ceil(totalDocuments / itemsPerPage),
        },
      };
    } catch (error) {
      console.error('Failed to find data', error);
      return {
        data: [],
        pagination: {
          currentPage: page,
          itemsPerPage: itemsPerPage,
          totalPages: 0,
        },
      };
    }
  }
}
