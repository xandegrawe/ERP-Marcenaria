import React, { createContext, useState, useEffect } from 'react';
import { set } from 'react-hook-form';
import { listCustomersApi, listProvidersApi, listBankAccountsApi, listBankInvoicesApi, listCategoriesApi, listPeopleApi} from 'services/api';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [providers, setProviders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [people, setPeople] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const selectAccount = (accountId) => {
    setSelectedAccountId(accountId);
  };

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

  useEffect(() => {
    listBankAccountsApi().then(response => {
      setBankAccounts(response.data);
    }
    ).catch(error => {
      console.error("Erro ao carregar contas bancárias:", error);
    });
  }, []);

  useEffect(() => {
    listBankInvoicesApi().then(response => {
      setInvoices(response.data);
    }
    ).catch(error => {
      console.error("Erro ao carregar contas bancárias:", error);
    });
  }, []);

  useEffect(() => {
    listCategoriesApi().then(response => {
      setCategories(response.data);
    }
    ).catch(error => {
      console.error("Erro ao carregar categorias:", error);
    });
  }, []);

  useEffect(() => {
    listPeopleApi().then(response => {
      setPeople(response.data);
    }
    ).catch(error => {
      console.error("Erro ao carregar pessoas:", error);
    });
  }, []);

  const addProvider = (newProvider) => {
    setProviders(prevProviders => [...prevProviders, newProvider]);
  };

  const addCustomer = (newCustomer) => {
    setCustomers(prev => [...prev, newCustomer]);
  };
  
  const addBankAccount = (newBankAccount) => {
    setBankAccounts(prev => [...prev, newBankAccount]);
  }

  const addCategory = (newCategory) => {
    setCategories(prev => [...prev, newCategory]);
  }

  const updateProvider = (updatedProvider) => {
    setProviders(prev => prev.map(provider => provider.id === updatedProvider.id ? updatedProvider : provider));
  };

  const deleteProvider = (customerId) => {
    setProviders(prev => prev.filter(provider => provider.id !== customerId));
  };

  const updateCustomer = (updatedCustomer) => {
    setCustomers(prev => prev.map(customer => customer.id === updatedCustomer.id ? updatedCustomer : customer));
  };

  const deleteCustomer = (customerId) => {
    setCustomers(prev => prev.filter(customer => customer.id !== customerId));
  };

  const deleteBankAccount = (bankAccountId) => {
    setBankAccounts(prev => prev.filter(bankAccount => bankAccount.id !== bankAccountId));
  }

  const addInvoice = (newInvoice) => {
    setInvoices(prev => [...prev, newInvoice]);
  };

  const deleteInvoice = (invoiceId) => {
    setInvoices(prev => prev.filter(invoice => invoice.id !== invoiceId));
  }

  const updateInvoice = (updatedInvoice) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
      )
    );
  };

  return (
    <GlobalContext.Provider value={
      { providers,
        addProvider,
        deleteProvider,
        updateProvider,

        customers,
        addCustomer, 
        deleteCustomer,
        updateCustomer,

        bankAccounts,
        addBankAccount,
        deleteBankAccount,

        invoices,
        addInvoice,
        deleteInvoice,
        updateInvoice, 
        
        categories,
        addCategory,

        people,
        selectedAccountId,
        selectAccount,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
