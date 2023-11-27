import { Button, Td, useDisclosure, useToast } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import PeopleTable from 'components/tables/PeopleTable';
import { PersonData } from 'types/personData';
import { useContext} from 'react';
import { deleteProviderApi } from 'services/api';
import EditRegisterModal from 'components/modal/EditRegisterModal';
import { GlobalContext } from 'contexts/GlobalContext';

export default function ProviderTable() {
  const toast = useToast();
  const { onClose } = useDisclosure();
  const tableColumns = ["Id", "Nome", "Telefone", "CNPJ", "Ações"];

  const { providers, deleteProvider } = useContext(GlobalContext);

  const columnKeyMapping: Record<string, keyof PersonData> = {
    "Id": "id",
    "Nome": "name",
    "Telefone": "phone",
    "CNPJ": "cnpj",
  };

  const handleDeleteProvider = async (id: number) => {
    try {
      await deleteProviderApi(id);
      deleteProvider(id);
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
  };
  
  return (
    <PeopleTable
      peopleData={providers}
      tableColumns={tableColumns}
      renderCustomColumn={(person, column) => {
        if (column === "Ações") {
          return (
            <Td key="Ações" display="flex" textAlign="center" pl={'-0.5'}>
              <EditRegisterModal route={{ path: '/providers' }} personData={person} invoiceData={undefined} />
              <Button onClick={() => handleDeleteProvider(person.id)}>
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
