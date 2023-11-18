export type PersonData = {
  id: number;
  name: string;
  last_name?: string;
  email?: string;
  city?: string;
  state?: string;
  neighborhood?: string;
  street?: string;
  number?: string;
  observation?: string;
  cep?: string;
  phone?: string;
  cnpj?: string;
  cpf?: string;
  rg?: string;
};

export type PeopleTableProps = {
  peopleData: PersonData[];
  tableColumns: string[];
  renderCustomColumn: (person: PersonData, column: string) => React.ReactNode;
};