/* =====================================================================
   jogos.js — perguntas e funcionamento dos 6 jogos (página jogos.html)
   ---------------------------------------------------------------------
   Este arquivo tem duas partes:

   PARTE 1 — OS DADOS: a lista de jogos e de perguntas.
             Para ADICIONAR ou CORRIGIR uma pergunta, mexa só aqui.

   PARTE 2 — A LÓGICA: o código que mostra as perguntas, confere a
             resposta, calcula o XP e salva o progresso.

   Como é uma pergunta? Usamos a função "pergunta(...)" com 6 informações:
     pergunta( nível, enunciado, frase, [alternativas], posição da certa, explicação )
   - nível: 1 = fácil (10 XP), 2 = médio (15 XP), 3 = difícil (20 XP)
   - posição da certa: começa em 0 (0 = primeira alternativa, 1 = segunda...)
     O jogo EMBARALHA as alternativas a cada partida, então não se preocupe
     com a ordem em que você as escreve.

   Este arquivo usa funções de principal.js (lerArmazenamento e
   salvarArmazenamento). Por isso principal.js é carregado antes.
   ===================================================================== */


/* ---------------------------------------------------------------------
   PARTE 1 — DADOS
   --------------------------------------------------------------------- */

// Função de apoio: devolve um "objeto" com os dados de uma pergunta.
function pergunta(nivel, enunciado, frase, opcoes, correta, explicacao) {
  return {
    nivel: nivel,
    enunciado: enunciado,
    frase: frase,
    opcoes: opcoes,
    correta: correta,
    explicacao: explicacao
  };
}

var NOMES_NIVEL = { 1: "Fácil", 2: "Médio", 3: "Difícil" };
var XP_NIVEL = { 1: 10, 2: 15, 3: 20 };

