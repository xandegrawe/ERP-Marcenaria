export type PersonData = {
  name: string;
  email?: string;
  address?: string;
  phone?: string;
  CNPJ?: string;
  CPF?: string;
};

export type PeopleTableProps = {
  peopleData: PersonData[];
  tableColumns: string[];
  renderCustomColumn: (person: PersonData, column: string) => React.ReactNode;
};