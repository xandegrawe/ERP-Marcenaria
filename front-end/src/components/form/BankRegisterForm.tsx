
import { Button, FormControl, FormLabel, Input, ModalBody, ModalFooter, ModalHeader, SimpleGrid, Text, UseDisclosureReturn, useColorModeValue, useToast} from '@chakra-ui/react'
import { GlobalContext } from 'contexts/GlobalContext';
import { useContext} from 'react';
import { useForm } from 'react-hook-form';
import { createBankAccountApi } from 'services/api';
import { BankAccount } from 'types/bankData';
import {  handleInputChange } from './FormValidations';



export default function BankRegisterForm({ onClose }: { onClose: UseDisclosureReturn['onClose'] }) {
  let textInputColor = useColorModeValue('gray.700', 'white');
  const toast = useToast()
  const { register, setValue, handleSubmit} = useForm();
  const { addBankAccount } = useContext(GlobalContext);
  
  const onSubmit = async (data: Partial<BankAccount>) => {
    try {
      const response = await createBankAccountApi(data);
      addBankAccount(response.data);
      toast({
        title: "Caixa criado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao criar caixa!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <ModalHeader>
        <h3>Adicione uma nova conta</h3>
      </ModalHeader>
      
      <ModalBody pb={6}>
          <Text padding={"5px"}> É necessário criar uma conta para registrar transações financeiras. </Text>

          <form onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid columns={1} spacing={6}>
              <FormControl isRequired>
                <FormLabel>Nome</FormLabel>
                <Input placeholder='Nome' color={textInputColor} {...register('name')} onChange={(event) => handleInputChange(event, setValue)}/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Valor Inicial</FormLabel>
                <Input placeholder='00,00' color={textInputColor} {...register('inicial_balance')} onChange={(event) => handleInputChange(event, setValue)}/>
              </FormControl>
            </SimpleGrid>
            <ModalFooter>
              <Button type="submit" colorScheme='green' mr={3}>Salvar</Button>
              <Button onClick={onClose} variant='outline' colorScheme='red'>Cancelar</Button>
            </ModalFooter>
          </form>

      </ModalBody>
    </>
  )
}