import moment from 'moment-timezone'
declare module "moment-timezone" {
  export function init(): moment.Moment
  interface Moment {
    formatToApi(): string;
    increase(amount: number): moment.Moment
  }
}
moment.fn.formatToApi = function formatDateDefault() {
  return this.format('YYYY-MM-DD');
};
moment.fn.increase = function increase(amount: number) {
  return this.add(amount, 'd')
}
moment.init = function() {
  return moment();
}

export default moment;
