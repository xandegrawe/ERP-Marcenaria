import { Td } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import PeopleTable from 'components/tables/PeopleTable';
import { PersonData } from 'types/personData';
import { useEffect, useState } from 'react';
import { listProvidersApi } from 'services/api';

export default function ProvidersTable() {
  const [providerData, setProviderData] = useState<PersonData[]>([]);

  useEffect(() => {
    listProvidersApi().then(response => {
      setProviderData(response.data);
    })
  }, [])
  
  const tableColumns = ["Nome", "Telefone", "CNPJ", "Ações"];

// Mapeie o nome da coluna para a chave do objeto
const columnKeyMapping: Record<string, keyof PersonData> = {
  "Nome": "name",
  "Telefone": "phone",
  "CNPJ": "cnpj",
};

return (
  <PeopleTable
    peopleData={providerData} 
    tableColumns={tableColumns}
    renderCustomColumn={(person, column) => {
      if (column === "Ações") {
        return (
          <Td key="Ações" display="flex" textAlign="center">
            <FaEdit style={{ cursor: 'pointer', marginRight: '15px', color:'5D9102' }} />
            <FaTrash style={{ cursor: 'pointer', color: 'D40000' }} />
          </Td>
        );
      } else {
        const objectKey = columnKeyMapping[column];
        return (
          <Td key={column}>
            {person[objectKey]}
          </Td>
        );
      }
    }}
  />
);
}

;
