import { Text, Button, FormControl, FormLabel, Input, ModalBody, ModalFooter, ModalHeader, SimpleGrid, useColorModeValue, useToast } from '@chakra-ui/react'
import { GlobalContext } from 'contexts/GlobalContext'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { createCategoryApi } from 'services/api'
import { Category } from 'types/bankData'
import { handleInputChange } from './FormValidations';
interface AddCategoriesModalProps {
  onClose: () => void; 
}
export default function AddCategoriesModal({ onClose }: AddCategoriesModalProps) {
  const textInputColor = useColorModeValue('gray.700', 'white');
  const { addCategory } = useContext(GlobalContext)
  const { register, setValue, handleSubmit} = useForm();
  const toast = useToast();

  const onSubmit = async (data: Partial<Category>) => {
    try {
      const response = await createCategoryApi(data);
      addCategory(response.data);
      toast({
        title: "Categoria criada com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Erro ao criar categoria!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <ModalHeader>
        <h3>Adicione uma nova categoria</h3>
      </ModalHeader>
      
      <ModalBody pb={6}>
          <Text padding={"5px"}> Crie categorias para poder classificar seus produtos e faturas.
          </Text>

          <form onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid columns={1} spacing={6}>
              <FormControl isRequired>
                <FormLabel>Nome</FormLabel>
                <Input placeholder='Nome' color={textInputColor} {...register('name')} onChange={(event) => handleInputChange(event, setValue)}/>
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
