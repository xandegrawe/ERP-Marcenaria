import { Button, Modal, ModalContent, ModalFooter, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import CustomerRegisterForm from 'components/form/CustomerRegisterForm'
import ProviderRegisterForm from 'components/form/ProviderRegisterForm'
import React, { useState } from 'react'
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
        <CustomerRegisterForm onClose={onClose}/>
      );
    } else if (route.includes('/providers')) {
      return (
        <ProviderRegisterForm />
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

