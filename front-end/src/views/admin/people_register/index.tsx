// Chakra imports
import { Box, SimpleGrid } from '@chakra-ui/react';
import ClientTable from './components/ClientTable';
import SuppliersTable from './components/SuppliersTable';

type PeopleProps = {
  route: { path: string };
};
export default function People({ route }: PeopleProps) {
	// Chakra Color Mode
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<SimpleGrid mb='20px' columns={{ sm: 0, md: 0 }} spacing={{ base: '20px', xl: '20px' }}>
				{route.path === '/customers' && <ClientTable />}
        {route.path === '/suppliers' && <SuppliersTable />}
			</SimpleGrid>
		</Box>
	);
}
