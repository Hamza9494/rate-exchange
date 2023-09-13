const currency_element_one = document.querySelector('#currency-one');
const currency_element_two = document.querySelector('#currency-two');
console.log(currency_element_two.value);
const amount_one = document.querySelector('#amount-one');
const amount_two = document.querySelector('#amount-two');

const swap = document.querySelector('.btn');
const rateText = document.querySelector('#rate');

//get exchange rate and update DOM
const calculate = () => {
  fetch(
    `https://v6.exchangerate-api.com/v6/0dc536b33db2e22790242ab5/latest/${currency_element_one.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currency_element_two.value];

      rateText.innerText = `1 ${currency_element_one.value} = ${rate} ${currency_element_two.value} `;

      amount_two.value = (rate * amount_one.value).toFixed(2);
    });
};

//event listners
currency_element_one.addEventListener('change', calculate);
currency_element_two.addEventListener('change', calculate);
amount_one.addEventListener('input', calculate);
amount_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currency_element_one.value;
  currency_element_one.value = currency_element_two.value;
  currency_element_two.value = temp;
  calculate();
});

calculate();
