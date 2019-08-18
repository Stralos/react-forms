import React from 'react';

interface Props {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: any) => void;
  name: string;
  placeholder?: string;
  value: string | number
}

const Input = (props: Props) => (
  <input {...props} />
)


export default Input;