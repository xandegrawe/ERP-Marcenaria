import { Button, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import CustomerRegisterForm from 'components/form/CustomerRegisterForm'
import ProviderRegisterForm from 'components/form/ProviderRegisterForm'
import { CustomerProvider } from 'contexts/Customers/CustomerContext'
import { ProviderProvider } from 'contexts/Providers/ProviderContext'
import React from 'react'
import { FaPlus } from 'react-icons/fa'

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
        <CustomerProvider> <CustomerRegisterForm onClose={onClose}/> </CustomerProvider>
      );
    } else if (route.includes('/providers')) {
      return (
        <ProviderProvider> <ProviderRegisterForm onClose={onClose}/> </ProviderProvider>
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

