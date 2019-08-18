import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import Input from './components/molecules/input';
import _ from 'lodash';
import yup from './common/yup';

interface Service {
  price: number;
  name: string;
}

interface formValues {
  name: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
  promotionsAgree: boolean;
  permissions: String[];
  homePhone?: string;
  services: Service[];
}

export const validationSchema = yup.object().shape(
  {
    name: yup.string().required('name is required'),
    lastName: yup.string().required('last name is required'),
    homePhone: yup.string().phone('This is not a valid phone number'),
    phoneNumber: yup.string().when('email', {
      is: email => _.isNil(email),
      then: yup.string().required('Phone is required if email is not provided'),
      otherwise: yup.string()
    }),
    email: yup
      .string()
      .email('This is not a valid email')
      .when('phoneNumber', {
        is: phoneNumber => _.isNil(phoneNumber),
        then: yup
          .string()
          .required('Email is required if no phone number is passed'),
        otherwise: yup.string()
      }),
    services: yup.array().of(yup.object().shape({
      price: yup.string().required('Service price is required'),
      name: yup.string().required('Service requires a name')
    }))
  },
  [['phoneNumber', 'email']]
);

const FormikForm: React.FC = () => {
  const initialValues: formValues = {
    name: 'James',
    lastName: 'Potter',
    email: undefined,
    phoneNumber: undefined,
    promotionsAgree: true,
    homePhone: undefined,
    permissions: ['read', 'write', 'edit'],
    services: [{
      name: 'Haircut',
      price: 10
    }]
  };
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      validateOnBlur={false}
      onSubmit={p => {
        alert(JSON.stringify(p));
      }}
    >
      {({ values, errors, touched, submitCount }) => (
        <Form>
          <Field name="name" placeholder="name" component={Input}/>
          <Field name="lastName" placeholder="lastName" component={Input}/>          
          <Field name="email" placeholder="email" component={Input}/>
          <Field name="phoneNumber" placeholder="phoneNumber" component={Input}/>

          {touched.homePhone && errors.homePhone && !!submitCount && (
            <p>{errors['homePhone']}</p>
          )}
          <Field type="input" name="homePhone" placeholder="homePhone" />
          
          <FieldArray name="permissions">
            {arrayHelpers => (
              <div>
                <div>hello world</div>
              </div>
            )}
          </FieldArray>
          <Field
            name="promotionsAgree"
            type="checkbox"
            checked={values.promotionsAgree}
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
