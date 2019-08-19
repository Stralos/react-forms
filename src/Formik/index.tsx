import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import Input from './components/molecules/input';
import _ from 'lodash';
import yup from './common/yup';
import { Permissions } from './common/permissions';

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

const userPermissions = [
  {
    label: 'Can edit',
    permission: Permissions.Edit
  },
  {
    label: 'Can write',
    permission: Permissions.Write
  },
  {
    label: 'Can read',
    permission: Permissions.Read
  }
];

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
    services: yup.array().of(
      yup.object().shape({
        price: yup.string().required('Service price is required'),
        name: yup.string().required('Service requires a name')
      })
    )
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
    services: [
      {
        name: 'Haircut',
        price: 10
      }
    ]
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
        <Form style={{ display: 'flex', flexDirection: 'column' }}>
          <Field name="name" placeholder="name" component={Input} />
          <Field name="lastName" placeholder="lastName" component={Input} />
          <Field name="email" placeholder="email" component={Input} />
          <Field
            name="phoneNumber"
            placeholder="phoneNumber"
            component={Input}
          />

          {touched.homePhone && errors.homePhone && !!submitCount && (
            <p>{errors['homePhone']}</p>
          )}
          <Field type="input" name="homePhone" placeholder="homePhone" />
          <p>Permissions:</p>
          <FieldArray name="permissions">
            {arrayHelpers =>
              userPermissions.map(permission => (
                <label>
                  {permission.label}
                  <input
                    name="permissions"
                    type="checkbox"
                    value={permission.permission}
                    checked={values.permissions.includes(permission.permission)}
                    onChange={e => {
                      if (e.target.checked)
                        arrayHelpers.push(permission.permission);
                      else {
                        arrayHelpers.remove(
                          values.permissions.indexOf(permission.permission)
                        );
                      }
                    }}
                  />
                </label>
              ))
            }
          </FieldArray>
          <label>
            Receive promotion
            <Field
              name="promotionsAgree"
              type="checkbox"
              checked={values.promotionsAgree}
            />
          </label>

          <button type="submit">Submit</button>

          <pre>
            {JSON.stringify(values)}
          </pre>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
