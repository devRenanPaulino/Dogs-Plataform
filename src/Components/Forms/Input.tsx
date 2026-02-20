import React from "react";

const baseStyleInput = `
  border 
  border-gray-200
  block
  w-full
  text-base
  p-3
  rounded-md 
  bg-gray-200
  transition
  focus:outline-none 
  hover:border-[#fb1]
  hover:bg-white
  hover:shadow-[0_0_0_3px_#fea]
`;

type InputProps = React.ComponentProps<'input'> & {
  label: string;
  error: string | null;
}

const Input = ({ label, type, name, value, onChange, error, onBlur} : InputProps) => {
  return (
    <div className="mb-[1rem]">
      <label htmlFor={name} className='block text-base pb-2'>{label}</label>
      <input 
      type={type}
      id={name}
      name={name}
      onChange={onChange}
      value={value}
      onBlur={onBlur}
      className={baseStyleInput} 
      />

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
