export type BankAccount = {
  id: number;
  name: string;
  inicial_balance: string;
};

export type BankInvoice = {
  id: number;
  bank_account_id?: number;
  category_id?: number | null;
  category_name?: string | null;
  formatted_amount?: string | null;
  formatted_date?: string | null;
  created_at?: string  | null;
  person_id?: number | null;
  person_name?: string | null;
  amount?: string;
  status?: string;
  due_date?: string | null;
  note?: string;
  current_installment?: number | null;
  total_installments?: number | null;
};

export type Category = {
  id: number;
  name: string;
};

export type BankAccountTableProps = {
  accountData: BankAccount[];
  tableColumns: string[];
  renderCustomColumn: (person: BankAccount, column: string) => React.ReactNode;
};