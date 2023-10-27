import {Container, FormControl, FormLabel, Input, SimpleGrid, useColorModeValue } from '@chakra-ui/react'

export default function PeopleRegisterForm () {
  let textInputColor = useColorModeValue('gray.700', 'white');
  return (
    <>
      <Container>
        <SimpleGrid columns={2} spacing={10}>

          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input placeholder='Nome' color={textInputColor}/>
          </FormControl>

          <FormControl>
            <FormLabel>Sobrenome</FormLabel>
            <Input placeholder='Sobrenome' color={textInputColor}/>
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type='email' placeholder='usuario@gmail.com' color={textInputColor} />
          </FormControl>

          <FormControl>
            <FormLabel>Telefone</FormLabel>
            <Input placeholder='Telefone' color={textInputColor} />
          </FormControl>


          <FormControl>
            <FormLabel>CEP</FormLabel>
            <Input placeholder='CEP' color={textInputColor} />
          </FormControl>

          <FormControl>
            <FormLabel>Endereço</FormLabel>
            <Input placeholder='Endereço' color={textInputColor} />
          </FormControl>

          <FormControl>
            <FormLabel>CPF</FormLabel>
            <Input placeholder='CPF' color={textInputColor} />
          </FormControl>

          <FormControl>
            <FormLabel>RG</FormLabel>
            <Input placeholder='RG' color={textInputColor} />
          </FormControl>

        </SimpleGrid>

        <FormControl mt={6}>
          <FormLabel>Observações</FormLabel>
          <Input placeholder='Observações' color={textInputColor} />
        </FormControl>

      </Container>
    </>
  )
}

