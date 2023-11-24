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
  }
  setValue(name, formattedValue);
  event.target.value = formattedValue;
};