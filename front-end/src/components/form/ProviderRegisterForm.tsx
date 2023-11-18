import { PhoneIcon } from '@chakra-ui/icons';
import { Container, FormControl, FormLabel, Input, InputGroup, InputLeftElement, ModalBody, ModalHeader, SimpleGrid, Textarea, useColorModeValue, useDisclosure} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { createProviderApi } from 'services/api';
import { PersonData } from 'types/personData';
type ProviderRegisterFormProps = {
  setData: (data: PersonData) => void;
};

export default function ProviderRegisterForm() {
  const { onClose } = useDisclosure()
  let textInputColor = useColorModeValue('gray.700', 'white');

  const checkCEP = (e: { target: { value: string; }; }) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (!e.target.value) return;
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then((res) => res.json()).then((data) => {
      setValue('state', data.uf);
      setValue('city', data.localidade);
      setValue('neighborhood', data.bairro);
      setValue('street', data.logradouro);
      setFocus('addressNumber');
    }).catch((err) => console.log(err));
  }

  const { register, setValue, setFocus, handleSubmit} = useForm();

  // const onSubmit = async (data: PersonData) => {
  //   try {
  //     const personData = {
  //       id: data.id,
  //       name: data.name,
  //       email: data.email,
  //       phone: data.phone,
  //     };

  //     const providerData = {
  //       cnpj: data.cnpj,
  //     };

  //     const addressData = {
  //       city: data.city,
  //       state: data.state,
  //       neighborhood: data.neighborhood,
  //       street: data.street,
  //       number: data.number,
  //       observation: data.observation,
  //       cep: data.cep,
  //     };
  //     await createProviderApi(personData, providerData, addressData);
  //     onClose();
  //     setData(data);
  //   } catch (error) {
  //     console.error('Erro ao criar o cliente:', error);
  //   }
  // };

  return (
    <>
      <ModalHeader>Adicione um novo Fornecedor</ModalHeader>
      <ModalBody pb={6}>
        <Container>
          <form>
            <SimpleGrid columns={2} spacing={10}>
            <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input placeholder='Nome' color={textInputColor} {...register('person.name')}/>
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type='email' placeholder='usuario@gmail.com' color={textInputColor} {...register('person.email')} />
              </FormControl>

              <FormControl>
                <FormLabel>Telefone</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <PhoneIcon color='gray.300' />
                  </InputLeftElement>
                  <Input type='tel' />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>CNPJ</FormLabel>
                <Input placeholder='CNPJ' color={textInputColor}  {...register('provider.cnpj')}/>
              </FormControl>

              <FormControl>
                <FormLabel>CEP</FormLabel>
                <Input placeholder='CEP' type="text" color={textInputColor} onBlur={checkCEP}/>
              </FormControl>

              <FormControl display={'block'}>
                <FormLabel>Endereço</FormLabel>
                <Input  placeholder='Estado' color={textInputColor} {...register('state')} />
                <Input marginTop={'10px'} placeholder='Cidade' color={textInputColor} {...register('city')}/>
                <Input marginTop={'10px'} placeholder='Bairro' color={textInputColor} {...register('neighborhood')}/>
                <Input marginTop={'10px'} placeholder='Rua' color={textInputColor} {...register('street')}/>
                <Input marginTop={'10px'} placeholder='Número' color={textInputColor}  {...register('addressNumber')}/>
              </FormControl>
            </SimpleGrid>

            <FormControl mt={6}>
              <FormLabel>Observações</FormLabel>
              <Textarea placeholder='Deixe uma observação' {...register('observation')} />
            </FormControl>
          </form>
        </Container>
      </ModalBody>
    </>
  )
}

