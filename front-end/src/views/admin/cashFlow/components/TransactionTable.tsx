import { Flex, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react"
import TransactionRow from "./TransactionRow";
import { GlobalContext } from "contexts/GlobalContext";
import { useContext, useMemo } from "react";
import { BankInvoice } from "types/bankData";
import { selectIcon } from "components/form/FormValidations";

const TransactionsTable = () => {  
  const bgColor = useColorModeValue("white", "gray.700")
  const textColor = useColorModeValue('gray.700', 'white');
  const { invoices, selectedAccountId } = useContext(GlobalContext);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice: { bank_account_id: number; }) => 
      String(invoice.bank_account_id) === String(selectedAccountId)
    );
  }, [invoices, selectedAccountId]);

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const newInvoices = filteredInvoices.filter((invoice: { created_at: string | number | Date; }) => {
    const dataFatura = new Date(invoice.created_at);
    return dataFatura >= hoje;
  });
  
  const oldInvoices = filteredInvoices.filter((invoice: { created_at: string | number | Date; }) => {
    const dataFatura = new Date(invoice.created_at);
    return dataFatura < hoje;
  });

  const formatDate = (date: Date) => {
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day} de ${month} de ${year} as ${hours}:${minutes}`;
  };

  return (
    <SimpleGrid columns={1} spacing={{ base: '20px', xl: '20px' }}>
      <Flex 
      direction="column" 
      w="100%" 
      backgroundColor={bgColor} 
      borderRadius="8px"
      p={{ sm: "20px", md: "20px", lg: "20px" }}
      >
        <Flex
          direction={{ sm: "column", lg: "row" }}
          justifyContent={{ sm: "center", lg: "space-between" }}
          alignItems={{ sm: "center" }}
          w="100%"
          my={{ md: "12px" }}
        >
          <Text
            color={textColor}
            fontSize={{ sm: "lg", md: "xl", lg: "lg" }}
            fontWeight="bold"
          >
            Suas Transações
          </Text>
        </Flex>
        <Text
          color="gray.400"
          fontSize={{ sm: "sm", md: "md" }}
          fontWeight="semibold"
          my="12px"
        >
          Novas
        </Text>
        {newInvoices.map((row: Partial<BankInvoice>) => {
        return (
          <TransactionRow
            id = {row.id}
            name={row.note}
            logo={selectIcon(row.status)}
            date={formatDate(new Date(row.created_at))}
            price={row.amount}
            category={ row.category_name }
            person_name={ row.person_name }
            status={row.status}
          />
        );
      })}
        <Text
          color="gray.400"
          fontSize={{ sm: "sm", md: "md" }}
          fontWeight="semibold"
          my="12px"
        >
          Antigas
        </Text>
        {oldInvoices.map((row: Partial<BankInvoice>) => {
        return (
          <TransactionRow
            id = {row.id}
            name={row.note}
            logo={selectIcon(row.status)}
            date={formatDate(new Date(row.created_at))}
            price={row.amount}
            category={row.category_name}
            person_name={row.person_name}
            status={row.status}
          />
        );
      })}
      </Flex>
    </SimpleGrid>
  );
};

export default TransactionsTable;