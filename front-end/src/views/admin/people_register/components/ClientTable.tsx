import { Td } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import PeopleTable from 'components/tables/PeopleTable';
import { PersonData } from 'types/personData';


export default function ClientTable() {
    const peopleData = [
      { name: "Cliente 01sadaisujbasyibausyfvsaufvasbtf", address: "Rua João Marciano Pereira", phone: "(47) 912345678", CPF: "123456789" },
      { name: "Cliente 02", address: "Rua Pedra da Lua", phone: "(47) 912345678", CPF: "123456789" },
      { name: "Cliente 03", address: "Rua W11", phone: "(47) 912345678", CPF: "123456789" },
      { name: "Cliente 04", address: "Rua quatro", phone: "(47) 912345678", CPF: "123456789" },
    ];
  
    const tableColumns = ["Nome", "Endereço", "Telefone", "CPF", "Ações"];
  
  // Mapeie o nome da coluna para a chave do objeto
  const columnKeyMapping: Record<string, keyof PersonData> = {
    "Nome": "name",
    "Endereço": "address",
    "Telefone": "phone",
    "CPF": "CPF",
  };
  
  return (
    <PeopleTable
      peopleData={peopleData} 
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
            <Td key={column} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px' }}>
              {person[objectKey]}
            </Td>
          );
        }
      }}
    />
  );
  }