import { SimpleGrid, FormControl, InputGroup, InputLeftAddon, Input, Select, useColorModeValue, Button, useToast, useDisclosure } from "@chakra-ui/react";
import { GlobalContext } from "contexts/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { createBankInvoice } from "services/api";
import { BankInvoice } from "types/bankData";
import AddCategoryModal from "./CategoriesRegisterForm";
import { handleInputChange } from "./FormValidations";

interface Category {
  id: number;
  name: string;
}

interface Person {
  id: number;
  name: string;
}

interface InvoiceAddRegisterProps {
  accountId: number;
}

const InvoiceAddRegister = ( {accountId} : InvoiceAddRegisterProps) => {
  const { register, setValue, handleSubmit} = useForm(); 
  const textInputColor = useColorModeValue('gray.700', 'white');
  const toast = useToast();
  const { addInvoice, people, categories} = useContext(GlobalContext);
  
  const onSubmit = async (data: Partial<BankInvoice> ) => {
    try {
      const completeData = { ...data, bank_account_id: accountId };
      const response = await createBankInvoice(completeData);
      addInvoice(response.data);
      toast({
        title: "Fatura criada com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao criar fatura!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const dropdownColor = { 
    '& option': {
      color: textInputColor
    }
  }
  
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columns={6} spacing={0}> 
        <FormControl isRequired>
          <InputGroup>
            <InputLeftAddon children='Descrição'/>
            <Input 
              type='text'
              placeholder='Descrição'
              color={textInputColor}
              {...register('note')}
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <InputGroup>
            <InputLeftAddon children='Status' />
            <Select sx={dropdownColor} {...register('status')}>
              <option value='Entrada'>Entrada</option>
              <option value='Saída'>Saída</option>
              <option value='Pendente'>Pendente</option>
            </Select>
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <InputGroup >
            <InputLeftAddon children='Valor'/>
            <Input placeholder='R$ 10,00' color={textInputColor} {...register('amount')} onChange={(event) => handleInputChange(event, setValue)} />
          </InputGroup>
        </FormControl>

        <FormControl>
          <InputGroup>
              <InputLeftAddon children='Categoria'/>
              <Select {...register('category_id')} placeholder='Selecione a Categoria' sx={dropdownColor}>
                {categories.map((category: Category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </Select>
            </InputGroup>
        </FormControl>

        <FormControl>
          <InputGroup>
            <InputLeftAddon children='Pessoa'/>
            <Select {...register('person_id')} placeholder='Selecione a Pessoa' sx={dropdownColor}>
              {people.map((person: Person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </Select>
          </InputGroup>
        </FormControl>
        
        <Button 
          leftIcon={<FaPlus />}
          marginLeft={'29%'}
          width={'70%'}
          borderRadius={'6px'} 
          colorScheme={'green'}
          type="submit">
          Adicionar
        </Button>
                  
      </SimpleGrid>
    </form>
  </>
  );
}

export default InvoiceAddRegister;