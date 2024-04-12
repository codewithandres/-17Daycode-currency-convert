

const dropList = document.querySelector('.drop-list select');

for (let i = 0; i < dropList.length; i++) {

    for (currency_code in country) {
        console.log(currency_code);
    };
};