
const perguntas = [
    {
        pergunta: "Qual é a capital do Brasil?",
        alternativas: ["São Paulo", "Brasília", "Salvador", "Rio de Janeiro"],
        correta: 1
    },
    {
        pergunta: "Qual planeta é conhecido como Planeta Vermelho?",
        alternativas: ["Vênus", "Júpiter", "Marte", "Saturno"],
        correta: 2
    },
    {
        pergunta: "Quanto é 8 × 7?",
        alternativas: ["54", "56", "48", "64"],
        correta: 1
    },
    {
        pergunta: "Qual é o maior oceano do planeta?",
        alternativas: ["Atlântico", "Índico", "Ártico", "Pacífico"],
        correta: 3
    },
    {
        pergunta: "Qual linguagem estrutura páginas da web?",
        alternativas: ["HTML", "SQL", "Python", "Java"],
        correta: 0
    },
    {
        pergunta: "Qual órgão bombeia o sangue pelo corpo?",
        alternativas: ["Pulmão", "Cérebro", "Coração", "Estômago"],
        correta: 2
    },
    {
        pergunta: "Quantos lados tem um hexágono?",
        alternativas: ["Cinco", "Seis", "Sete", "Oito"],
        correta: 1
    },
    {
        pergunta: "Qual é o resultado de 100 ÷ 4?",
        alternativas: ["20", "25", "30", "40"],
        correta: 1
    },
    {
        pergunta: "Qual destes animais é um mamífero?",
        alternativas: ["Tubarão", "Sapo", "Golfinho", "Tartaruga"],
        correta: 2
    },
    {
        pergunta: "Qual propriedade do CSS permite criar layouts flexíveis?",
        alternativas: ["Flexbox", "Console", "Prompt", "Alert"],
        correta: 0
    }
];

const form = document.getElementById("form-quiz");
const perguntaEl = document.getElementById("pergunta");
const alternativasEl = document.getElementById("alternativas");
const progressoEl = document.getElementById("progresso");
const pontuacaoEl = document.getElementById("pontuacao");
const acertosEl = document.getElementById("acertos");
const feedbackEl = document.getElementById("feedback");
const btnResponder = document.getElementById("btn-responder");
const btnProximo = document.getElementById("btn-proximo");
const resultadoEl = document.getElementById("resultado");
const preenchimento = document.getElementById("preenchimento");
const barra = document.getElementById("barra");

let indiceAtual = 0;
let pontuacao = 0;
let acertos = 0;
let respondida = false;

function mostrarPergunta() {
    const atual = perguntas[indiceAtual];

    respondida = false;
    perguntaEl.textContent = atual.pergunta;
    progressoEl.textContent =
        `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;

    preenchimento.style.width =
        `${(indiceAtual / perguntas.length) * 100}%`;

    barra.setAttribute("aria-valuenow", indiceAtual);

    alternativasEl.replaceChildren();
    feedbackEl.textContent = "";
    btnResponder.hidden = false;
    btnProximo.hidden = true;
    btnResponder.disabled = false;

    atual.alternativas.forEach((alternativa, indice) => {
        const label = document.createElement("label");
        label.className = "alternativa";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "resposta";
        radio.value = indice;
        radio.required = true;

        const texto = document.createElement("span");
        texto.textContent = alternativa;

        label.append(radio, texto);
        alternativasEl.appendChild(label);
    });
}

form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (respondida) return;

    const selecionada = form.querySelector(
        'input[name="resposta"]:checked'
    );

    if (!selecionada) {
        feedbackEl.textContent = "Selecione uma alternativa antes de responder.";
        return;
    }

    respondida = true;

    const resposta = Number(selecionada.value);
    const correta = perguntas[indiceAtual].correta;
    const radios = form.querySelectorAll('input[name="resposta"]');

    radios.forEach((radio) => {
        radio.disabled = true;
    });

    if (resposta === correta) {
        pontuacao += 10;
        acertos++;
        feedbackEl.textContent = "Parabéns! Você acertou!";
    } else {
        feedbackEl.textContent =
            `Resposta incorreta. A resposta certa é: ${
                perguntas[indiceAtual].alternativas[correta]
            }.`;
    }

    pontuacaoEl.textContent = pontuacao;
    acertosEl.textContent = acertos;

    preenchimento.style.width =
        `${((indiceAtual + 1) / perguntas.length) * 100}%`;

    barra.setAttribute("aria-valuenow", indiceAtual + 1);

    btnResponder.hidden = true;
    btnProximo.hidden = false;

    btnProximo.textContent =
        indiceAtual === perguntas.length - 1
            ? "Ver resultado"
            : "Próxima pergunta";
});

btnProximo.addEventListener("click", function () {
    if (!respondida) return;

    indiceAtual++;

    if (indiceAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarQuiz();
    }
});

function finalizarQuiz() {
    form.hidden = true;
    resultadoEl.hidden = false;
    progressoEl.textContent = "Quiz concluído!";
    preenchimento.style.width = "100%";
    barra.setAttribute("aria-valuenow", perguntas.length);

    document.getElementById("mensagem-final").textContent =
        acertos === perguntas.length
            ? "Excelente! Você acertou todas as perguntas!"
            : acertos >= 7
                ? "Muito bem! Você teve um ótimo desempenho!"
                : "Continue praticando para melhorar sua pontuação!";

    document.getElementById("resultado-final").textContent =
        `Você acertou ${acertos} de ${perguntas.length} perguntas e fez ${pontuacao} de 100 pontos.`;
}

document.getElementById("btn-reiniciar").addEventListener("click", function () {
    indiceAtual = 0;
    pontuacao = 0;
    acertos = 0;

    pontuacaoEl.textContent = "0";
    acertosEl.textContent = "0";

    resultadoEl.hidden = true;
    form.hidden = false;

    mostrarPergunta();
});

mostrarPergunta();
