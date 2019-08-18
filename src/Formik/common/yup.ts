import * as yup from 'yup';

declare module 'yup' {
  interface StringSchema {
    phone(message?: string): StringSchema
  }
}

yup.addMethod(yup.string, 'phone', function(message){
  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
  return this.test('phone', message, value => phoneRegExp.test(value))
})

export default yup;
