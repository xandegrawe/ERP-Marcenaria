// Chakra imports
import { Flex, Image} from '@chakra-ui/react';

// Custom components
import LegratechLogo from 'assets/img/logo/logoLegratech.png';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	return (
		<Flex alignItems='center' flexDirection='column'>
			<Image src={LegratechLogo} width='179' height='20'/>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
