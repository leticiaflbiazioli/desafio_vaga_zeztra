import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dtos/transaction.dto';
import { Transaction } from './schemas/transaction.schema';

export interface IListDataProps {
  page: number;
  itemsPerPage: number;
  filter: string;
}

export interface IFindResponse {
  data: Transaction[];
  totalDocuments: number;
}

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<Transaction>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const createdTransaction =
      this.transactionModel.create(createTransactionDto);
    return createdTransaction;
  }

  async findAll({
    page,
    itemsPerPage,
    filter,
  }: IListDataProps): Promise<IFindResponse> {
    return {
      totalDocuments: await this.transactionModel.countDocuments().exec(),
      data: await this.transactionModel
        .find({
          id: { $regex: filter },
        })
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage)
        .populate('client')
        .sort('data')
        .exec(),
    };
  }

  async findByTransactionId(id: string): Promise<Transaction> {
    return this.transactionModel.findOne({ id }).exec();
  }
}
