import { Button, Container, HStack, Select } from "@chakra-ui/react";

interface IProps {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
  onChangeItemsPerPage: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  itemsPerPage,
  totalPages,
  onChangePage,
  onChangeItemsPerPage,
}: IProps) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1);
    }
  };
  return (
    <HStack marginBottom="20px">
      <Container>
        <HStack>
          <Button
            colorScheme="teal"
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
          >
            {"<"}
          </Button>
          <div>
            {currentPage} de {totalPages}
          </div>
          <Button
            colorScheme="teal"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            {">"}
          </Button>
        </HStack>
      </Container>
      <Container>
        <Select
          onChange={(event) => {
            onChangeItemsPerPage(Number(event.target.value));
          }}
        >
          <option value={10} selected={itemsPerPage === 10}>
            10
          </option>
          <option value={25} selected={itemsPerPage === 25}>
            25
          </option>
          <option value={50} selected={itemsPerPage === 50}>
            50
          </option>
          <option value={100} selected={itemsPerPage === 100}>
            100
          </option>
        </Select>
      </Container>
    </HStack>
  );
};
