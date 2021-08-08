'use strict';
const account1 = {
  owner: 'Dharmesh Bhupat Ranpara',
  movements: [2000, 4500, -400, 30000, -650, -130, 700, 13000],
  pin: 1111,
  movementsDates: [
    '2021-07-04T21:31:17.178Z',
    '2021-07-05T07:42:02.383Z',
    '2021-07-12T09:15:04.904Z',
    '2021-07-15T10:17:24.185Z',
    '2021-07-28T14:11:59.604Z',
    '2021-08-03T17:01:17.194Z',
    '2021-08-07T23:36:17.929Z',
    '2021-08-08T10:51:36.790Z',
  ],
  currency: 'INR',
  exchange: 74.21,
  locale: 'en-IN',
};

const account2 = {
  owner: 'Chayan Dharmesh Ranpara',
  movements: [5000, 34000, -150, -790, 2000, 5000, -300, 50000 -3210, 1000, 8500, -300],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2021-06-25T13:15:33.035Z',
    '2021-06-27T13:15:33.035Z',
    '2021-07-02T13:15:33.035Z',
    '2021-07-05T13:15:33.035Z',
    '2021-07-07T13:15:33.035Z',
    '2021-07-12T09:48:16.867Z',
    '2021-07-20T06:04:23.907Z',
    '2021-07-25T14:18:46.235Z',
    '2021-07-28T16:33:06.386Z',
    '2021-08-03T14:43:26.374Z',
    '2021-08-06T18:49:59.371Z',
    '2021-08-08T10:51:36.790Z',
  ],
  currency: 'USD',
  exchange: 0.013,
  locale: 'en-US',
};

const account3 = {
  owner: 'Mitheel Ranpara',
  movements: [2000, -200, 3400, -300, -20, 50, 400, -460],
  pin: 3333,
  movementsDates: [
    '2021-07-01T13:15:33.035Z',
    '2021-07-08T09:48:16.867Z',
    '2021-07-10T06:04:23.907Z',
    '2021-07-15T14:18:46.235Z',
    '2021-07-25T16:33:06.386Z',
    '2021-07-28T14:43:26.374Z',
    '2021-08-03T18:49:59.371Z',
    '2021-08-05T12:01:20.894Z',
  ],
  currency: 'INR',
  exchange: 74.21,
  locale: 'en-IN',
};

