import { Icon } from '@chakra-ui/react';
import { MdOutlineAttachMoney, MdSupervisorAccount } from 'react-icons/md';
import { IoMdPricetags } from "react-icons/io";
import CashFlow from 'views/admin/cashFlow';
import { FaBoxes } from 'react-icons/fa';
import People from 'views/admin/people_register';
import Categories from 'views/admin/Categories';


const routes = [
	{
		name: 'Financeiro',
		layout: '/admin',
		path: '/financial',
		icon: <Icon as={MdOutlineAttachMoney} width='20px' height='20px' color='inherit' />,
		component: CashFlow,
		secondary: true
	},
	{	
		name: 'Clientes',
		layout: '/admin',
		icon: <Icon as={MdSupervisorAccount} width='20px' height='20px' color='inherit' />,
		path: '/customers',
		component: () => <People route={{ path: '/customers' }} />
	},
	{	
		name: 'Fornecedores',
		layout: '/admin',
		icon: <Icon as={FaBoxes} width='20px' height='20px' color='inherit' />,
		path: '/providers',
		component: () => <People route={{ path: '/providers' }} />
	},
	{
		name: 'Categoria',
		layout: '/admin',
		path: '/categories',
		icon: <Icon as={IoMdPricetags} width='20px' height='20px' color='inherit' />,
		component: Categories
	},
];

export default routes;
