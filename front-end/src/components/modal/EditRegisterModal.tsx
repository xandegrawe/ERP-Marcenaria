import { Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import CustomerEditRegisterForm from 'components/form/CustomerEditRegisterForm'
import ProviderRegisterForm from 'components/form/ProviderRegisterForm'
import React, { useState } from 'react'
import { FaEdit, FaPlus } from 'react-icons/fa'
import { PersonData } from 'types/personData'

type EditRegisterModalProps = {
  route: { path: string }
  personData: PersonData; 
}

export default function EditRegisterModal({ route, personData}: EditRegisterModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const getComponentByRoute = (route: string) => {
    if (route.includes('/customers')) {
      return (
        <CustomerEditRegisterForm onClose={onClose} initialValues={personData}/>
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
      <Button onClick={onOpen}>
        <FaEdit style={{ color:'5D9102' }} />
      </Button>

      <Modal
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