const account4 = {
  owner: 'Damini Dharmesh Ranpara',
  movements: [43000, 100600, 7000, -500, 900,-1000, -5000, -20000],
  pin: 4444,
  movementsDates: [
    '2021-06-28T13:15:33.035Z',
    '2021-06-30T09:48:16.867Z',
    '2021-07-01T06:04:23.907Z',
    '2021-07-05T14:18:46.235Z',
    '2021-07-15T16:33:06.386Z',
    '2021-07-26T14:43:26.374Z',
    '2021-08-02T18:49:59.371Z',
    '2021-08-05T12:01:20.894Z',
  ],
  currency: 'INR',
  exchange: 74.21,
  locale: 'en-IN',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const formatMovementDate=function(date, locale)
{
  const calcDaysPassed=(date1,date2) => Math.round(Math.abs(date2-date1)/(1000*60*60*24));
  const daysPassed=calcDaysPassed(new Date(),date);
  if(daysPassed===0)
  return 'Today';
  if(daysPassed===1)
  return 'Yesterday';
  if(daysPassed<=7)
  return `${daysPassed} days ago`;
  else
  {
    return new Intl.DateTimeFormat(locale).format(date);
  }
}

const formatCur = function(value, locale, currency)
{
  return new Intl.NumberFormat(locale, {
    style: 'currency', 
    currency: currency,
  }).format(value);
}
const displayMovements= function(acc, sort=false)
{
  containerMovements.innerHTML='';

  const movs=sort?acc.movements.slice().sort((a,b)=> a-b): acc.movements;
  for(let [i,move] of movs.entries())
  {
    const type= move>0? 'deposit':'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(move, acc.locale, acc.currency);
    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;
  containerMovements.insertAdjacentHTML('afterbegin', html);
  }
};

for(let i of accounts)
{
  let user= ' '+i.owner;
  let username='';
  for(let i=0;i<user.length;i++)
  {
    if(user[i]==' ')
    {
      username+=user[i+1];
    }
  }
  i.username=username.toLowerCase();
}

const printBalance= function(acc)
{
  acc.balance=acc.movements.reduce((acc,mov) => acc+mov, 0);
  labelBalance.textContent=formatCur(acc.balance, acc.locale, acc.currency);;
}

const displaySummary=function(acc)
{
  const income=acc.movements.filter(function(mov)
  {
    return mov>0;
  })
  .reduce(function(acc,mov)
  {
    return acc+mov;
  },0)
  labelSumIn.textContent=formatCur(income, acc.locale, acc.currency);;

  const out=acc.movements.filter(function(mov)
  {
    return mov<0;
  })
  .reduce(function(acc,mov)
  {
    return acc+mov;
  },0)
  labelSumOut.textContent=formatCur(Math.abs(out), acc.locale, acc.currency);;
  const interest=function(mov)
  {
    let ans=0,bal=0;
    for(let i of mov)
    {
      bal+=i;
      ans+=(bal*(2.5/100));
    }
    return ans.toFixed(2);
  }
  labelSumInterest.textContent=formatCur(interest(acc.movements), acc.locale, acc.currency);;
}

const startLogOutTimer=function()
{
  const tick=function()
  {
    const min= String(Math.trunc(time/60)).padStart(2,0);
    const sec=String(time%60).padStart(2,0);
    labelTimer.textContent=`${min}:${sec}`;
    if(time===0)
    {
      clearInterval(timer);
      labelWelcome.textContent='Log in';
      containerApp.style.opacity=0;
    }
    time--;
  };
  let time=300;
  tick();
  const timer=setInterval(tick,1000);
  return timer;
}

let currentAccount, timer;
btnLogin.addEventListener('click', function(e)
{
  e.preventDefault();
  currentAccount=accounts.find(acc=>acc.username === inputLoginUsername.value);
  if(currentAccount?.pin === Number(inputLoginPin.value))
  {
    labelWelcome.textContent=`Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity=1;
    inputLoginUsername.value=inputLoginPin.value='';
    inputLoginPin.blur();
    const now= new Date();
    const options={
    hour: 'numeric',minute:'numeric', day: 'numeric', month: 'numeric', year: 'numeric',
    };
    labelDate.textContent=new Intl.DateTimeFormat(currentAccount.locale, options).format(now);
    if(timer)
    clearInterval(timer);
    timer=startLogOutTimer();
    printBalance(currentAccount);
    displaySummary(currentAccount);
    displayMovements(currentAccount);
  }
  else
  {
    containerApp.style.opacity=0;
    labelWelcome.textContent=`Log in`;
    alert('enter correct details');
  }
  
});

btnTransfer.addEventListener('click', function(e)
{
  e.preventDefault();
  const amount=Number(inputTransferAmount.value);
  const receiverAcc=accounts.find(acc=>acc.username === inputTransferTo.value);
  inputTransferAmount.value=inputTransferTo.value = '';
  inputTransferTo.blur();
  if(amount>0 && amount<=currentAccount.balance && receiverAcc && receiverAcc?.username !== currentAccount.username)
  {
    if(currentAccount.currency === receiverAcc.currency)
    {
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
    }
    else
    {
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount*receiverAcc.exchange);
    }

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    displayMovements(currentAccount);
    printBalance(currentAccount);
    displaySummary(currentAccount);
    clearInterval(timer);
    timer=startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputLoanAmount.value;
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      displayMovements(currentAccount);
      printBalance(currentAccount);
      displaySummary(currentAccount);
      console.log(currentAccount);
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 5000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function(e)
{
  e.preventDefault();
  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin)
  {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    accounts.splice(index,1);
    containerApp.style.opacity=0;
  }
  inputClosePin.value = inputCloseUsername.value='';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

