import moment from 'moment';

const now = moment();

console.log('текущую дата DD-MM-YYYY:', now.format('DD-MM-YYYY'));
console.log('new date MMM Do YY:', now.format('MMM Do YY'));
console.log('День недели (dddd):', now.format('dddd'));
