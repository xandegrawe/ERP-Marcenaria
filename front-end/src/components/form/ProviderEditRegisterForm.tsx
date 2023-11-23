import { PhoneIcon } from '@chakra-ui/icons';
import {Button, Container, FormControl, FormLabel, Input, InputGroup, InputLeftElement, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, SimpleGrid, Textarea, UseDisclosureReturn, useColorModeValue, useToast } from '@chakra-ui/react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getFullProviderPersonDataApi,  updateProviderApi } from 'services/api';
import { PersonData } from 'types/personData';
type FormProps = {
  initialValues: PersonData;
  onClose: UseDisclosureReturn['onClose'];
};
export default function ProviderEditRegisterForm({ initialValues, onClose }: FormProps) {
  const toast = useToast()
  const id = initialValues.id;
  const { register, setValue, setFocus, handleSubmit} = useForm();

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (id) {
        const providerData = await getFullProviderPersonDataApi(Number(id));
        let provider = providerData.data.provider;
        let person = providerData.data.person;
        let provider_address = providerData.data.address;
        setValue('name', person.name);
        setValue('email', person.email);
        setValue('phone', person.phone);
        setValue('cpf', provider.cpf);
        setValue('cep', provider_address.cep);
        setValue('state', provider_address.state);
        setValue('city', provider_address.city);
        setValue('neighborhood', provider_address.neighborhood);
        setValue('street', provider_address.street);
        setValue('number', provider_address.number);
        setValue('observation', provider_address.observation);
      }
    };

    fetchCustomerData();
  }, [id]);
  
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
    console.log(data);
    try {
      await updateProviderApi(id, data);
      toast({
        title: "Fornecedor atualizado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao atualizar fornecedor!",
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

              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input defaultValue={initialValues.name} color={textInputColor} {...register('name')}/>
              </FormControl>

              <FormControl>
                <FormLabel>Sobrenome</FormLabel>
                <Input defaultValue={initialValues.last_name} color={textInputColor} {...register('last_name')}/>
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type='email' defaultValue={initialValues.email} color={textInputColor} {...register('email')} />
              </FormControl>

              <FormControl>
                <FormLabel>Telefone</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <PhoneIcon color='gray.300' />
                  </InputLeftElement>
                  <Input type='tel' defaultValue={initialValues.phone} {...register('phone')}/>
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>CPF</FormLabel>
                <Input  defaultValue={initialValues.cpf} color={textInputColor} {...register('cpf')}/>
              </FormControl>

              <FormControl>
                <FormLabel>RG</FormLabel>
                <Input defaultValue={initialValues.rg} color={textInputColor} {...register('rg')}/>
              </FormControl>

              <FormControl>
                <FormLabel>CEP</FormLabel>
                <Input defaultValue={initialValues.cep} type="text" color={textInputColor} {...register('cep')} onBlur={checkCEP}/>
              </FormControl>

              <FormControl display={'block'}>
                <FormLabel>Endereço</FormLabel>
                <Input  defaultValue={initialValues.state} color={textInputColor} {...register('state')} />
                <Input marginTop={'10px'} defaultValue={initialValues.city} color={textInputColor} {...register('city')}/>
                <Input marginTop={'10px'} defaultValue={initialValues.neighborhood} color={textInputColor} {...register('neighborhood')}/>
                <Input marginTop={'10px'} defaultValue={initialValues.street} color={textInputColor} {...register('street')}/>
                <Input marginTop={'10px'} defaultValue={initialValues.number} color={textInputColor}  {...register('number')}/>
              </FormControl>

            </SimpleGrid>

            <FormControl mt={6}>
              <FormLabel>Observações</FormLabel>
              <Textarea defaultValue={initialValues.observation} {...register('observation')} />
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