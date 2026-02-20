import React from 'react'

const baseStyle = `
  text-base
  rounded-md
  bg-amber-400
  text-amber-900
  px-4 py-2
  min-w-[8rem]
  transition
  hover:shadow-[0_0_0_3px_#fea,0_0_0_4px_#fb1]
  focus:outline-none
  disabled:opacity-50
  disabled:cursor-wait
`;

type ButtonProps = React.ComponentProps<'button'> & {
  children: string;
}

const Button = ({children, className = "", ...props} : ButtonProps) => {
  return (
    <button 
    {...props}
    className={`${baseStyle} ${className}`}>{children}</button>
  )
}

export default Button