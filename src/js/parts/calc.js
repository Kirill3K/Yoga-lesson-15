function calc() {
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('input', function() {
        personsSum = +this.value; 
        total = (daysSum * personsSum)*4000*place.options[place.selectedIndex].value; 

        if(restDays.value == '' || restDays.value == '0' || checkZero(this.value)) { 
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });
    restDays.addEventListener('input', function() {
        daysSum = +this.value; 
        total = (daysSum * personsSum)*4000*place.options[place.selectedIndex].value; 

        if(restDays.value == '' || restDays.value == '0' || checkZero(this.value)) { 
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '0') {
            total.value.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });

    let validationNumber = document.querySelectorAll('input[type=number]');

    validationNumber.forEach((item) => {
        item.addEventListener('input', function() {
            this.value = this.value.replace (/[^\d]/g, '');
        });
    });

    function checkZero(input) {
        return input.slice(0,1) == '0';
    } 
}

module.exports = calc;