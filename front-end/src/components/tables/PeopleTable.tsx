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
    <TableContainer borderRadius='15px'>
      <Table variant='simple' size='md' backgroundColor={tableBg} boxShadow='0px 0px 10px rgba(0, 0, 0, 0.25)'>
        <Thead marginTop={'15px'}>
          <Tr>
            { tableColumns.map((column, index) => (
              <Th key={index} fontSize={'md'}>
                {column}
              </Th>
              ))
            }
          </Tr>
        </Thead>
        <Tbody>
          {peopleData.map((person, index) => (
            <Tr key={index} textAlign={'center'}>
              {tableColumns.map((column, columnIndex) => (
                <Td key={columnIndex} textAlign={'center'}>
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
