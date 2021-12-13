'use strict';

// Inputs
const billInput = document.querySelector('.bill-in');
const customTipInput = document.querySelector('.custom-tip-in');
const numberPeopleInput = document.querySelector('.number-people-in');

// Tip and reset buttons
const tipBtns = document.querySelectorAll('.tip');
const resetBtn = document.querySelector('.reset');

// Tip and total per person displays
const tipPerPersonDisplay = document.querySelector('.tip-per-person');
const totalPerPersonDisplay = document.querySelector('.total-per-person');

// Labels (error handling)
const invalidBillLabel = document.querySelector('.label-invalid-bill');
const invalidPeopleLabel = document.querySelector('.label-invalid-people');

// Functions
// Calculate tip according to % and total per person
const calcTipTotal = function (percentage, people, btnClicked) {
    if ((Number(billInput.value) === 0 || billInput.value === '') && (Number(numberPeopleInput.value) === 0 || numberPeopleInput.value === '')) {
        addInvalid(billInput, invalidBillLabel);
        addInvalid(numberPeopleInput, invalidPeopleLabel);
        return;

    } else if (Number(billInput.value) === 0 || billInput.value === '') {
        addInvalid(billInput, invalidBillLabel);
        return;

    } else if (Number(numberPeopleInput.value) === 0 || numberPeopleInput.value === '') {
        addInvalid(numberPeopleInput, invalidPeopleLabel);
        return;
    }

    resetBtn.removeAttribute('disabled');

    if (btnClicked !== undefined) {
        tipBtns.forEach(btn => btn.classList.remove('clicked'));

        btnClicked.classList.add('clicked');
        customTipInput.value = '';
    }

    else tipBtns.forEach(btn => btn.classList.remove('clicked'));

    const tipPerPerson = (Number(billInput.value) * (percentage / 100) / people).toFixed(2);
    const totalPerPerson = ((Number(billInput.value) / people) + Number(tipPerPerson)).toFixed(2);

    tipPerPersonDisplay.textContent = `$${tipPerPerson}`;
    totalPerPersonDisplay.textContent = `$${totalPerPerson}`;
}

// Add error handling classes/styles
const addInvalid = function (input, label) {
    label.style.display = 'inline-block';
    input.classList.add('invalid-input');

    tipPerPersonDisplay.textContent = '$0.00';
    totalPerPersonDisplay.textContent = '$0.00';

    tipBtns.forEach(btn => btn.classList.remove('clicked'));
}

// Remove error handling classes/styles
const removeInvalid = function (input, label) {
    label.style.display = 'none';
    input.classList.remove('invalid-input');
}

// Event listeners
// Tip % buttons
tipBtns.forEach(btn => {
    btn.addEventListener('click', () => calcTipTotal(Number(btn.textContent.replace('%', '')), Number(numberPeopleInput.value), btn));
});

// Reset button
resetBtn.addEventListener('click', () => {
    // Reset input values
    billInput.value = '';
    customTipInput.value = '';
    numberPeopleInput.value = '';

    // Remove 'invalid styles' from inputs 
    removeInvalid(billInput, invalidBillLabel);
    removeInvalid(numberPeopleInput, invalidPeopleLabel);

    // Reset displays
    tipPerPersonDisplay.textContent = '$0.00';
    totalPerPersonDisplay.textContent = '$0.00';

    // Remove 'clicked' class from tip buttons
    tipBtns.forEach(btn => btn.classList.remove('clicked'));

    // Button goes back to being disabled
    resetBtn.setAttribute('disabled', 'true');
});

// Inputs
billInput.addEventListener('focus', () => removeInvalid(billInput, invalidBillLabel));
billInput.addEventListener('input', () => calcTipTotal(Number(customTipInput.value), Number(numberPeopleInput.value)));
numberPeopleInput.addEventListener('focus', () => removeInvalid(numberPeopleInput, invalidPeopleLabel));
numberPeopleInput.addEventListener('input', () => calcTipTotal(Number(customTipInput.value), Number(numberPeopleInput.value)));
customTipInput.addEventListener('input', () => calcTipTotal(Number(customTipInput.value), Number(numberPeopleInput.value)));