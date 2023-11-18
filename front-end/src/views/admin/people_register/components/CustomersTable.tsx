import { Button, Td, useDisclosure, useToast } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

import PeopleTable from 'components/tables/PeopleTable';
import { PersonData } from 'types/personData';
import { useState, useEffect } from 'react';
import { deleteCustomerApi, listCustomersApi } from 'services/api';
import EditRegisterModal from 'components/modal/EditRegisterModal';


export default function CustomerTable() {
  const toast = useToast()
  const { onClose } = useDisclosure()
  const tableColumns = ["Id", "Nome", "Sobrenome", "Telefone", "Ações"];

  const [customerData, setCustomerData] = useState<PersonData[]>([]);

  useEffect(() => {
    listCustomersApi().then(response => {
      setCustomerData(response.data);
    })
  }, [])

  const columnKeyMapping: Record<string, keyof PersonData> = {
    "Id": "id",
    "Nome": "name",
    "Sobrenome": "last_name",
    "Telefone": "phone",
  };

  const deleteCustomer = async (id: number) => {
    try {
      await deleteCustomerApi(id);
      toast({
        title: "Cliente deletado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (err) {
      toast({
        title: "Erro ao deletar cliente!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }
  
  return (
    <PeopleTable
      peopleData={customerData}
      tableColumns={tableColumns}
      renderCustomColumn={(person, column) => {
        if (column === "Ações") {
          return (
            <Td key="Ações" display="flex" textAlign="center" pl={'-0.5'}>
              {EditRegisterModal({ route: { path: '/customers' }, personData: person })}
              <Button onClick={() => deleteCustomer(person.id)}>
                <FaTrash style={{ color: 'D40000' }} />
              </Button>
            </Td>
          );
        } else {
          const objectKey = columnKeyMapping[column];
          return (
            <Td key={column} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px'}}>
              {person[objectKey]}
            </Td>
          );
        }
      }}
    />
  );
  }