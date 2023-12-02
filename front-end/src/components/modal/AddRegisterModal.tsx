import { Button, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import BankRegisterForm from 'components/form/BankRegisterForm'
import CustomerRegisterForm from 'components/form/CustomerRegisterForm'
import ProviderRegisterForm from 'components/form/ProviderRegisterForm'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import AddCategoriesrModal from '../form/CategoriesRegisterForm'

type AddRegisterModalProps = {
  route: { path: string }
}

export default function AddRegisterModal({ route }: AddRegisterModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  
  const getComponentByRoute = (route: string) => {
    if (route.includes('/customers')) {
      return (
        <CustomerRegisterForm onClose={onClose}/>
      );
    } else if (route.includes('/providers')) {
      return (
        <ProviderRegisterForm onClose={onClose}/>
      );
    } else if (route.includes('financial')){
      return (
        <BankRegisterForm onClose={onClose}/>
      );
    } else if (route.includes('categories')) {
      return (
        <AddCategoriesrModal onClose={onClose}/>
      );
    }
    return null;
  };

  return (
    <>
      <Button onClick={onOpen} 
        leftIcon={<FaPlus />}
        marginLeft={'30px'} 
        marginBottom={'15px'} 
        borderRadius={'12px'} 
        colorScheme={'green'}>
        Adicionar
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          {getComponentByRoute(route.path)}
        </ModalContent>
      </Modal>
    </>
  )
}

