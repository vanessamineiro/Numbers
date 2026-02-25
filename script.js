const form = document.querySelector("form");
const qtdeInput = document.getElementById("qtd");
const deInput = document.getElementById("de");
const ateInput = document.getElementById("ate");
const repeat = document.getElementById("repeat");
const repeatCheck = document.querySelector(".repeat-check");
const fields = document.querySelector(".fields");
const info = document.querySelector(".title-form");
const btn = document.querySelector("button");
const btnSpan = document.querySelector("button span");
const btnImg = document.querySelector("button img");


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
            noRepeat(newSort.de, newSort.ate, resultados);
        }
    } else {
        // com repetição
        for (let i = 0; i < newSort.qtde; i++) {
            resultados.push(getRandomInt(newSort.de, newSort.ate));
        }
    }

        mostrarResultado(resultados, newSort.qtde);
    };

function mostrarResultado(lista,qtde) {
    console.log(lista);
    info.classList.add("hidden");
    fields.classList.add("hidden");
    repeatCheck.classList.add("hidden");
    btn.style.opacity = 0;
    btnSpan.textContent = "SORTEAR NOVAMENTE";
    btnImg.src = "assets/again.svg";

    const newDiv = document.createElement("div");
    newDiv.classList.add("result-content");

    const span = document.createElement("span");
    span.textContent = "Resultado do sorteio";

    const contentNumber = document.createElement("div");
    contentNumber.classList.add("content-number");

    for (let i = 0; i < qtde; i++) {
        const p = document.createElement("p");
        p.textContent = lista[i];
        contentNumber.appendChild(p);
    }

    newDiv.appendChild(span);
    newDiv.appendChild(contentNumber);
    document.querySelector(".content").appendChild(newDiv);
    btn.style.opacity = 1;
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

