const calcular = document.getElementById('calcular')
const selectValue = document.getElementById('selectValue')
const input = document.querySelectorAll('.input')
const radios = document.querySelectorAll("input[type='radio']");
const modal = document.querySelector('.modal-container')
const dangerAlert = document.querySelector('.danger')
const fireworks = document.querySelector('.pyro')
const danger = new Audio('audio/sirene.mp3');
const applause = new Audio('audio/aplausos.mp3');
const alert = new Audio('audio/alert.mp3');

for (let x = 0; x < radios.length; x++) {
    radios[x].onclick = function() {
        console.log(radios[x])
        clique(this.value);
    }
}

function clique(valueCheckbox) {
    if (valueCheckbox == 'masc') {
        document.querySelector('.man').style.display = 'flex'
        document.querySelector('.woman').style.display = 'none'
    } else if (valueCheckbox == 'femin') {
        document.querySelector('.woman').style.display = 'flex'
        document.querySelector('.man').style.display = 'none'
    }
}

document.querySelector('.fechar').addEventListener('click', () => {
    modal.classList.remove('ativo')
    dangerAlert.style.display = "none"
    fireworks.style.display = 'none'
    danger.pause();
    applause.pause();
    alert.pause();
})

modal.addEventListener('click', function(event) {
    if (event.target == this) modal.classList.remove('ativo')
    dangerAlert.style.display = "none"
});


function getIMC() {
    const name = document.getElementById('name').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;

    const modalResult = document.querySelector('.modal-container h1')

    if (name !== '' && height !== '' && weight !== '') {

        const imcValue = (weight / (height * height)).toFixed(2);

        let classification = ''

        if (imcValue < 18.5) {
            classification = 'abaixo de peso'
            alert.play();
        } else if (imcValue < 25) {
            classification = 'com peso ideal. Parabéns!!!';
            applause.play();
            fireworks.style.display = 'flex'
        } else if (imcValue < 30) {
            classification = 'levemente acima do peso.';
            alert.play();
        } else if (imcValue < 35) {
            classification = 'com obesidade grau I.';
            alert.play();
        } else if (imcValue < 40) {
            classification = 'com obesidade grau II';
            alert.play();
        } else {
            classification = 'com obesidade grau III. Cuidado!!';
            dangerAlert.style.display = "flex"
            danger.play();
        }
        modal.classList.add('ativo')
        modalResult.innerHTML = `${name} seu IMC é ${imcValue} <br> e você está ${classification}`
    } else {
        modal.classList.add('ativo')
        modalResult.innerHTML = 'Preencha todos os campos!!!'
    }
}
calcular.addEventListener('click', getIMC);