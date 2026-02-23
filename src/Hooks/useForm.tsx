import React from "react";

const types = {
  email: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Preencha um email válido'
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
    message: 'A senha precisa ter no mínimo 8 caracteres, sendo eles 1 caracter maíusculo, 1 minúsculo, 1 dígito e 1 caracter especial' 
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize Apenas Números'
  }
}

type FormField = keyof typeof types | false;

const useForm = (type : FormField = false) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function validate(value: string) {
    if(!type) return true;
    
    if (value.length === 0) {
      setError(types[type].message);
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null)
      return true;
    }
  }

  function onChange({target} : React.ChangeEvent<HTMLInputElement>) {
    if(error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
