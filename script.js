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
const calcTipTotal = function (percentage, people) {
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

    const tipPerPerson = Number(billInput.value) * (percentage / 100) / people;

    tipPerPersonDisplay.textContent = `$${tipPerPerson}`;
    totalPerPersonDisplay.textContent = `$${(Number(billInput.value) / people) + tipPerPerson}`;
}

// Add error handling classes/styles
const addInvalid = function (input, label) {
    label.style.display = 'inline-block';
    input.classList.add('invalid-input');
}

// Remove error handling classes/styles
const removeInvalid = function (input, label) {
    label.style.display = 'none';
    input.classList.remove('invalid-input');
}

// Event listeners
// Tip % buttons
tipBtns.forEach(btn => {
    btn.addEventListener('click', () => calcTipTotal(Number(btn.textContent.replace('%', '')), Number(numberPeopleInput.value)));
});

// Inputs
billInput.addEventListener('focus', () => removeInvalid(billInput, invalidBillLabel));
numberPeopleInput.addEventListener('focus', () => removeInvalid(numberPeopleInput, invalidPeopleLabel));