var JOGOS = [

  /* ===== JOGO 1 — CAÇADORES DE ERROS ===== */
  {
    id: "cacadores",
    nome: "Caçadores de Erros",
    icone: "🔍",
    descricao: "Descubra qual é o problema de construção da frase e escolha a melhor correção.",
    estudo: { texto: "Revise o Bloco 1 — Falhas de estrutura sintática", href: "estrutura-sintatica.html" },
    perguntas: [
      pergunta(1, "Qual é o problema de construção desta frase?",
        "A sociedade brasileira enfrenta diversos problemas, a desigualdade social é um deles.",
        ["Truncamento", "Justaposição", "Duplicação de palavras", "Erro de acentuação"], 1,
        "Há duas orações completas (“A sociedade brasileira enfrenta diversos problemas” e “a desigualdade social é um deles”) ligadas apenas por uma vírgula, sem conectivo. Isso é justaposição."),
      pergunta(1, "Qual correção resolve o problema?",
        "A sociedade brasileira enfrenta diversos problemas, a desigualdade social é um deles.",
        ["A sociedade brasileira enfrenta diversos problemas: a desigualdade social é um deles.",
         "A sociedade brasileira enfrenta diversos problemas a desigualdade social é um deles.",
         "A sociedade brasileira enfrenta, diversos problemas, a desigualdade social é um deles.",
         "A sociedade brasileira enfrenta diversos problemas, a desigualdade social."], 0,
        "Os dois-pontos introduzem o exemplo e articulam as duas orações. Sem pontuação, as orações continuam coladas; a vírgula depois do verbo separa o verbo do complemento; e a última opção elimina o verbo da segunda oração."),
      pergunta(1, "Qual é o problema de construção deste trecho?",
        "Muitos jovens abandonam os estudos. Porque precisam ajudar financeiramente a família.",
        ["Truncamento", "Justaposição", "Ausência de verbo", "Excesso de vírgulas"], 0,
        "“Porque precisam ajudar financeiramente a família” é uma oração subordinada: depende da oração anterior. Ao isolá-la com um ponto final, ocorre truncamento."),
      pergunta(1, "Qual correção resolve o problema?",
        "Muitos jovens abandonam os estudos. Porque precisam ajudar financeiramente a família.",
        ["Muitos jovens abandonam os estudos porque precisam ajudar financeiramente a família.",
         "Muitos jovens abandonam os estudos, Porque precisam ajudar financeiramente a família.",
         "Muitos jovens abandonam os estudos. Porque, precisam ajudar financeiramente a família.",
         "Muitos jovens abandonam os estudos; Porque precisam ajudar financeiramente a família."], 0,
        "A correção é unir a subordinada à principal, sem ponto. As outras opções mantêm o corte ou usam maiúscula no meio da frase."),
      pergunta(2, "Qual é o problema de construção desta frase?",
        "Os brasileiros eles enfrentam dificuldades para acessar a saúde pública.",
        ["Truncamento", "Justaposição", "Duplicação do sujeito", "Problema de crase"], 2,
        "“Os brasileiros” e “eles” indicam o mesmo sujeito. Um deles sobra: é duplicação de elementos."),
      pergunta(2, "Qual correção resolve o problema?",
        "Os brasileiros eles enfrentam dificuldades para acessar a saúde pública.",
        ["Os brasileiros enfrentam dificuldades para acessar a saúde pública.",
         "Os brasileiros, eles enfrentam dificuldades para acessar a saúde pública.",
         "Os brasileiros enfrentam dificuldades para acessar, a saúde pública.",
         "Os brasileiros eles enfrentam dificuldades para acessar à saúde pública."], 0,
        "Basta retirar o pronome repetido. A vírgula não resolve a duplicação, e a vírgula antes do complemento cria outro problema."),
      pergunta(3, "Qual é o problema de construção desta frase?",
        "É fundamental o Estado invista em políticas de combate à fome.",
        ["Truncamento", "Justaposição", "Ausência da conjunção “que”", "Excesso de palavras"], 2,
        "A oração “o Estado invista...” precisa ser ligada a “É fundamental” pela conjunção “que”. Sem ela, falta um elemento necessário para a construção da frase."),
      pergunta(3, "Qual correção resolve o problema?",
        "É fundamental o Estado invista em políticas de combate à fome.",
        ["É fundamental que o Estado invista em políticas de combate à fome.",
         "É fundamental, o Estado invista em políticas de combate à fome.",
         "É fundamental o Estado investe em políticas de combate à fome.",
         "É fundamental o Estado que invista em políticas de combate à fome."], 0,
        "A conjunção “que” vem logo depois de “É fundamental”. Trocar o verbo ou colocar vírgula não resolve a falta da conjunção, e “que” depois de “Estado” está fora de lugar.")
    ]
  },

  /* ===== JOGO 2 — CORRIJA A FRASE ===== */
  {
    id: "corrija",
    nome: "Corrija a Frase",
    icone: "✏️",
    descricao: "Cada frase tem um erro. Escolha a versão corrigida e leia a explicação.",
    estudo: { texto: "Revise Desvios gramaticais", href: "gramatica.html" },
    perguntas: [
      pergunta(1, "Qual alternativa corrige a frase?",
        "Os alunos chegaram no limite do cansaço.",
        ["Os alunos chegaram ao limite do cansaço.",
         "Os alunos chegaram à limite do cansaço.",
         "Os alunos chegaram em o limite do cansaço.",
         "Os alunos chegaram do limite do cansaço."], 0,
        "O verbo “chegar” pede a preposição “a”: a + o (limite) = “ao”. A forma “no limite” é comum na fala, mas, na escrita formal, usa-se “ao limite”. Não há crase porque “limite” é masculino."),
      pergunta(1, "Qual alternativa corrige a frase?",
        "Existe muitos problemas na educação brasileira.",
        ["Existem muitos problemas na educação brasileira.",
         "Existe muito problemas na educação brasileira.",
         "Existem muito problemas na educação brasileira.",
         "Existe muitos problemas, na educação brasileira."], 0,
        "O verbo “existir” concorda com o sujeito: “muitos problemas” (plural) → “existem”. Já o “muitos” precisa ficar no plural para concordar com “problemas”."),
      pergunta(2, "Qual alternativa corrige a frase?",
        "O governo deve garantir acesso a educação de qualidade.",
        ["O governo deve garantir acesso à educação de qualidade.",
         "O governo deve garantir acesso há educação de qualidade.",
         "O governo deve garantir acesso às educação de qualidade.",
         "O governo deve garantir acesso a educação de qualidade."], 0,
        "“Acesso” pede a preposição “a”, e “educação” aceita o artigo “a”. Preposição + artigo = crase: “à educação”. “Há” (do verbo haver) não cabe aqui."),
      pergunta(2, "Qual alternativa corrige a frase?",
        "Os estudantes que revisam o texto, percebem os próprios erros.",
        ["Os estudantes que revisam o texto percebem os próprios erros.",
         "Os estudantes, que revisam o texto percebem os próprios erros.",
         "Os estudantes que revisam o texto, percebem os próprios erros.",
         "Os estudantes que revisam, o texto percebem os próprios erros."], 0,
        "“Os estudantes que revisam o texto” é o sujeito completo. Não se separa o sujeito do verbo por vírgula."),
      pergunta(3, "Qual alternativa corrige a frase?",
        "Os pais devem preferir o diálogo do que a punição.",
        ["Os pais devem preferir o diálogo à punição.",
         "Os pais devem preferir o diálogo que a punição.",
         "Os pais devem preferir mais o diálogo à punição.",
         "Os pais devem preferir o diálogo a punição."], 0,
        "O verbo “preferir” usa a estrutura “preferir A a B”. Como “punição” aceita artigo, a + a = “à”. Não se usa “do que” nem “mais” com “preferir”, pois o verbo já indica preferência."),
      pergunta(3, "Qual alternativa corrige a frase?",
        "É necessário ampliar o acesso à saúde e a melhoria do atendimento nos hospitais.",
        ["É necessário ampliar o acesso à saúde e melhorar o atendimento nos hospitais.",
         "É necessário ampliar o acesso à saúde e melhorando o atendimento nos hospitais.",
         "É necessário ampliar o acesso à saúde e a melhoria do atendimento nos hospitais.",
         "É necessário ampliando o acesso à saúde e melhorar o atendimento nos hospitais."], 0,
        "É um caso de paralelismo: “ampliar” e “melhorar” são ações de mesma natureza (infinitivos) e devem ter a mesma estrutura. Misturar infinitivo, substantivo e gerúndio quebra a simetria.")
    ]
  },

  /* ===== JOGO 3 — FORMAL OU INFORMAL? ===== */
  {
    id: "formal",
    nome: "Formal ou Informal?",
    icone: "🎩",
    descricao: "Identifique qual expressão é a mais adequada ao registro formal da redação.",
    estudo: { texto: "Revise a Escolha do registro formal", href: "registro-formal.html" },
    perguntas: [
      pergunta(1, "Qual frase é mais adequada ao registro formal?", "",
        ["As medidas são necessárias para reduzir a violência.",
         "As medidas são necessárias pra reduzir a violência.",
         "As medidas são necessárias p/ reduzir a violência."], 0,
        "“Pra” é uma redução da fala e “p/” é uma abreviatura informal. Na redação, escreva a palavra completa: “para”."),
      pergunta(1, "Qual frase é mais adequada ao registro formal?", "",
        ["As pessoas estão desinformadas sobre o tema.",
         "As pessoas tão desinformadas sobre o tema.",
         "As pessoas tá desinformadas sobre o tema."], 0,
        "“Tão” (no lugar de “estão”) e “tá” são reduções do verbo estar típicas da oralidade. A forma adequada é “estão”."),
      pergunta(1, "Qual frase é mais adequada ao registro formal?", "",
        ["Muitos jovens passam grande parte do dia conectados à internet.",
         "Os jovens estão ligados na internet o tempo todo, tipo viciados.",
         "A galera jovem vive grudada na internet."], 0,
        "“Tipo” e “galera” são gírias ou marcas de oralidade. A primeira opção usa vocabulário neutro e formal."),
      pergunta(2, "Qual frase é mais precisa e menos repetitiva?", "",
        ["Atualmente, a desigualdade de renda ainda é elevada no Brasil.",
         "Hoje em dia, a desigualdade é grande.",
         "Nos dias de hoje, existe desigualdade."], 0,
        "“Hoje em dia” e “nos dias de hoje” não são erros gramaticais, mas são clichês muito repetidos e vagos. A primeira opção também especifica de que tipo de desigualdade se fala."),
      pergunta(2, "Qual frase expressa a ideia com mais formalidade e precisão?", "",
        ["Os governantes negligenciam a educação básica.",
         "Os governantes deixam a educação básica de lado.",
         "Os governantes botam a educação básica de escanteio."], 0,
        "“Negligenciar” é mais preciso. “Deixar de lado” é correto, mas coloquial e vago; “botar de escanteio” é expressão popular, pouco adequada a um texto formal."),
      pergunta(2, "Qual frase NÃO apresenta marca de oralidade?", "",
        ["Vivemos numa sociedade marcada pela desigualdade.",
         "Eu num acho que a educação vai mudar sozinha.",
         "A situação tá preocupante."], 0,
        "“Numa” (em + uma) é uma contração prevista pela norma-padrão, portanto está correta. Já “num” no lugar de “não” e “tá” no lugar de “está” são formas orais."),
      pergunta(3, "Qual frase evita o uso inadequado de “o mesmo/a mesma” como pronome?", "",
        ["A prefeitura contratou a empresa e pagou-lhe em dia.",
         "A prefeitura contratou a empresa e pagou à mesma em dia."], 0,
        "Muitas gramáticas normativas condenam “o mesmo/a mesma” como substituto de um pronome pessoal. Na primeira opção, o pronome “lhe” retoma “a empresa”. A palavra “mesmo” é correta quando tem sentido próprio, como em “o mesmo problema”.")
    ]
  },

  /* ===== JOGO 4 — COMPLETE A LACUNA ===== */
  {
    id: "lacuna",
    nome: "Complete a Lacuna",
    icone: "🧩",
    descricao: "Escolha a palavra, a preposição ou a forma verbal que completa a frase.",
    estudo: { texto: "Revise Concordância, Regência e Crase", href: "gramatica.html" },
    perguntas: [
      pergunta(1, "Escolha a opção que completa a frase corretamente.",
        "As desigualdades sociais _____ o desenvolvimento do país.",
        ["prejudicam", "prejudica", "prejudicamos", "prejudicar"], 0,
        "O sujeito “As desigualdades sociais” está no plural, então o verbo também vai para o plural: “prejudicam”."),
      pergunta(1, "Escolha a opção que completa a frase corretamente.",
        "Na escola, _____ muitos alunos sem acesso à internet.",
        ["há", "haviam", "têm", "tem"], 0,
        "Com sentido de “existir”, o verbo haver é impessoal e fica no singular. Como o tempo é o presente: “há”. “Tem” e “têm” no sentido de existir são formas da fala."),
      pergunta(1, "Escolha a opção que completa a frase corretamente.",
        "Os estudantes _____ direito à educação.",
        ["têm", "tem", "tém", "teem"], 0,
        "O sujeito está no plural (“Os estudantes”). Na terceira pessoa do plural, o verbo ter recebe acento circunflexo: “têm”. O singular, “tem”, não leva acento."),
      pergunta(2, "Escolha a opção que completa a frase corretamente.",
        "Todos os cidadãos devem obedecer _____ leis do país.",
        ["às", "as", "à", "ás"], 0,
        "O verbo “obedecer” exige a preposição “a”. Com o artigo “as” (as leis), ocorre a fusão: a + as = “às”."),
      pergunta(2, "Escolha o conectivo que completa a frase corretamente.",
        "O Brasil investe pouco em educação; _____, os índices de aprendizagem permanecem baixos.",
        ["portanto", "entretanto", "contudo", "embora"], 0,
        "A segunda oração expressa uma consequência da primeira, e “portanto” indica conclusão. “Entretanto” e “contudo” indicam oposição; “embora” indica concessão."),
      pergunta(3, "Escolha a palavra que completa a frase corretamente.",
        "A _____ da lei é proteger os direitos dos cidadãos.",
        ["finalidade", "afinidade", "fatalidade", "finitude"], 0,
        "“Finalidade” significa objetivo, propósito. É um caso de escolha vocabular: palavras parecidas, mas de sentidos diferentes (afinidade = semelhança, simpatia)."),
      pergunta(3, "Escolha a opção que completa a frase corretamente.",
        "Os estudantes entregaram o documento _____ diretora da escola.",
        ["à", "a", "há", "as"], 0,
        "“Entregar” pede a preposição “a”, e “diretora” aceita o artigo “a”: a + a = “à”. Dica: troque por um masculino (“ao diretor”). Se aparecer “ao”, use crase.")
    ]
  },

  /* ===== JOGO 5 — PONTUAÇÃO EM AÇÃO ===== */
  {
    id: "pontuacao",
    nome: "Pontuação em Ação",
    icone: "✒️",
    descricao: "Escolha a alternativa corretamente pontuada.",
    estudo: { texto: "Revise a Pontuação", href: "gramatica.html#pontuacao" },
    perguntas: [
      pergunta(1, "Qual alternativa está corretamente pontuada?",
        "Escolas famílias e governo devem combater a evasão.",
        ["Escolas, famílias e governo devem combater a evasão.",
         "Escolas, famílias, e governo, devem combater a evasão.",
         "Escolas famílias, e governo devem combater a evasão.",
         "Escolas, famílias e governo, devem combater a evasão."], 0,
        "Em enumerações, a vírgula separa os itens e, em regra, não se usa antes do “e” final. Além disso, não se pode separar o sujeito do verbo por vírgula."),
      pergunta(1, "Qual alternativa está corretamente pontuada?",
        "O governo federal, deve ampliar o investimento em educação.",
        ["O governo federal deve ampliar o investimento em educação.",
         "O governo federal, deve ampliar o investimento, em educação.",
         "O governo, federal deve ampliar o investimento em educação.",
         "O governo federal, deve ampliar o investimento em educação."], 0,
        "“O governo federal” é o sujeito, e “deve ampliar...” é o predicado. Não se coloca vírgula entre eles."),
      pergunta(2, "Qual alternativa está corretamente pontuada?",
        "O problema da evasão escolar entretanto não foi resolvido.",
        ["O problema da evasão escolar, entretanto, não foi resolvido.",
         "O problema da evasão escolar entretanto, não foi resolvido.",
         "O problema da evasão escolar, entretanto não foi resolvido.",
         "O problema da evasão escolar entretanto não foi resolvido."], 0,
        "Quando o conectivo aparece no meio da oração, ele é isolado por duas vírgulas, uma antes e outra depois."),
      pergunta(2, "Qual alternativa está corretamente pontuada?",
        "A leitura que é um hábito essencial amplia o vocabulário.",
        ["A leitura, que é um hábito essencial, amplia o vocabulário.",
         "A leitura que é um hábito essencial, amplia o vocabulário.",
         "A leitura, que é um hábito essencial amplia o vocabulário.",
         "A leitura que, é um hábito essencial amplia o vocabulário."], 0,
        "“Que é um hábito essencial” é uma explicação intercalada, por isso fica entre duas vírgulas. As outras opções usam só uma vírgula ou a colocam no lugar errado."),
      pergunta(3, "Qual alternativa está corretamente pontuada?",
        "Quando a escola incentiva a leitura os alunos desenvolvem o senso crítico.",
        ["Quando a escola incentiva a leitura, os alunos desenvolvem o senso crítico.",
         "Quando, a escola incentiva a leitura os alunos desenvolvem o senso crítico.",
         "Quando a escola incentiva a leitura. Os alunos desenvolvem o senso crítico.",
         "Quando a escola incentiva a leitura os alunos, desenvolvem o senso crítico."], 0,
        "A oração subordinada adverbial (“Quando a escola incentiva a leitura”) vem antes da principal, então é seguida de vírgula. O ponto final causaria truncamento."),
      pergunta(3, "Qual alternativa está corretamente pontuada?",
        "Machado de Assis um dos maiores escritores brasileiros retratou a sociedade do século XIX.",
        ["Machado de Assis, um dos maiores escritores brasileiros, retratou a sociedade do século XIX.",
         "Machado de Assis, um dos maiores escritores brasileiros retratou a sociedade do século XIX.",
         "Machado de Assis um dos maiores escritores brasileiros, retratou a sociedade do século XIX.",
         "Machado de Assis um dos maiores, escritores brasileiros retratou a sociedade do século XIX."], 0,
        "“Um dos maiores escritores brasileiros” é um aposto (explica “Machado de Assis”) e deve ficar entre duas vírgulas."),
      pergunta(3, "Qual alternativa está corretamente pontuada?",
        "O problema tem duas causas a falta de investimento e a desigualdade social.",
        ["O problema tem duas causas: a falta de investimento e a desigualdade social.",
         "O problema tem duas causas; a falta de investimento e a desigualdade social.",
         "O problema tem, duas causas a falta de investimento e a desigualdade social.",
         "O problema tem duas causas, a falta de investimento, e a desigualdade social."], 0,
        "Os dois-pontos introduzem a enumeração das causas. O ponto e vírgula separa orações ou itens mais longos, e as vírgulas das outras opções separam termos que deveriam ficar unidos.")
    ]
  },

  /* ===== JOGO 6 — DESAFIO DA REVISÃO ===== */
  {
    id: "revisao",
    nome: "Desafio da Revisão",
    icone: "🏆",
    descricao: "Trechos de redação com mais de um problema. Escolha a versão que corrige tudo.",
    estudo: { texto: "Revise as Dicas gerais para a redação", href: "dicas.html" },
    perguntas: [
      pergunta(1, "Qual versão do trecho corrige todos os problemas?",
        "Muitos jovens abandonam a escola. Porque precisam trabalhar. Os jovens eles perdem a oportunidade de estudar.",
        ["Muitos jovens abandonam a escola porque precisam trabalhar. Eles perdem a oportunidade de estudar.",
         "Muitos jovens abandonam a escola porque precisam trabalhar. Os jovens eles perdem a oportunidade de estudar.",
         "Muitos jovens abandonam a escola. Porque precisam trabalhar. Eles perdem a oportunidade de estudar.",
         "Muitos jovens abandonam a escola, porque precisam trabalhar, os jovens perdem a oportunidade de estudar."], 0,
        "Há dois problemas: truncamento (“Porque precisam trabalhar” isolada) e duplicação do sujeito (“Os jovens eles”). Só a primeira opção resolve os dois. A última cria uma justaposição."),
      pergunta(1, "Qual versão do trecho corrige todos os problemas de ortografia?",
        "As entidades beneficiêntes realizam um trabalho importante. Sem excessão, todas merecem apoio.",
        ["As entidades beneficentes realizam um trabalho importante. Sem exceção, todas merecem apoio.",
         "As entidades beneficentes realizam um trabalho importante. Sem excessão, todas merecem apoio.",
         "As entidades beneficiêntes realizam um trabalho importante. Sem exceção, todas merecem apoio.",
         "As entidades beneficentes realizam um trabalho importante. Sem exeção, todas merecem apoio."], 0,
        "As grafias corretas são “beneficentes” (sem “i”) e “exceção” (com “c” e “ç”, de “exceto”)."),
      pergunta(2, "Qual versão do trecho corrige todos os problemas?",
        "A escola deve ensinar os alunos a usar a internet pra pesquisar. Os professores que orientam esse uso, contribuem para a formação crítica.",
        ["A escola deve ensinar os alunos a usar a internet para pesquisar. Os professores que orientam esse uso contribuem para a formação crítica.",
         "A escola deve ensinar os alunos a usar a internet para pesquisar. Os professores que orientam esse uso, contribuem para a formação crítica.",
         "A escola deve ensinar os alunos a usar a internet pra pesquisar. Os professores que orientam esse uso contribuem para a formação crítica.",
         "A escola deve ensinar os alunos a usar a internet para pesquisar. Os professores, que orientam esse uso contribuem para a formação crítica."], 0,
        "Há um problema de registro (“pra” → “para”) e um de pontuação (vírgula entre o sujeito “Os professores que orientam esse uso” e o verbo “contribuem”)."),
      pergunta(2, "Qual versão do trecho corrige todos os problemas?",
        "As políticas públicas devem garantir acesso a saúde. Existe muitos brasileiros sem atendimento adequado.",
        ["As políticas públicas devem garantir acesso à saúde. Existem muitos brasileiros sem atendimento adequado.",
         "As políticas públicas devem garantir acesso à saúde. Existe muitos brasileiros sem atendimento adequado.",
         "As políticas públicas devem garantir acesso a saúde. Existem muitos brasileiros sem atendimento adequado.",
         "As políticas públicas devem garantir acesso há saúde. Existem muitos brasileiros sem atendimento adequado."], 0,
        "Há um caso de crase (“acesso à saúde”) e um de concordância verbal (“Existem muitos brasileiros”)."),
      pergunta(3, "Qual versão do trecho corrige todos os problemas?",
        "O desemprego atinge os jovens, eles têm dificuldade de entrar no mercado de trabalho, tem muita gente sem experiência.",
        ["O desemprego atinge os jovens, que têm dificuldade de entrar no mercado de trabalho, pois muitos não possuem experiência.",
         "O desemprego atinge os jovens, que têm dificuldade de entrar no mercado de trabalho, pois tem muita gente sem experiência.",
         "O desemprego atinge os jovens, eles têm dificuldade de entrar no mercado de trabalho, pois muitos não possuem experiência.",
         "O desemprego atinge os jovens que, têm dificuldade de entrar no mercado de trabalho, pois muitos não possuem experiência."], 0,
        "Há justaposição (orações coladas por vírgulas) e marca de oralidade (“tem muita gente”). A primeira opção articula as orações com “que” e “pois” e usa vocabulário formal."),
      pergunta(3, "Qual versão do trecho corrige todos os problemas?",
        "É necessário ampliar o acesso à cultura e a melhoria dos espaços públicos. Apesar das dificuldades orçamentárias. O poder público deve priorizar a questão.",
        ["É necessário ampliar o acesso à cultura e melhorar os espaços públicos. Apesar das dificuldades orçamentárias, o poder público deve priorizar a questão.",
         "É necessário ampliar o acesso à cultura e melhorar os espaços públicos. Apesar das dificuldades orçamentárias. O poder público deve priorizar a questão.",
         "É necessário ampliar o acesso à cultura e a melhoria dos espaços públicos. Apesar das dificuldades orçamentárias, o poder público deve priorizar a questão.",
         "É necessário ampliar o acesso à cultura e melhorando os espaços públicos. Apesar das dificuldades orçamentárias, o poder público deve priorizar a questão."], 0,
        "Há um problema de paralelismo (“ampliar... e a melhoria” → “ampliar... e melhorar”) e um truncamento (“Apesar das dificuldades orçamentárias.” precisa se ligar à oração seguinte por uma vírgula).")
    ]
  }
];


