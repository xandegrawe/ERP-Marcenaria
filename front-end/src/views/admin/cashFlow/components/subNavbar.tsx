import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue, Button, Flex, toast, useToast, Icon, SimpleGrid } from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import InvoiceAddRegister from "components/form/InvoiceAddRegister";
import IconBox from "components/icons/IconBox";

import { GlobalContext } from "contexts/GlobalContext";
import { useContext, useState } from "react";
import { FaMinus } from "react-icons/fa";
import { MdBarChart, MdAttachMoney, MdMoneyOff} from "react-icons/md";
import { deleteBankAccountApi } from "services/api";

interface Account {
  id: number;
  name: string;
}


const SubNavbar = () => {
  const { bankAccounts, deleteBankAccount, selectAccount } = useContext(GlobalContext);
  const toast = useToast();
  let panelBg = useColorModeValue('#E8F5E9', 'gray.700');
  let boxBg = useColorModeValue('white', 'gray.800');
  const brandColor = useColorModeValue('brand.500', 'white');
  
  const handleTabChange = (accountId: number) => {
    selectAccount(accountId);
  };

  const handleDeleteBankAccount = async (id: number) => {
    try {
      await deleteBankAccountApi(id);
      deleteBankAccount(id);
      toast({
        title: "Conta deletada com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erro ao deletar conta!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Tabs isLazy variant='enclosed-colored' marginTop={'2%'}>
      <TabList>
        {bankAccounts.map((account: Account) => (
          <Tab 
            key={account.id}
            onClick={() => handleTabChange(account.id)}
            _selected={{ color: 'white', bg: 'green.300' }}
            borderTopRadius={'4px'}
            border={'1px'}
            borderColor={'green.300'}
          >
            {account.name}
          </Tab>
        ))}
      </TabList>
      <TabPanels 
        bg={panelBg}
        borderBottomRadius={'8px'}
        borderTopEndRadius={'8px'}
        border={'1px'}
        borderColor={'green.300'}
      >
        {bankAccounts.map((account: Account) => (
          <TabPanel key={account.id}>
            <Box bg={boxBg} padding={'2px'} borderRadius={'8px'}>
              <InvoiceAddRegister accountId={account.id} />
            </Box>
            <SimpleGrid columns={5} gap='20px' mb='10px' mt={'2%'}>
              <MiniStatistics
                startContent={
                  <IconBox
                    w='56px'
                    h='56px'
                    bg={boxBg}
                    icon={<Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />}
                  />
                }
                name='Caixa Atual'
                value='$642.39'
              />
              <MiniStatistics
                startContent={
                  <IconBox
                    w='56px'
                    h='56px'
                    bg={boxBg}
                    icon={<Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />}
                  />
                }
                name='Entradas do mês'
                value='$350.4'
              />
            <MiniStatistics
                startContent={
                  <IconBox
                    w='56px'
                    h='56px'
                    bg={boxBg}
                    icon={<Icon w='32px' h='32px' as={MdMoneyOff} color={brandColor} />}
                  />
                }
                name='Saídas do mês'
                value='$350.4'
              />
            <Flex></Flex>
            <Flex justifyContent={"end"} mt={'20%'}>
              <Button
                onClick={() => handleDeleteBankAccount(account.id)}
                leftIcon={<FaMinus />}
                borderRadius={'4px'}
                colorScheme='red'
                variant='solid'
                size='sm'
                > Deletar conta
              </Button>
            </Flex>
            </SimpleGrid>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
export default SubNavbar;
