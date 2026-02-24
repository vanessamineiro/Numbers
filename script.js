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
        const numerosDisponiveis = [];
        for (let i = newSort.de; i <= newSort; i++) {
            numerosDisponiveis.push(i);
        }

        for (let i = 0; i < newSort.qtde; i++) {
            const index = Math.floor(Math.random() * numerosDisponiveis.length);
            resultados.push(numerosDisponiveis[index]);
            numerosDisponiveis.splice(index, 1);
        }
    } else {
        // com repetição
        for (let i = 0; i < newSort.qtde; i++) {
            const numero = Math.floor(Math.random() * (newSort.ate - de + 1)) + newSort.de;
            resultados.push(Number(numero));
        }
    }

    mostrarResultado(resultados);
};

function mostrarResultado(lista) {
    console.log(lista)
}

