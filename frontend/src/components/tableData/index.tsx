import ITransaction from "@/types/transaction.types";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface IProps {
  data: ITransaction[];
}

export const TableData = ({ data }: IProps): JSX.Element => {
  return (
    <TableContainer>
      <Table variant="striped">
        <Thead bgColor="teal">
          <Tr>
            <Th color="white">ID</Th>
            <Th color="white">Data</Th>
            <Th isNumeric color="white">
              Valor
            </Th>
            <Th color="white">Nome</Th>
            <Th color="white">Cpf / Cnpj</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{new Date(item.data).toLocaleDateString("pt-BR")}</Td>
              <Td isNumeric>
                {item.valor.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  currency: "BRL",
                  style: "currency",
                })}
              </Td>
              <Td>{item.client.nome}</Td>
              <Td>{item.client.cpfCnpj}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
