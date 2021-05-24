document.getElementById('loan-form').addEventListener('submit', function(e) {

    document.getElementById('results').style.display = 'none';

    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 1000);


    e.preventDefault();
});S

function calculateResults() {

    console.log('Calculating....')

    const amountEL = document.getElementById('amount');
    const interestEL = document.getElementById('interest');
    const yearsEL = document.getElementById('years');
    const monthlyPaymentEL = document.getElementById('monthly-payment');
    const totalPaymentEL = document.getElementById('total-payment');
    const totalInterestEL = document.getElementById('total-interest');


    const principal = parseFloat(amountEL.value);
    const calculatedInterest = parseFloat(interestEL.value) / 100 / 12;
    const calculatedPayments = parseFloat(yearsEL.value) * 12;


    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);


    if (isFinite(monthly)) {
        monthlyPaymentEL.value = monthly.toFixed(2);
        totalPaymentEL.value = (monthly * calculatedPayments).toFixed(2);
        totalInterestEL.value = ((monthly * calculatedPayments) - principal).toFixed(2);



        document.getElementById('results').style.display = 'block';

        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }

    
}

function showError(error) {

    document.getElementById('results').style.display = 'none';

    document.getElementById('loading').style.display = 'none';

    const errorDivEL = document.createElement('div');

    const cardEL = document.querySelector('.card');
    const headingEL = document.querySelector('.heading')

    errorDivEL.className = 'alert alert-danger';

    errorDivEL.appendChild(document.createTextNode(error));

    cardEL.insertBefore(errorDivEL, headingEL);
    

    setTimeout(clearError, 2000)
}


function clearError(){
    document.querySelector('.alert').remove();
}