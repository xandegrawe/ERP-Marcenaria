// Chakra imports
import { Box, SimpleGrid } from '@chakra-ui/react';
import CustomerTable from './components/CustomersTable';
import ProvidersTable from './components/ProvidersTable';
import { CustomerProvider } from 'contexts/Customers/CustomerContext';

type PeopleProps = {
  route: { path: string };
};
export default function People({ route }: PeopleProps) {
	// Chakra Color Mode
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<SimpleGrid mb='20px' columns={{ sm: 0, md: 0 }} spacing={{ base: '20px', xl: '20px' }}>
				{route.path === '/customers' && <CustomerTable />}
        {route.path === '/providers' && <ProvidersTable />}
			</SimpleGrid>
		</Box>
	);
}
