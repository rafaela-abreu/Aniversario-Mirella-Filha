# Ajustes do convite da Mirella — concluídos

- [x] Toda a área do mapa, inclusive a legenda, abre diretamente o local configurado no Google Maps do visitante. Link HTTPS compatível com aplicativo/celular e navegador, acesso por teclado, aviso de endereço provisório e atualizações de local vindas do painel preservados.
- [x] Mostrar no máximo três cartinhas por vez, com “Ver próximas cartinhas”, retorno às anteriores e às primeiras, indicação da quantidade e visual organizado no celular e no computador. Não acumular cartinhas na página nem apagar mensagens.
- [x] Priorizar na primeira seleção cartinhas mais curtas com expressões de carinho, usando um critério simples e transparente, não uma avaliação de valor pessoal. Mensagens longas têm prévia compacta e opção de leitura completa, sem perder texto.
- [x] Preservar formulário de envio, atualizações automáticas, estados de carregamento/erro/vazio, lista privada de presenças e área dos responsáveis. Validação somente com respostas fictícias, sem enviar cartinhas ou alterar dados reais.
- [x] Balão acima da cabeça da Mirella com “Me leve para brincar” e “Clique aqui ou me arraste!”, também clicável, sem interromper o arraste nem o acesso por teclado.
- [x] Segurar uma área vazia por 700 ms ou dar três toques rápidos pausa e retoma a música. Sem avisos nem novos botões de áudio. Pausa respeitada ao rolar, brincar e recarregar; formulário, links e arraste não acionam o gesto.
- [x] Remover a barrinha inferior com abraços e controle de áudio da ursinha, preservando a Mirella interativa.

## Evidência

Testes passaram em Chromium nas resoluções 390 × 844 e 1440 × 1000, incluindo cliques reais no centro do mapa e na legenda, balão dentro da tela, navegação/expansão das cartinhas, toque real/pressionar, exclusão do formulário e da rolagem, ausência de barrinha e de novos avisos de música. Sem erros JavaScript nem rolagem horizontal. Testes unitários passaram para 0, 1, 2, 3, 4, 6, 7 e 20 cartinhas, preservando todas as mensagens. Sintaxe dos módulos e `git diff --check` aprovados.
