function calc() {
    // Calculator

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) sex = localStorage.getItem('sex');
    if (localStorage.getItem('ratio')) ratio = localStorage.getItem('ratio');

    function initLocalSettings(...selectors) {
        console.log(selectors);
        let sexDivs = document.querySelectorAll(selectors[0]);
        let ratioDivs = document.querySelectorAll(selectors[1]);
        sexDivs.forEach(sexDiv => {
            if (sexDiv.id === localStorage.getItem('sex')) sexDiv.classList.add('calculating__choose-item_active');
        })
        ratioDivs.forEach(ratioDiv => {
            if (ratioDiv.getAttribute('data-ratio') === localStorage.getItem('ratio')) ratioDiv.classList.add('calculating__choose-item_active');
        })
    }

    function divsEval(selector) {
        let divs = document.querySelectorAll(selector);
        divs.forEach(div => {
            div.classList.remove('calculating__choose-item_active');
            div.addEventListener('click', (e) => {
                divs.forEach(div => div.classList.remove('calculating__choose-item_active'));
                div.classList.add('calculating__choose-item_active');
                if (e.target.id === 'female' || e.target.id === 'male') {
                    sex = e.target.id;
                    localStorage.setItem('sex', e.target.id);
                } else if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                }
                console.log(`Sex: ${sex}, Height: ${height}, Weight: ${weight}, Age: ${age}, Ratio: ${ratio}`);
                inputsEval("#height");
                inputsEval("#weight");
                inputsEval("#age");
                calculate(sex, height, weight, age, ratio);
            })
        })
    }

    function inputsEval(selector) {
        let input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (!input.value.match(/\D/g) || input.value === "") {
                input.style.border = 'none';
            } else if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            }
            if (/^[1-9]\d*$/.test(input.value)) {
                switch (input.getAttribute('id')) {
                    case "height":
                        height = +input.value;
                        break;
                    case "weight":
                        weight = +input.value;
                        break;
                    case "age":
                        age = +input.value;
                        break;
                }
                console.log(`Sex: ${sex}, Height: ${height}, Weight: ${weight}, Age: ${age}, Ratio: ${ratio}`);
                calculate(sex, height, weight, age, ratio);
            } else {
                console.log(`Incorrect ${selector.slice(1)} value. Try again`);
                switch (input.getAttribute('id')) {
                    case "height":
                        height = undefined;
                        break;
                    case "weight":
                        weight = undefined;
                        break;
                    case "age":
                        age = undefined;
                        break;
                }
                console.log(`Sex: ${sex}, Height: ${height}, Weight: ${weight}, Age: ${age}, Ratio: ${ratio}`);
                calculate();
            }
        });
    }

    function calculate(sex, height, weight, age, ratio) {
        const result = document.querySelector('.calculating__result span');
        result.textContent = '____';
        if (sex && height && weight && age && ratio) {
            let finalResult;
            if (sex === 'female') {
                finalResult = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                finalResult = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
            result.textContent = finalResult;
            console.log(`Total result: ${finalResult} kcal.`);
        }
    }

    divsEval('#gender div');
    divsEval(".calculating__choose_big div")
    inputsEval("#height");
    inputsEval("#weight");
    inputsEval("#age");
    calculate();
    initLocalSettings('#gender div', '.calculating__choose_big div');
    console.log(`Sex: ${sex}, Height: ${height}, Weight: ${weight}, Age: ${age}, Ratio: ${ratio}`);
}

export default calc;