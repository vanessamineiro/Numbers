const form = document.querySelector("form");
const qtdeInput = document.getElementById("qtd");
const deInput = document.getElementById("de");
const ateInput = document.getElementById("ate");
const repeat = document.getElementById("repeat");
const fields = document.getElementById("fields");


form.onsubmit = (event) => {
    event.preventDefault();

    const newSort = {

        qtde: qtdeInput.value,
        de: deInput.value,
        ate: ateInput.value,
        repeat: repeat.checked,
    }

    // ===== Validações =====
    if (newSort.de > newSort.ate) {
        alert("O valor 'de' não pode ser maior que 'até'.");
    }

    const tamanhoIntervalo = newSort.ate - newSort.de + 1;

    if (newSort.repeat && newSort.qtde > tamanhoIntervalo) {
        alert("Quantidade maior que o intervalo disponível (sem repetição).");
    }

    // ===== Sorteio =====
    let resultados = [];

    if (newSort.repeat) {
        // sem repetição
        for (let i = 0; i < newSort.qtde; i++) {
           noRepeat(newSort.de,newSort.ate,resultados);
        }
    } else {
        // com repetição
        for (let i = 0; i < newSort.qtde; i++) {
            resultados.push(getRandomInt(newSort.de, newSort.ate));
        }
    }

    mostrarResultado(resultados);
};

function mostrarResultado(lista) {
    console.log(lista)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function noRepeat(min, max, resultados) {
    let num = getRandomInt(min, max);
    if (resultados.includes(num)) {
        noRepeat(min, max, resultados)
    } else {
        resultados.push(num);
    }
}

