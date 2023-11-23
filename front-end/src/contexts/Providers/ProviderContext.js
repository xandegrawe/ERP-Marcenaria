import React, { createContext, useState, useEffect } from 'react';
import { listProvidersApi } from 'services/api';

export const ProviderContext = createContext();

export const ProviderProvider = ({ children }) => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    listProvidersApi().then(response => {
      setProviders(response.data);
    }).catch(error => {
      console.error("Erro ao carregar fornecederos:", error);
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

  return (
    <ProviderContext.Provider value={{ providers, addProvider, updateProvider, deleteProvider }}>
      {children}
    </ProviderContext.Provider>
  );
};