/* ---------------------------------------------------------------------
   PARTE 2 — LÓGICA DOS JOGOS
   --------------------------------------------------------------------- */

// "estado" guarda o que está acontecendo na partida atual
var estado = null;

// Atalho para buscar um elemento da página pelo id
function elemento(id) {
  return document.getElementById(id);
}

// Embaralha uma lista (sem alterar a original)
function embaralhar(lista) {
  var copia = lista.slice();
  for (var i = copia.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var guardado = copia[i];
    copia[i] = copia[j];
    copia[j] = guardado;
  }
  return copia;
}

// Mostra apenas uma das três telas: "lista", "jogo" ou "resultado"
function mostrarTela(nome) {
  elemento("tela-lista").hidden = (nome !== "lista");
  elemento("area-jogo").hidden = (nome !== "jogo");
  elemento("resultado").hidden = (nome !== "resultado");
}

// XP máximo possível em um jogo (soma de todas as perguntas)
function xpMaximoDoJogo(jogo) {
  var soma = 0;
  for (var i = 0; i < jogo.perguntas.length; i++) {
    soma += XP_NIVEL[jogo.perguntas[i].nivel];
  }
  return soma;
}

// Converte o XP total em um "nível de jogador"
function nomeDoNivel(xp, xpMaximo) {
  var proporcao = xpMaximo === 0 ? 0 : xp / xpMaximo;
  if (proporcao >= 0.85) { return "Craque da C1"; }
  if (proporcao >= 0.6) { return "Especialista"; }
  if (proporcao >= 0.35) { return "Em evolução"; }
  if (proporcao >= 0.1) { return "Aprendiz"; }
  return "Iniciante";
}

