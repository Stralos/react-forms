import React, { Fragment } from 'react';
import InputAtom from '../atoms/input';
import { FieldProps, ErrorMessage } from 'formik';

const Input = ({ field, form: { submitCount } }: FieldProps) => (
  <Fragment>
    {!!submitCount && (
      <ErrorMessage name={field.name} render={error => <p>{error}</p>} />
    )}
    <InputAtom {...field} />
  </Fragment>
);

export default Input;
