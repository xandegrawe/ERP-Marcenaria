import { PhoneIcon } from '@chakra-ui/icons';
import {Button, Container, FormControl, FormLabel, Input, InputGroup, InputLeftElement, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, SimpleGrid, Textarea, UseDisclosureReturn, useColorModeValue, useToast } from '@chakra-ui/react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getFullCustomerPersonDataApi, updateCustomerApi } from 'services/api';
import { PersonData } from 'types/personData';
import { formatCep, formatCpf, formatPhone, formatRg, handleInputChange } from './FormValidations';
type FormProps = {
  initialValues: PersonData;
  onClose: UseDisclosureReturn['onClose'];
};
export default function CustomerEditRegisterForm({ initialValues, onClose }: FormProps) {
  const toast = useToast()
  const id = initialValues.id;
  const { register, setValue, setFocus, handleSubmit} = useForm();

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (id) {
        const customerData = await getFullCustomerPersonDataApi(Number(id));
        let customer = customerData.data.customer;
        let person = customerData.data.person;
        let customer_address = customerData.data.address;
        setValue('name', person.name);
        setValue('email', person.email);
        setValue('phone', formatPhone(person?.phone));
        setValue('last_name', customer?.last_name);
        setValue('cpf', formatCpf(customer?.cpf));
        setValue('rg', formatRg(customer?.rg));
        setValue('cep', formatCep(customer_address?.cep))
        setValue('state', customer_address?.state);
        setValue('city', customer_address?.city);
        setValue('neighborhood', customer_address?.neighborhood);
        setValue('street', customer_address?.street);
        setValue('number', customer_address?.number);
        setValue('observation', customer_address?.observation);
      }
    };

    fetchCustomerData();
  }, [id, setValue]);
  
  let textInputColor = useColorModeValue('gray.700', 'white');

  const checkCEP = (e: { target: { value: string; }; }) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (!e.target.value) return;
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then((res) => res.json()).then((data) => {
      setValue('state', data.uf);
      setValue('city', data.localidade);
      setValue('neighborhood', data.bairro);
      setValue('street', data.logradouro);
      setFocus('number');
    }).catch((err) => console.log(err));
  }

  const onSubmit = async (data: Partial<PersonData>) => {
    try {
      await updateCustomerApi(id, data);
      toast({
        title: "Cliente atualizado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao atualizar cliente!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <ModalHeader>Adicione um novo Cliente</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
      <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid columns={2} spacing={10}>
              <FormControl isRequired>
                <FormLabel>Nome</FormLabel>
                <Input placeholder='Nome' color={textInputColor} {...register('name')} onChange={(event) => handleInputChange(event, setValue)}/>
              </FormControl>
            
              <FormControl>
                <FormLabel>Sobrenome</FormLabel>
                <Input placeholder='Sobrenome' color={textInputColor} {...register('last_name')} onChange={(event) => handleInputChange(event, setValue)}/>
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type='email' placeholder='usuario@gmail.com' color={textInputColor} {...register('email')} onChange={(event) => handleInputChange(event, setValue)} />
              </FormControl>

              <FormControl>
                <FormLabel>Telefone</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <PhoneIcon color='gray.300' />
                  </InputLeftElement>
                  <Input type='tel' {...register('phone')} onChange={(event) => handleInputChange(event, setValue)} maxLength={14}/>
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>CPF</FormLabel>
                <Input placeholder='CPF' color={textInputColor} {...register('cpf')} onChange={(event) => handleInputChange(event, setValue)} maxLength={14}/>
              </FormControl>

              <FormControl>
                <FormLabel>RG</FormLabel>
                <Input placeholder='RG' color={textInputColor} {...register('rg')} maxLength={9} onChange={(event) => handleInputChange(event, setValue)}/>
              </FormControl>

              <FormControl>
                <FormLabel>CEP</FormLabel>
                <Input placeholder='CEP' type="text" color={textInputColor} {...register('cep')} onBlur={checkCEP} maxLength={9} onChange={(event) => handleInputChange(event, setValue)}/>
              </FormControl>

              <FormControl display={'block'}>
                <FormLabel>Endereço</FormLabel>
                <Input  placeholder='Estado' color={textInputColor} {...register('state')} />
                <Input marginTop={'10px'} placeholder='Cidade' color={textInputColor} {...register('city')}/>
                <Input marginTop={'10px'} placeholder='Bairro' color={textInputColor} {...register('neighborhood')}/>
                <Input marginTop={'10px'} placeholder='Rua' color={textInputColor} {...register('street')}/>
                <Input marginTop={'10px'} placeholder='Número' color={textInputColor}  {...register('number')}/>
              </FormControl>

            </SimpleGrid>

            <FormControl mt={6}>
              <FormLabel>Observações</FormLabel>
              <Textarea placeholder='Deixe uma observação' {...register('observation')} />
            </FormControl>
            <ModalFooter>
              <Button type="submit" colorScheme='green' mr={3}>Salvar</Button>
              <Button onClick={onClose} variant='outline' colorScheme='red'>Cancelar</Button>
            </ModalFooter>
          </form>
        </Container>
      </ModalBody>
    </>
  )
}