import React, { Fragment } from 'react';
import InputAtom from '../atoms/input';
import { FieldProps, getIn } from 'formik';

const Input = ({ field, form: { touched, errors, submitCount } }: FieldProps) => (
  <Fragment>
    <InputAtom {...field} />
    {!!getIn(touched, field.name) && !!getIn(errors, field.name) && !!submitCount && (
      <p>{errors[field.name]}</p>
    )}
  </Fragment>
);

export default Input;
