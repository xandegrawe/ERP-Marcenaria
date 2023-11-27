// Chakra imports
import { Box, SimpleGrid } from '@chakra-ui/react';

export default function Categories () {
	// Chakra Color Mode
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<SimpleGrid mb='20px' columns={{ sm: 0, md: 0 }} spacing={{ base: '20px', xl: '20px' }}>
        <Box w='100%' h='100%' bg='red.500' />
			</SimpleGrid>
		</Box>
	);
}
