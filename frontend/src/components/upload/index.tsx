import { Input, Text } from "@chakra-ui/react";

export const Upload = () => {
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/upload`, {
          method: "POST",
          body: formData,
        });
      } catch (error) {
        console.error("Error enhancing file:", error);
      }
    }
  };
  return (
    <>
      <Text color="teal">Carregue aqui seu arquivo</Text>
      <Input
        placeholder="Selecionar arquivo"
        type="file"
        onChange={handleUpload}
      />
    </>
  );
};
