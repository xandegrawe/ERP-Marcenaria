import React from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
interface TransactionRowProps {
  name: string;
  logo: React.ElementType;
  date: string;
  price: string;

  category: string;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ name, logo, date, price, category }) => {
  return (
    <Flex mb='16px' justifyContent='space-between'>
      <Flex alignItems='center'>
        <Box
          me='14px'
          borderRadius='50%'
          color={
            price[0] === "+"
              ? "green.500"
              : price[0] === "-"
              ? "red.500"
              : "yellow.400"
          }
          border='1px solid'
          display='flex'
          alignItems='center'
          justifyContent='center'
          w='35px'
          h='35px'
        >
          <Icon as={logo} w='12px' h='12px' />
        </Box>
        <Flex direction='column'>
          <Text fontSize='sm' color='black' mb='5px'>
            {name}
          </Text>
          <Text fontSize={{ sm: "xs", md: "sm" }} color='gray.400'>
            {date}
          </Text>
        </Flex>
      </Flex>
      <Text
        fontSize={{ sm: "xs", md: "md" }}
        color="white"
        backgroundColor='blue'
        borderRadius='30px'
        width={'200px'}
        textAlign='center'
        display={'inline-grid'}
        alignItems='center' // Adicione esta linha
        >
        {category}
      </Text>
      <Text 
        fontSize={{ sm: "xs", md: "md" }}
        color={ price[0] === "+"
          ? "green.500"
          : price[0] === "-"
          ? "red.500"
          : "black"
        }>
        {price}
      </Text>
    </Flex>
  );
}
export default TransactionRow;