// Atualiza o painel de XP e os cartões dos jogos
function atualizarPainel() {
  var resultados = lerArmazenamento("c1_jogos", {});
  var xpTotal = 0;
  var xpMaximo = 0;
  var concluidos = 0;

  for (var i = 0; i < JOGOS.length; i++) {
    xpMaximo += xpMaximoDoJogo(JOGOS[i]);
    var r = resultados[JOGOS[i].id];
    if (r && r.concluido) {
      concluidos++;
      xpTotal += r.xp;
    }
  }

  elemento("xp-total").textContent = xpTotal + " / " + xpMaximo;
  elemento("nivel-jogador").textContent = nomeDoNivel(xpTotal, xpMaximo);
  elemento("jogos-concluidos").textContent = concluidos + " de " + JOGOS.length;
}

// Desenha os cartões da lista de jogos
function desenharLista() {
  var area = elemento("lista-jogos");
  var resultados = lerArmazenamento("c1_jogos", {});
  area.innerHTML = "";

  for (var i = 0; i < JOGOS.length; i++) {
    criarCartao(area, JOGOS[i], resultados[JOGOS[i].id]);
  }
}

// Cria um cartão (separado em função para o botão "lembrar" o jogo certo)
function criarCartao(area, jogo, resultado) {
  var cartao = document.createElement("article");

  var titulo = document.createElement("h3");
  titulo.textContent = jogo.icone + " " + jogo.nome;

  var descricao = document.createElement("p");
  descricao.textContent = jogo.descricao;

  var situacao = document.createElement("p");
  if (resultado && resultado.concluido) {
    situacao.textContent = "Melhor resultado: " + resultado.acertos + " de " + resultado.total +
      " acertos (" + resultado.xp + " XP)";
  } else {
    situacao.textContent = jogo.perguntas.length + " perguntas · ainda não jogado";
  }

  var botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = (resultado && resultado.concluido) ? "Jogar novamente" : "Jogar";
  botao.addEventListener("click", function () {
    iniciarJogo(jogo.id);
  });

  cartao.appendChild(titulo);
  cartao.appendChild(descricao);
  cartao.appendChild(situacao);
  cartao.appendChild(botao);
  area.appendChild(cartao);
}

