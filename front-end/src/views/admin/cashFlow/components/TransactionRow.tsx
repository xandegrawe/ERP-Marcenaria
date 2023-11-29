import React, { useContext } from "react";
import { Box, Button, Flex, Icon, SimpleGrid, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import EditRegisterModal from "components/modal/EditRegisterModal";
import { FaTrash } from "react-icons/fa";
import { GlobalContext } from "contexts/GlobalContext";
import { deleteBankInvoiceApi } from "services/api";
import { formatPrice, formatPriceColor, selectIcon } from "components/form/FormValidations";
interface TransactionRowProps {
  id: number | undefined;
  name: string;
  logo: React.ElementType;
  date: string;
  price: string;

  category: string;
  person_name: string;

  status?: string;
}

const TransactionRow: React.FC<TransactionRowProps> = ({id, name, logo, date, price, category, person_name, status}) => {
  console.log("TransactionRow props:", { id, name, logo, date, price, category, person_name });
  const textColor = useColorModeValue('gray.700', 'white');
  const categoryColor = useColorModeValue('purple', 'purple.400');
  const titleColor = useColorModeValue('gray.700', 'orange.400');
  const personColor = useColorModeValue('blue.400', 'blue.400');
  const { invoices, deleteInvoice} = useContext(GlobalContext);
  const toast = useToast();
  let icon = selectIcon(status);
  let formattedPrice = formatPrice(price, status);
  let color = formatPriceColor(formattedPrice);

  const selected_invoice = invoices.find((invoice: { id: number; }) => invoice.id === id)

  const handleDeleteInvoice = async (id: number) => {
    try {
      await deleteBankInvoiceApi(id);
      deleteInvoice(id);
      toast({
        title: "Cliente deletado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erro ao deletar cliente!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <SimpleGrid columns={5} spacing={10} mt={"10px"}>
      <Flex alignItems='center' >
        <Box
          me='14px'
          borderRadius='50%'
          color={color}
          border='1px solid'
          display='flex'
          alignItems='center'
          justifyContent='center'
          w='35px'
          h='35px'
        >
          <Icon as={icon} w='12px' h='12px' />
        </Box>
          <Flex direction='column'>
            <Text fontSize='sm' color={titleColor} mb='5px'>
              {name}
            </Text>
            <Text fontSize={{ sm: "xs", md: "sm" }} color='gray.400'>
              {date}
            </Text>
          </Flex>
      </Flex>
        <Flex direction='column'>
          <Text fontSize={{ sm: "xs", md: "sm" }} color={categoryColor}>
            Categoria
          </Text>
          <Text
            fontSize={{ sm: "xs", md: "sm" }}
            color={textColor}
            >
            {category}
          </Text>
        </Flex>
        <Flex direction='column'>
            <Text fontSize={{ sm: "xs", md: "sm" }} color={personColor}>
              Pessoa
            </Text>
            <Text
              fontSize={{ sm: "xs", md: "sm" }}
              color={textColor}
              >
              {person_name}
            </Text>
          </Flex>
        <Flex direction='column'>
          <Text 
            fontSize={{ sm: "xs", md: "md" }}
            color={color}>
            {formattedPrice}
          </Text>
        </Flex >
        <Flex display="flex" textAlign="center" pl={'-0.5'}>
          <EditRegisterModal route={{ path: '/financial' }} personData={undefined}
        invoiceData={ selected_invoice }
        />
          <Button>
            <FaTrash onClick={() => handleDeleteInvoice(selected_invoice.id)} style={{ color: 'D40000' }} />
          </Button>
        </Flex>
    </SimpleGrid>
  );
}
export default TransactionRow;