import axios from 'axios';
import { create } from 'domain';
import { PersonData } from 'types/personData';

const headers = {
  "Content-Type": "application/json",
};

export const listCustomersApi = () => axios.get<PersonData[]>('http://localhost:3000/api/customers', { headers })

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

export const getFullPersonDataApi = (id: number) => axios.get(`http://localhost:3000/api/customers/${id}`, { headers });

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

export const deleteCustomerApi = (id: number) => axios.delete(`http://localhost:3000/api/customers/${id}`, { headers });
export const createProviderApi = (personData: Partial<PersonData>, providerData: Partial<PersonData>, addressData: Partial<PersonData>) => {
  const requestData = {
    person: {
      name: personData.name,
      email: personData.email,
      phone: personData.phone,
    },
    provider: {
      cnpj: providerData.cnpj
    },
    address: {
      city: addressData.city,
      state: addressData.state,
      neighborhood: addressData.neighborhood,
      street: addressData.street,
      number: addressData.number,
      observation: addressData.observation,
      cep: addressData.cep,
    },
  };

  return axios.post('http://localhost:3000/api/customers', requestData, { headers });
};
export const listProvidersApi = () => axios.get<PersonData[]>('http://localhost:3000/api/providers', { headers })