// Procura um jogo pelo id
function acharJogo(id) {
  for (var i = 0; i < JOGOS.length; i++) {
    if (JOGOS[i].id === id) { return JOGOS[i]; }
  }
  return null;
}

// Começa uma partida
function iniciarJogo(id) {
  var jogo = acharJogo(id);
  if (!jogo) { return; }

  // Prepara as perguntas: embaralha as alternativas e guarda onde ficou a certa
  var preparadas = [];
  for (var i = 0; i < jogo.perguntas.length; i++) {
    var p = jogo.perguntas[i];
    var ordem = embaralhar(p.opcoes.map(function (_, indice) { return indice; }));
    var opcoes = [];
    for (var k = 0; k < ordem.length; k++) {
      opcoes.push(p.opcoes[ordem[k]]);
    }
    preparadas.push({
      nivel: p.nivel,
      enunciado: p.enunciado,
      frase: p.frase,
      opcoes: opcoes,
      correta: ordem.indexOf(p.correta),
      explicacao: p.explicacao
    });
  }

  // As perguntas continuam na ordem de dificuldade (fácil → difícil)
  estado = {
    jogo: jogo,
    perguntas: preparadas,
    indice: 0,
    acertos: 0,
    xp: 0,
    respondida: false
  };

  mostrarTela("jogo");
  mostrarPergunta();
}

