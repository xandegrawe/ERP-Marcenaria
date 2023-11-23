import React, { createContext, useState, useEffect } from 'react';
import { listCustomersApi, listProvidersApi } from 'services/api';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [providers, setProviders] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    listProvidersApi().then(response => {
      setProviders(response.data);
    }).catch(error => {
      console.error("Erro ao carregar fornecederos:", error);
    });
  }, []);

  useEffect(() => {
    listCustomersApi().then(response => {
      setCustomers(response.data);
    }).catch(error => {
      console.error("Erro ao carregar clientes:", error);
    });
  }, []);

  const addProvider = (newProvider) => {
    setProviders(prevProviders => [...prevProviders, newProvider]);
  };

  const updateProvider = (updatedProvider) => {
    setProviders(prev => prev.map(provider => provider.id === updatedProvider.id ? updatedProvider : provider));
  };

  const deleteProvider = (customerId) => {
    setProviders(prev => prev.filter(provider => provider.id !== customerId));
  };

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
    <GlobalContext.Provider value={{ providers, customers, addProvider, updateProvider, deleteProvider, addCustomer, updateCustomer, deleteCustomer }}>
      {children}
    </GlobalContext.Provider>
  );
}
