import { Button, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import CustomerEditRegisterForm from 'components/form/CustomerEditRegisterForm'
import InvoiceEditForm from 'components/form/InvoiceEditForm'
import ProviderEditRegisterForm from 'components/form/ProviderEditRegisterForm'
import { FaEdit} from 'react-icons/fa'
import { BankInvoice } from 'types/bankData'
import { PersonData } from 'types/personData'

type EditRegisterModalProps = {
  route: { path: string }
  personData: PersonData | undefined
  invoiceData: BankInvoice | undefined
}

export default function EditRegisterModal({ route, personData, invoiceData}: EditRegisterModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const getComponentByRoute = (route: string) => {
    if (route.includes('/customers')) {
      return (
        <CustomerEditRegisterForm onClose={onClose} initialValues={personData}/>
      );
    } else if (route.includes('/providers')) {
      return (
        <ProviderEditRegisterForm  onClose={onClose} initialValues={personData}/>
      );
    } else if (route.includes('/financial')) {
      return (
        <InvoiceEditForm initialValues={invoiceData} onClose={onClose} />
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

