/* =====================================================================
   principal.js — JavaScript usado em TODAS as páginas
   ---------------------------------------------------------------------
   Faz quatro coisas simples:
   1. Funções de apoio para guardar dados no navegador (localStorage)
   2. Abre e fecha o menu no celular
   3. Checklist da página "Dicas" (lembra o que foi marcado)
   4. Barra de progresso dos jogos na página inicial

   Importante: na página jogos.html este arquivo precisa ser carregado
   ANTES de jogos.js, porque jogos.js usa as funções daqui.
   ===================================================================== */


/* ---------- 1. FUNÇÕES DE APOIO ---------- */

// Lê um valor guardado no navegador. Se não existir (ou se o navegador
// bloquear o armazenamento), devolve o valor "padrao".
function lerArmazenamento(chave, padrao) {
  try {
    var texto = localStorage.getItem(chave);
    if (texto === null) {
      return padrao;
    }
    return JSON.parse(texto);
  } catch (erro) {
    return padrao;
  }
}

// Guarda um valor no navegador. O try/catch evita que a página "quebre"
// caso o navegador não permita salvar (modo anônimo, por exemplo).
function salvarArmazenamento(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (erro) {
    // Sem permissão para salvar: o site continua funcionando normalmente.
  }
}


/* ---------- 2. MENU NO CELULAR ---------- */
var botaoMenu = document.querySelector("header button");

if (botaoMenu) {
  botaoMenu.addEventListener("click", function () {
    // Se o menu está aberto ("true"), fechamos; se está fechado, abrimos.
    var estaAberto = botaoMenu.getAttribute("aria-expanded") === "true";
    botaoMenu.setAttribute("aria-expanded", estaAberto ? "false" : "true");
  });
}


/* ---------- 3. CHECKLIST DA PÁGINA "DICAS" ---------- */
var areaChecklist = document.querySelector("#checklist");

if (areaChecklist) {
  var caixas = areaChecklist.querySelectorAll("input[type='checkbox']");
  var barra = areaChecklist.querySelector("progress");
  var textoBarra = areaChecklist.querySelector("#texto-checklist");
  var botaoLimpar = areaChecklist.querySelector("#limpar-checklist");

  // Recupera as marcações salvas (uma lista com os números das caixas marcadas)
  var marcadas = lerArmazenamento("c1_checklist", []);

  // Atualiza a barra de progresso e a frase embaixo dela
  function atualizarChecklist() {
    var total = caixas.length;
    var feitas = 0;
    var lista = [];

    for (var i = 0; i < caixas.length; i++) {
      if (caixas[i].checked) {
        feitas++;
        lista.push(i);
      }
    }

    barra.max = total;
    barra.value = feitas;
    textoBarra.textContent = feitas + " de " + total + " itens revisados";

    if (feitas === total) {
      textoBarra.textContent += " — redação pronta para entregar! 🎉";
    }

    salvarArmazenamento("c1_checklist", lista);
  }

  // Marca as caixas que estavam salvas e fica "ouvindo" os cliques
  for (var i = 0; i < caixas.length; i++) {
    if (marcadas.indexOf(i) !== -1) {
      caixas[i].checked = true;
    }
    caixas[i].addEventListener("change", atualizarChecklist);
  }

  botaoLimpar.addEventListener("click", function () {
    for (var j = 0; j < caixas.length; j++) {
      caixas[j].checked = false;
    }
    atualizarChecklist();
  });

  atualizarChecklist();
}


/* ---------- 4. PROGRESSO DOS JOGOS NA PÁGINA INICIAL ---------- */
var barraGeral = document.querySelector("#progresso-geral");

if (barraGeral) {
  // "c1_jogos" é gravado por jogos.js; guarda o resultado de cada jogo
  var resultados = lerArmazenamento("c1_jogos", {});
  var concluidos = 0;

  for (var chave in resultados) {
    if (resultados[chave] && resultados[chave].concluido) {
      concluidos++;
    }
  }

  barraGeral.value = concluidos;

  var textoGeral = document.querySelector("#texto-progresso");
  if (textoGeral) {
    textoGeral.textContent =
      concluidos === 0
        ? "Você ainda não concluiu nenhum jogo. Que tal começar agora?"
        : concluidos + " de 6 jogos concluídos.";
  }
}
