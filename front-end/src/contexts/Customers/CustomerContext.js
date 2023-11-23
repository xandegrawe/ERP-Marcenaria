import React, { createContext, useState, useEffect} from 'react';
import { set } from 'react-hook-form';
import { listCustomersApi } from 'services/api';

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([listCustomersApi()]);


  useEffect(() => {
    listCustomersApi().then(response => {
      setCustomers(response.data);
    }).catch(error => {
      console.error("Erro ao carregar clientes:", error);
    });
  }, []);

  // Adiciona um novo cliente
  const addCustomer = (newCustomer) => {
    setCustomers(prev => [...prev, newCustomer]);
  };

  // Atualiza um cliente existente
  const updateCustomer = (updatedCustomer) => {
    setCustomers(prev => prev.map(customer => customer.id === updatedCustomer.id ? updatedCustomer : customer));
  };

  // Exclui um cliente
  const deleteCustomer = (customerId) => {
    setCustomers(prev => prev.filter(customer => customer.id !== customerId));
  };

  return (
    <CustomerContext.Provider value={{ customers, addCustomer, updateCustomer, deleteCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};
