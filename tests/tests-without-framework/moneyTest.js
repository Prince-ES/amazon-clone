import {formatCurrency} from '../../scripts/utils/money.js';

console.log('test suite: formatCurrency');

console.log('converts cents into dollars')

if(formatCurrency(2095) === '20.95'){//basic test case
  console.log('passed');
}else{
  console.log('failed');
}

console.log('works with 0');
if(formatCurrency(0) === '0.00'){//edge case.
  console.log('passed');
}else{
  console.log('failed');
}

console.log('rounds up to nearest cent');

if(formatCurrency(2000.5) ==='20.01' ){//edge case.//the function formatCurrency rounds the number first and then divides it by 100 so, on passing   2000.5 it'll first round it as 2001 and then divide by 100 will give 1;
  console.log('passed');
}else{
  console.log('failed');
}

if(formatCurrency(2000.4) === '20.00'){//edge case.
  console.log('passed');
}else{
  console.log('failed');
}