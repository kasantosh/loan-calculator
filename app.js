// Listen for Submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Show loading
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});


// Calculate Results
function calculateResults() {

  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Show results
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';


  } else {
    document.getElementById('loading').style.display = 'none';

    showError('Please check your numbers');
  }


}

// Show Error
function showError(error) {
  // create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add Class to the div
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading

  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);

}

function clearError() {
  document.querySelector('.alert').remove();

}