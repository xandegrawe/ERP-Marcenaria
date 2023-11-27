import axios from 'axios';
import { create } from 'domain';
import { PersonData } from 'types/personData';
import { BankAccount, BankInvoice, Category } from 'types/bankData';

const headers = {
  "Content-Type": "application/json",
};

export const listCustomersApi = () => axios.get<PersonData[]>('http://localhost:3000/api/customers', { headers })
export const getFullCustomerPersonDataApi = (id: number) => axios.get(`http://localhost:3000/api/customers/${id}`, { headers });
export const deleteCustomerApi = (id: number) => axios.delete(`http://localhost:3000/api/customers/${id}`, { headers });
export const createCustomerApi = (formData: Partial<PersonData>) => {
  const requestData = {
    person: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    },
    customer: {
      last_name: formData.last_name,
      cpf: formData.cpf,
      rg: formData.rg,
    },
    address: {
      city: formData.city,
      state: formData.state,
      neighborhood: formData.neighborhood,
      street: formData.street,
      number: formData.number,
      observation: formData.observation,
      cep: formData.cep,
    },
  };

  return axios.post('http://localhost:3000/api/customers', requestData, { headers });
};
export const updateCustomerApi = (id: number, formData: Partial<PersonData>) => {
  const requestData = {
    person: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    },
    customer: {
      last_name: formData.last_name,
      cpf: formData.cpf,
      rg: formData.rg,
    },
    address: {
      city: formData.city,
      state: formData.state,
      neighborhood: formData.neighborhood,
      street: formData.street,
      number: formData.number,
      observation: formData.observation,
      cep: formData.cep,
    },
  };

  return axios.put(`http://localhost:3000/api/customers/${id}`, requestData, { headers });
}


export const listProvidersApi = () => axios.get<PersonData[]>('http://localhost:3000/api/providers', { headers })
export const getFullProviderPersonDataApi = (id: number) => axios.get(`http://localhost:3000/api/providers/${id}`, { headers });
export const deleteProviderApi = (id: number) => axios.delete(`http://localhost:3000/api/providers/${id}`, { headers });
export const createProviderApi = (formData: Partial<PersonData>) => {
  const requestData = {
    person: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    },
    provider: {
      cnpj: formData.cnpj
    },
    address: {
      city: formData.city,
      state: formData.state,
      neighborhood: formData.neighborhood,
      street: formData.street,
      number: formData.number,
      observation: formData.observation,
      cep: formData.cep,
    },
  };

  return axios.post('http://localhost:3000/api/providers', requestData, { headers });
};

export const updateProviderApi = (id: number, formData: Partial<PersonData>) => {
  const requestData = {
    person: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    },
    provider: {
      cnpj: formData.cnpj
    },
    address: {
      city: formData.city,
      state: formData.state,
      neighborhood: formData.neighborhood,
      street: formData.street,
      number: formData.number,
      observation: formData.observation,
      cep: formData.cep,
    },
  };

  return axios.put(`http://localhost:3000/api/providers/${id}`, requestData, { headers });
}

export const createBankAccountApi = (formData: Partial<BankAccount>) => {
  const requestData = {
    bank_account: {
      name: formData.name,
      inicial_balance: formData.inicial_balance,
    },
  };

  return axios.post('http://localhost:3000/api/bank_accounts', requestData, { headers });
}

export const listBankAccountsApi = () => axios.get<BankAccount[]>('http://localhost:3000/api/bank_accounts', { headers })
export const deleteBankAccountApi = (id: number) => axios.delete(`http://localhost:3000/api/bank_accounts/${id}`, { headers });

export const createBankInvoice = (formData: Partial<BankInvoice>) => {
  const requestData = {
    bank_invoice: {
      note: formData.note,
      amount: formData.amount,
      status: formData.status,
      bank_account_id: formData.bank_account_id,
      category_id: formData.category_id,
      person_id: formData.person_id,
    },
  };

  return axios.post('http://localhost:3000/api/bank_invoices', requestData, { headers });
}

export const listBankInvoicesApi = () => axios.get<BankAccount[]>('http://localhost:3000/api/bank_invoices', { headers })
export const getFullBankInvoiceDataApi = (id: number) => axios.get(`http://localhost:3000/api/bank_invoices/${id}`, { headers });

export const updateBankInvoiceApi = (formData: Partial<BankInvoice>) => {
  const requestData = {
    bank_invoice: {
      note: formData.note,
      amount: formData.amount,
      status: formData.status,
      bank_account_id: formData.bank_account_id,
      category_id: formData.category_id,
      person_id: formData.person_id,
    },
  };

  return axios.put(`http://localhost:3000/api/bank_invoices/${formData.id}`, requestData, { headers });
}

export const deleteBankInvoiceApi = (id: number) => axios.delete(`http://localhost:3000/api/bank_invoices/${id}`, { headers });

export const createCategoryApi = (formData: Partial<Category>) => {
  const requestData = {
    category: {
      name: formData.name,
    },
  };

  return axios.post('http://localhost:3000/api/categories', requestData, { headers });
}

export const listCategoriesApi = () => axios.get<Category[]>('http://localhost:3000/api/categories', { headers })

export const listPeopleApi = () => axios.get<PersonData[]>('http://localhost:3000/api/people', { headers })