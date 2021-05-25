import fetchCountries from './fetchCountries.js'
import singleResultTpl from '../templates/singleResult.hbs';
import manyResultTpl from '../templates/manyResults.hbs';
import debounce from 'lodash.debounce';
import swal from 'sweetalert';



const refs = {
    input: document.querySelector('.input'),
    results: document.querySelector('.results'),
}

refs.input.addEventListener('input', debounce(onInput, 500));

function onInput(event) {

    const inputValue = event.target.value;

    if (inputValue.length === 0) {
        return
    }

    fetchCountries(inputValue)
        .then(r => {
            if (Array.isArray(r)) {
                markupMaker(r)
            } else {
                onError();
            }
        });
    
}

function markupMaker(arr) {
    if (arr.length === 1) {
      refs.results.innerHTML = singleResultTpl(arr);
    } else if (arr.length > 1 && arr.length < 10) {
        refs.results.innerHTML = manyResultTpl(arr);
        return;
    } else {
        onLongResult();
    }
}

function onError() {
    swal('Ничего не найдено', 'Веротно ты где-то ошибся', 'error');
    refs.results.innerHTML = '';
    
}

function onLongResult() {
    swal('Слишком длинный результат', 'Введи что нибуть более конткретное', 'warning');
    refs.results.innerHTML = '';
}