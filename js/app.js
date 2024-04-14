
const dropList = document.querySelectorAll('.drop-list select'),
    fomCurency = document.querySelector('.form select'),
    toCurrency = document.querySelector('.to select');
const button = document.querySelector('form button');


for (let i = 0; i < dropList.length; i++) {

    for (currency_code in country) {

        let selected;

        if (i == 0) {

            selected = currency_code == 'USD' ? 'selected' : ''
        } else if (i == 1) {

            selected = currency_code == 'COP' ? 'selected' : ''
        };

        let optiontag = `<option value="${currency_code}" ${selected} >  ${currency_code} </option>`;
        dropList[i].insertAdjacentHTML('beforeend', optiontag);
    };

    dropList[i].addEventListener('change', e => loadFlag(e.target));
};

const loadFlag = element => {
    for (code in country) {
        if (code == element.value) {

            let imgTag = element.parentElement.querySelector('img');
            imgTag.src = ` https://flagsapi.com/${country[code]}/flat/64.png `;
        };
    };
};

window.addEventListener('load', () => getExchange());

button.addEventListener('click', e => {

    e.preventDefault();
    getExchange()
});

const exchange = document.querySelector('.drop-list .ri-arrow-left-right-line');
exchange.addEventListener('click', () => {

    let temCode = fomCurency.value;
    fomCurency.value = toCurrency.value;
    toCurrency.value = temCode;
    loadFlag(fomCurency);
    loadFlag(toCurrency);
    getExchange();
});

const getExchange = () => {

    const amount = document.querySelector('.amount input');
    let amountVla = amount.value;

    if (amountVla == '' || amountVla == '0') {

        amount.value = '1';
        amountVla = 1;
    };

    const exchangeeRateTxt = document.querySelector('.exchange-rete');
    exchangeeRateTxt.innerText = 'convirtiendo....';

    const curl = ` https://api.fastforex.io/convert?to=${toCurrency.value}&amount= ${amountVla} &api_key=d473b731ba-3ee1fa0748-sbuza5`;

    fetch(curl).then(response => response.json()).then(result => {

        let excahngeRate = result.result.rate;
        let totalExchangeRate = (amountVla * excahngeRate).toFixed();
        exchangeeRateTxt.innerText = `${amountVla} ${fomCurency.value} = ${totalExchangeRate} ${toCurrency.value}`
    }).catch(() => {
        exchangeeRateTxt.innerText = 'Soometing went worng'
    });

};