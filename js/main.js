const form = document.querySelector('#quote-insurance');
const btn = document.querySelector('#check');
const spinner = document.querySelector('#spinner');

document.addEventListener('DOMContentLoaded', () => {
    fullOption();
    eventListener();
});


function eventListener() {
    form.addEventListener('submit', quote);
}

class Insurance {
    constructor(segment,textsegment, year, type) {
        this.segment = segment;
        this.textsegment = textsegment;
        this.year = year;
        this.type = type;
    }
    quoteInsurance() {
        let amount;
        const base = 2000;

        switch (this.segment) {
            case '1':
                amount = base * 1.15;
                break;
            case '2':
                amount = base * 1.25;
                break;
            case '3':
                amount = base * 1.35;
                break;
            case '4':
                amount = base * 1.45;
                break;
            default:
                amount = base;
                break;
        }
        // 3% per year
        const difference = new Date().getFullYear() - this.year;
        amount -= ((difference * 3) * amount) / 100;

        // plus  30% essential 50% Complete
        if (this.type === "essential" ?
            amount *= 1.3
            : amount *= 1.5);

        return amount;
    }

}
class UI {
    mgmAlert(text, type) {
      
    
        const textalert = document.createElement('DIV');
        textalert.classList.add('text-sky-500','text-center', 'font-bold' );
        if (type == "error") {
            textalert.classList.remove('bg-green-600', 'border-green-700','text-sky-500');
            textalert.classList.add('bg-red-500', 'border-red-600', 'text-white','border-solid', 'border-2', 'p-2');

            textalert.textContent = text;
        }
        textalert.textContent = text;

        form.appendChild(textalert);
        setTimeout(() => {
            textalert.remove();
        }, 2000)
    }
    showResult(total, insurance) {
        spinner.classList.remove('hidden');
        const result = document.createElement('DIV');
        result.setAttribute('id', 'price');
        result.classList.add('bg-sky-100', 'text-sky-800', 'w-full','flex','flex-col','text-lg', 'mt-10');
        result.innerHTML = `<div class="bg-sky-200 w-full p-3 lg:text-2xl font-bold uppercase"> The best price, guaranteed
        </div>
        <div class="p-3">
         Segment
        <div class="mb-4 text-lg font-bold">  ${insurance.textsegment}</div>
        Year
        <div class="mb-4 text-lg font-bold">${insurance.year}</div>
        Type of insurance
        <div class="mb-8 text-lg font-bold capitalize">${insurance.type} </div> 
        <div class=" lg:text-2xl font-bold uppercase my-4 pb-4 text-end">Total $ ${total}  <span class="text-xs">* per year</span></div></div>`;
        setTimeout(() => {     
            spinner.classList.add('hidden');       
            form.appendChild(result);
        }, 2000)


    }

}

const ui = new UI();

function fullOption() {
    const dateMax = new Date().getFullYear();
    const dateMin = dateMax - 20;
    const selectYear = document.querySelector('#year')
    for (let i = dateMax; i > dateMin; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }

}

function quote(e) {
    e.preventDefault();
    btn.disabled = true;
    setTimeout(()=>{
        btn.disabled = false;
    },2000)

    if (document.querySelector('#price')) {
        document.querySelector('#price').remove();
    }
    const segmentSelect = document.querySelector('#segment');
    const textsegment = segmentSelect.options[segmentSelect.selectedIndex].text;
    const segment = document.querySelector('#segment').value;
    
    const year = document.querySelector('#year').value;
    const type = document.querySelector('input[name="tipo"]:checked').value;


    if (segment === '' || year === '' || type === '') {
        return ui.mgmAlert('You must select all the data.', 'error');
    }

    ui.mgmAlert('Quoting...', 'success');
    const insurance = new Insurance(segment, textsegment, year, type);
    const total = insurance.quoteInsurance();

    ui.showResult(total, insurance)
}

