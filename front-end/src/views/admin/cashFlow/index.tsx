import { Box, SimpleGrid } from '@chakra-ui/react';
import Form from './components/form';
import SubNavbar from './components/subNavbar';

export default function CashFlow() {
	return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid mb='20px' columns={{ sm: 0, md: 0 }} spacing={{ base: '20px', xl: '20px' }}>
        <SubNavbar/>
        <Form />
      </SimpleGrid>
    </Box>
  );
}
