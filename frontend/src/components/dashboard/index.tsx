"use client";

import ITransaction, { ITransactionResponse } from "@/types/transaction.types";
import {
  Button,
  Container,
  Divider,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import zeztraLogo from "../../../../images/zeztra-logo.svg";
import { Pagination } from "../pagination";
import { TableData } from "../tableData";
import { Upload } from "../upload";

export const DashboardPage = (): JSX.Element => {
  const [data, setData] = useState<ITransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState("");

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_PATH}/list?page=${currentPage}&itemsPerPage=${itemsPerPage}&filter=${filter}`,
      {
        method: "GET",
      }
    );
    const transactionData = (await response.json()) as ITransactionResponse;
    setData(transactionData.data);
    setCurrentPage(transactionData.pagination.currentPage);
    setItemsPerPage(transactionData.pagination.itemsPerPage);
    setTotalPages(transactionData.pagination.totalPages);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 1) {
      fetchData();
    } else {
      setCurrentPage(1);
    }
  }, [itemsPerPage]);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <Container maxW="container.xl">
      <VStack spacing="32px">
        <Container centerContent marginY="40px">
          <Image
            className="logo"
            src={zeztraLogo}
            alt="zeztra-logo"
            width={180}
            height={38}
            priority
          />
        </Container>
        <Container maxW="container.sm">
          <Upload />
        </Container>
        <Divider />
        <Container maxW="600px">
          <Pagination
            currentPage={currentPage}
            onChangePage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onChangeItemsPerPage={setItemsPerPage}
            totalPages={totalPages}
          />
        </Container>
        <Container>
          <InputGroup>
            <InputLeftAddon>Filtrar:</InputLeftAddon>
            <Input
              placeholder="digite o id desejado"
              value={filter}
              onChange={handleFilterChange}
            />
            <InputRightAddon>
              <Button onClick={fetchData}>Aplicar filtro</Button>
            </InputRightAddon>
          </InputGroup>
        </Container>
        <TableData data={data} />
        <Container maxW="600px">
          <Pagination
            currentPage={currentPage}
            onChangePage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onChangeItemsPerPage={setItemsPerPage}
            totalPages={totalPages}
          />
        </Container>
      </VStack>
    </Container>
  );
};