// Mostra a pergunta atual
function mostrarPergunta() {
  var p = estado.perguntas[estado.indice];
  var total = estado.perguntas.length;

  estado.respondida = false;

  elemento("nome-jogo").textContent = estado.jogo.icone + " " + estado.jogo.nome;
  elemento("contador-jogo").textContent = "Pergunta " + (estado.indice + 1) + " de " + total +
    " · Nível " + NOMES_NIVEL[p.nivel];
  elemento("xp-jogo").textContent = "XP: " + estado.xp;

  var barra = elemento("progresso-jogo");
  barra.max = total;
  barra.value = estado.indice;

  elemento("enunciado-jogo").textContent = p.enunciado;

  var frase = elemento("frase-jogo");
  frase.textContent = p.frase;
  frase.hidden = (p.frase === "");

  var areaOpcoes = elemento("opcoes-jogo");
  areaOpcoes.innerHTML = "";
  for (var i = 0; i < p.opcoes.length; i++) {
    criarOpcao(areaOpcoes, p.opcoes[i], i);
  }

  elemento("feedback-jogo").innerHTML = "";
  elemento("botao-proxima").hidden = true;

  elemento("enunciado-jogo").focus();
}

// Cria um botão de alternativa
function criarOpcao(area, texto, posicao) {
  var botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = texto;
  botao.addEventListener("click", function () {
    responder(posicao);
  });
  area.appendChild(botao);
}

