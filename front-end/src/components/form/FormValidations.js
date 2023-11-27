import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { AiOutlineExclamation } from "react-icons/ai";

export const formatCep = (value) => {
  return value.replace(/\D/g, '').replace(/(\d{5})(\d{1,3})/, '$1-$2');
};

export const formatCpf = (value) => {
  value = value.replace(/\D/g, '');
  if (value.length > 9) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  }
  if (value.length > 6) {
    return value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  }
  return value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
};

export const formatRg = (value) => {
  value = value.replace(/\D/g, '');
  if (value.length > 2) {
    return value.replace(/(\d{1})(\d{3})(\d{1,3})/, '$1.$2.$3');
  }
  return value.replace(/(\d{1})(\d{1,3})/, '$1.$2');
};

export const formatCnpj = (value) => {
  value = value.replace(/\D/g, '');
  if (value.length > 12) {
    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5');
  }
  if (value.length > 8) {
    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4');
  }
  if (value.length > 5) {
    return value.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3');
  }
  if (value.length > 2) {
    return value.replace(/(\d{2})(\d{1,3})/, '$1.$2');
  }
  return value.replace(/(\d{2})/, '$1');
}

export const formatPhone = (value) => {
  value = value.replace(/\D/g, '');
  if (value.length > 10) {
    return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  if (value.length > 6) {
    return value.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
  }
  if (value.length > 2) {
    return value.replace(/(\d{2})(\d{1,4})/, '($1) $2');
  }
  return value.replace(/(\d{2})/, '($1');
}

export const formatBalance = (value) => {
  value = value.replace(/\D/g, '');

  value = value.replace(/(\d+)(\d{2})$/, '$1,$2');

  return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.').replace(/^0\./, '');
}

export function selectIcon(status) {
  if (status === "2") {
    return AiOutlineExclamation
  } else if (status === "0") {
    return FaArrowUp
  } else {
    return FaArrowDown
  }
}

export function formatPrice(price, status) {
  if (status === "2") {
    price = "Pendente"
    return price
  } else if (status === "0") {
    return `+ R$ ${price}`
  }
  else {
    return `- R$ ${price}`
  }
}

export function formatPriceColor(price) {
  if (price[0] === '+')
    return "green.500"
  else if (price[0] === '-')
    return "red.500"
  else
    return "yellow.400"
}

export const handleInputChange = (event, setValue) => {
  const { name, value } = event.target;
  let formattedValue = value;

  if (name === 'cep') {
    formattedValue = formatCep(value);
  } else if (name === 'cpf') {
    formattedValue = formatCpf(value);
  } else if (name === 'rg') {
    formattedValue = formatRg(value);
  } else if (name === 'phone') {
    formattedValue = formatPhone(value);
  } else if (name === 'cnpj') {
    formattedValue = formatCnpj(value);
  } else if (name === 'inicial_balance' || name === 'amount') {
    formattedValue = formatBalance(value);
  }


  setValue(name, formattedValue);
  event.target.value = formattedValue;
};