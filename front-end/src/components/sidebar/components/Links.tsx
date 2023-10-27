import { NavLink, useLocation } from 'react-router-dom';
import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';

export function SidebarLinks(props: {
	routes: RoutesType[];
}) {
	let location = useLocation();
	let activeColor = useColorModeValue('gray.700', 'white');
	let inactiveColor = useColorModeValue('secondaryGray.600', 'secondaryGray.600');
	let activeIcon = useColorModeValue('brand.500', 'white');
	let textColor = useColorModeValue('secondaryGray.500', 'white');
	let brandColor = useColorModeValue('brand.500', 'brand.400');

	const { routes } = props;
  
	const [peopleDropdownOpen, setPeopleDropdownOpen] = useState(false);
  
	const togglePeopleDropdown = () => {
		setPeopleDropdownOpen(!peopleDropdownOpen);
	};

	const activeRoute = (routeName: string) => {
		return location.pathname.includes(routeName);
	};

	const createLinks = (routes: RoutesType[]) => {
		return routes.map((route, index) => {
			if (route.layout === '/admin' || route.layout === '/auth') {
				return (
					<NavLink key={index} to={route.layout + route.path}>
						{route.icon ? (
							<Box>
								<HStack
									spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
									py='5px'
									ps='10px'>
									<Flex w='100%' alignItems='center' justifyContent='center'>
										<Box
											color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
											me='18px'>
											{route.icon}
										</Box>
										<Text
											me='auto'
											color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
											fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
											{route.name}
										</Text>
									</Flex>
									<Box
										h='36px'
										w='4px'
										bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
										borderRadius='5px'
									/>
								</HStack>
							</Box>
						) : (
							<Box>
								<HStack
									spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
									py='5px'
									ps='10px'>
									<Text
										me='auto'
										color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
										fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
										{route.name}
									</Text>
									<Box h='36px' w='4px' bg='brand.400' borderRadius='5px' />
								</HStack>
							</Box>
						)}
					</NavLink>
				);
			} else if (route.name === 'Pessoas') {
				return (
					<Box key={index}>
						<HStack
							spacing='22px'
							py='5px'
							ps='10px'
							onClick={togglePeopleDropdown}>
							<Flex w='100%' alignItems='center' justifyContent='center'>
								<Text
									me='auto'
									color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
									fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
									{route.name}
								</Text>
							</Flex>
						</HStack>
						{peopleDropdownOpen && (
							<ul>
								{route.children.map((childRoute) => (
									<li key={childRoute.path}>
										<NavLink to={childRoute.layout + childRoute.path}>
											{childRoute.name}
										</NavLink>
									</li>
								))}
							</ul>
						)}
					</Box>
				);
			}
		});
	};

	return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