// Confere a resposta escolhida
function responder(escolhida) {
  if (estado.respondida) { return; }
  estado.respondida = true;

  var p = estado.perguntas[estado.indice];
  var botoes = elemento("opcoes-jogo").querySelectorAll("button");
  var acertou = (escolhida === p.correta);

  // Trava os botões e pinta a certa (verde) e a errada escolhida (vermelha)
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].disabled = true;
    if (i === p.correta) {
      botoes[i].className = "opcao-certa";
    } else if (i === escolhida) {
      botoes[i].className = "opcao-errada";
    }
  }

  var ganho = 0;
  if (acertou) {
    ganho = XP_NIVEL[p.nivel];
    estado.acertos++;
    estado.xp += ganho;
  }

  // Monta o feedback: resultado + explicação
  var feedback = elemento("feedback-jogo");
  feedback.innerHTML = "";

  var resultado = document.createElement("p");
  var forte = document.createElement("strong");
  forte.textContent = acertou ? "✓ Correto! +" + ganho + " XP" : "✗ Não foi dessa vez.";
  resultado.appendChild(forte);
  feedback.appendChild(resultado);

  if (!acertou) {
    var indicacao = document.createElement("p");
    indicacao.textContent = "Resposta correta: " + p.opcoes[p.correta];
    feedback.appendChild(indicacao);
  }

  var explicacao = document.createElement("aside");
  var textoExplicacao = document.createElement("p");
  textoExplicacao.textContent = "Por quê? " + p.explicacao;
  explicacao.appendChild(textoExplicacao);
  feedback.appendChild(explicacao);

  elemento("xp-jogo").textContent = "XP: " + estado.xp;
  elemento("progresso-jogo").value = estado.indice + 1;

  var proxima = elemento("botao-proxima");
  proxima.textContent = (estado.indice === estado.perguntas.length - 1) ? "Ver resultado" : "Próxima pergunta →";
  proxima.hidden = false;
  proxima.focus();
}

