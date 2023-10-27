import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import PeopleRegisterForm from 'components/form/PeopleRegisterForm'
import React from 'react'
import { FaPlus } from 'react-icons/fa'

export default function AddRegisterModal () {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

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
          <ModalHeader>Adicione um novo Cliente</ModalHeader>
          <ModalBody pb={6}>
            <PeopleRegisterForm />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='green' mr={3}>
              Salvar
            </Button>
            <Button onClick={onClose} variant='outline' colorScheme='red'>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

