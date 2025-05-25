document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const convertedAmountInput = document.getElementById('converted-amount');
    const resultText = document.getElementById('result-text');
    const swapButton = document.getElementById('swap');

    const apiKey = '2987e2d656fe91e3b873f6b2'; // Use your API Key
    let exchangeRates = {};

    // Load currency rates on page load
    fetchExchangeRates();

    // Function to retrieve currency rates
    function fetchExchangeRates() {
        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)
            .then(response => response.json())
            .then(data => {
                exchangeRates = data.conversion_rates;
            })
            .catch(error => {
                console.error('Error fetching exchange rates:', error);
            });
    }

    // Function for converting currency
    function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount)) {
            resultText.textContent = 'Please enter a valid amount.';
            return;
        }

        if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
            const convertedAmount = amount * (exchangeRates[toCurrency] / exchangeRates[fromCurrency]);
            convertedAmountInput.value = convertedAmount.toFixed(2);
            resultText.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        } else {
            resultText.textContent = 'Exchange rate not available.';
        }
    }

    // Function for swapping currencies
    function swapCurrencies() {
        const temp = fromCurrencySelect.value;
        fromCurrencySelect.value = toCurrencySelect.value;
        toCurrencySelect.value = temp;
        convertCurrency();
    }

    // Added event listener
    amountInput.addEventListener('input', convertCurrency);
    fromCurrencySelect.addEventListener('change', convertCurrency);
    toCurrencySelect.addEventListener('change', convertCurrency);
    swapButton.addEventListener('click', swapCurrencies);

    // Every 60 seconds update
    setInterval(fetchExchangeRates, 60000);
});