// Vai para a próxima pergunta (ou para o resultado, se acabou)
function proximaPergunta() {
  if (estado.indice < estado.perguntas.length - 1) {
    estado.indice++;
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

// Mostra a tela de resultado e salva o progresso
function mostrarResultado() {
  var total = estado.perguntas.length;
  var porcentagem = Math.round((estado.acertos / total) * 100);

  // Salva apenas se for a primeira vez ou se o XP for maior que o anterior
  var resultados = lerArmazenamento("c1_jogos", {});
  var anterior = resultados[estado.jogo.id];
  if (!anterior || !anterior.concluido || estado.xp >= anterior.xp) {
    resultados[estado.jogo.id] = {
      concluido: true,
      xp: estado.xp,
      acertos: estado.acertos,
      total: total
    };
    salvarArmazenamento("c1_jogos", resultados);
  }

  var titulo = elemento("titulo-resultado");
  titulo.textContent = "Resultado: " + estado.jogo.nome;
  titulo.setAttribute("tabindex", "-1");

  var mensagem;
  if (porcentagem >= 80) {
    mensagem = "Excelente! Você domina bem esse conteúdo.";
  } else if (porcentagem >= 50) {
    mensagem = "Bom trabalho! Releia as explicações das questões que errou e jogue novamente.";
  } else {
    mensagem = "Continue praticando! Revise o conteúdo e tente de novo: você vai melhorar.";
  }

  elemento("texto-resultado").textContent = "Você acertou " + estado.acertos + " de " + total +
    " perguntas (" + porcentagem + "%) e ganhou " + estado.xp + " XP. " + mensagem;

  // Link para o conteúdo de estudo relacionado ao jogo
  var detalhe = elemento("detalhe-resultado");
  detalhe.innerHTML = "";
  var link = document.createElement("a");
  link.href = estado.jogo.estudo.href;
  link.textContent = estado.jogo.estudo.texto + " →";
  detalhe.appendChild(link);

  atualizarPainel();
  desenharLista();
  mostrarTela("resultado");
  titulo.focus();
}

// Volta para a lista de jogos
function voltarParaLista() {
  estado = null;
  atualizarPainel();
  desenharLista();
  mostrarTela("lista");
}


/* ---------------------------------------------------------------------
   INÍCIO: liga os botões fixos da página e desenha a lista
   --------------------------------------------------------------------- */
elemento("botao-proxima").addEventListener("click", proximaPergunta);
elemento("botao-sair").addEventListener("click", voltarParaLista);
elemento("botao-voltar").addEventListener("click", voltarParaLista);
elemento("botao-repetir").addEventListener("click", function () {
  if (estado) { iniciarJogo(estado.jogo.id); }
});

atualizarPainel();
desenharLista();
mostrarTela("lista");
