export interface ITransactionResponse {
  data: ITransaction[];
  pagination: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  };
}

export default interface ITransaction {
  id: string;
  data: string;
  valor: number;
  client: {
    nome: string;
    cpfCnpj: string;
  };
}
