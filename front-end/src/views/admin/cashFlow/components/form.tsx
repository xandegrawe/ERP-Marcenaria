import { Flex, Icon, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import { FaArrowDown, FaArrowUp, FaRegCalendarAlt } from "react-icons/fa";
import { newestTransactions, olderTransactions } from "./general";
import { AiOutlineExclamation } from "react-icons/ai";
import TransactionRow from "./TransactionRow";
// You should also import some data for the table

// This is how the data imported above should look like

const Form = () => {  
  const textColor = useColorModeValue("gray.700", "white")
  
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 1 }} spacing={{ base: '20px', xl: '20px' }}>
      <Flex 
      direction="column" 
      w="100%" 
      backgroundColor={"white"} 
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
          <Flex alignItems="center">
            <Icon
              as={FaRegCalendarAlt}
              color="gray.400"
              fontSize="md"
              me="6px"
            ></Icon>
            <Text color="gray.400" fontSize="sm" fontWeight="semibold">
              23 - 30 Novembro 2023
            </Text>
          </Flex>
        </Flex>
        <Text
          color="gray.400"
          fontSize={{ sm: "sm", md: "md" }}
          fontWeight="semibold"
          my="12px"
        >
          Novas
        </Text>
        {newestTransactions.map((row) => {
          return (
            <TransactionRow
              name={row.name}
              logo={row.logo}
              date={row.date}
              price={row.price}
              category={row.category}
            />
          )
        })}
        <Text
          color="gray.400"
          fontSize={{ sm: "sm", md: "md" }}
          fontWeight="semibold"
          my="12px"
        >
          Antigas
        </Text>
        {olderTransactions.map((row) => {
          return (
            <TransactionRow
              name={row.name}
              logo={row.logo}
              date={row.date}
              price={row.price}
              category={row.category}
            />
          )
        })}
      </Flex>
    </SimpleGrid>
  );
};

export default Form;