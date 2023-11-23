import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
} from '@chakra-ui/react';

import { PeopleTableProps } from '../../types/personData';

function PeopleTable({ peopleData, tableColumns, renderCustomColumn }: PeopleTableProps) {
  let tableBg = useColorModeValue('white', 'navy.800');

  return (
    <TableContainer borderRadius='15px' marginTop={"1%"}>
      <Table variant='simple' size='md' backgroundColor={tableBg} boxShadow='0px 0px 10px rgba(0, 0, 0, 0.25)'>
        <Thead>
          <Tr>
            { tableColumns.map((column, index) => (
              <Th key={index} fontSize={'md'} pl={10}>
                {column}
              </Th>
              ))
            }
          </Tr>
        </Thead>
        <Tbody>
          {peopleData.map((person) => (
            <Tr key={person.id}>
              {tableColumns.map((column, columnIndex) => (
                <Td key={columnIndex} textAlign="center">
                  {renderCustomColumn(person, column)}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default PeopleTable;
