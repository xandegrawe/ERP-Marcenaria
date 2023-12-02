import { Box, Button, SimpleGrid, Td, useDisclosure, useToast } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import PeopleTable from 'components/tables/PeopleTable';
import { useContext} from 'react';
import { deleteCategoryApi } from 'services/api';
import EditRegisterModal from 'components/modal/EditRegisterModal';
import { GlobalContext } from 'contexts/GlobalContext';
import { Category } from 'types/bankData';

export default function CatagoriesTable() {
  const toast = useToast();
  const { onClose } = useDisclosure();
  const tableColumns = ["Id", "Nome", "Ações"];

  const { categories, deleteCategory } = useContext(GlobalContext);

  const columnKeyMapping: Record<string, keyof Category> = {
    "Id": "id",
    "Nome": "name",
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategoryApi(id);
      deleteCategory(id);
      toast({
        title: "Categoria deletado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (err) {
      toast({
        title: "Erro ao deletar a categoria!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<SimpleGrid mb='20px' columns={{ sm: 0, md: 0 }} spacing={{ base: '20px', xl: '20px' }}>
				<PeopleTable
				peopleData={categories}
				tableColumns={tableColumns}
				renderCustomColumn={(category, column) => {
					if (column === "Ações") {
						return (
							<Td key="Ações" display="flex" textAlign="center" pl={'-0.5'}>
								<Button onClick={() => handleDeleteCategory(category.id)}>
									<FaTrash style={{ color: 'D40000' }} />
								</Button>
							</Td>
						);
					} else {
						const objectKey = columnKeyMapping[column];
						return (
							<Td key={column} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px'}}>
								{category[objectKey]}
							</Td>
						);
					}
				}}
			/>
			</SimpleGrid>
		</Box>
  );
}
