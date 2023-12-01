import { SimpleGrid, FormControl, InputGroup, InputLeftAddon, Input, Select, useColorModeValue, Button, useToast, useDisclosure, ModalHeader, Container, ModalBody, ModalFooter, UseDisclosureReturn } from "@chakra-ui/react";
import { GlobalContext } from "contexts/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { updateBankInvoiceApi, getFullBankInvoiceDataApi, calculateSummarysApi } from "services/api";
import { BankInvoice } from "types/bankData";
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
  initialValues: Partial<BankInvoice>;
    onClose: UseDisclosureReturn['onClose']
}

const InvoiceEditForm = ({ initialValues, onClose }: InvoiceAddRegisterProps) => {
  const { register, setValue, handleSubmit} = useForm(); 
  const textInputColor = useColorModeValue('gray.700', 'white');
  const toast = useToast();
  const { updateInvoice, people, categories} = useContext(GlobalContext);
  const id = initialValues.id;
  
  useEffect(() => {
    const fetchBankInvoiceData = async () => {
      if (initialValues) {
        const invoiceData = await getFullBankInvoiceDataApi(Number(initialValues.id));
        setValue('note', invoiceData.data.note);
        setValue('status', invoiceData.data.status);
        setValue('amount', invoiceData.data.amount);
        setValue('category_name', invoiceData.data.category_name);
        setValue('person_name', invoiceData.data.person_name);
      }
    };
    fetchBankInvoiceData();
  }, [id, initialValues, setValue]);

  const onSubmit = async (data: Partial<BankInvoice> ) => {
    const bankInvoiceData = {
      ...data,
      id: id,
      bank_account_id: initialValues.bank_account_id,
    }
    try {
      const response = await updateBankInvoiceApi(bankInvoiceData);
      updateInvoice(response.data);
      toast({
        title: "Fatura atualizada com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao atualizar fatura!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    window.location.reload();
  };

  const dropdownColor = { 
    '& option': {
      color: textInputColor
    }
  }
  
  return (
    <>
    <ModalHeader>Edição de fatura</ModalHeader>
    <ModalBody pb={6}>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={2} spacing={10}> 
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
                  <Select {...register('category_id')} placeholder='Selecione a Categoria'>
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
          </SimpleGrid>
          
          <ModalFooter>
            <Button type="submit" colorScheme='green' mr={3}>Salvar</Button>
            <Button onClick={onClose} variant='outline' colorScheme='red'>Cancelar</Button>
          </ModalFooter>
        </form>
      </Container>
    </ModalBody>
  </>
  );
}

export default InvoiceEditForm;

function setAccountSummary(arg0: (prev: any) => any) {
  throw new Error("Function not implemented.");
}
