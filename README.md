# Aniversário Mirella Rebecca — 5 anos

Convite público: https://rafaela-abreu.github.io/Aniversario-Mirella-Filha/

## Funções

- Cartinhas salvas em banco de dados e exibidas publicamente no mural, com nome e mensagem. O mural se atualiza após o envio e a cada 20 segundos enquanto o site está aberto.
- Confirmação de presença salva na lista privada dos responsáveis, com opção de avisar a mamãe por WhatsApp. Nenhuma lista de convidados é pública.
- Área dos responsáveis: https://mirella5-kun5e5rs.manus.space/familia — exige a conta autorizada da dona do convite.
- Data, horário e local vêm do servidor e podem ser editados no painel.

## Visual e mídia

Tema lilás e branco, fonte Fredoka arredondada, cartões arredondados, legenda com contraste melhorado e barra superior removida. Fundo sem cachorro por reenquadramento, loop contínuo e imagem de segurança. Vídeo principal da foto original com movimento de câmera, sem recriação do rosto. Música enviada pela família, ursinha arrastável com risadinha em volume moderado e galeria inclinada de família em loop mais ágil.

## Hospedagem

O frontend e as mídias ficam no GitHub Pages. O banco e as APIs ficam no servidor publicado https://mirella5-kun5e5rs.manus.space, com CORS limitado à origem https://rafaela-abreu.github.io. Os arquivos públicos não contêm credenciais nem listas de convidados.

## Tipografia legível

A fonte aplicada ao convite e às cartinhas é Fredoka variável, hospedada junto com o site. Os títulos usam peso 650; mensagens das cartinhas usam peso 600, 20px, preto e entrelinha 1,65, sem cursiva fina. Títulos e chamadas começam com maiúscula em vez de ficar inteiramente em caixa alta.

Referências verificadas para a escolha: [Google Fonts — Fredoka](https://fonts.google.com/specimen/Fredoka), [Figma — Fredoka](https://www.figma.com/fonts/fredoka/) e [Pimp my Type — legibilidade e alternativas à Quicksand](https://pimpmytype.com/quicksand-alternatives/). Fredoka foi escolhida pelas formas arredondadas e encorpadas, verificadas em tela de celular e computador. A licença OFL está em fonts/Fredoka-OFL.txt.

## Ajustes pontuais com design original preservado

Base visual bf934f4: arquivos originais index.css, presence.css e typography.css não alterados. Mapa e legenda são um único link para Google Maps. Cartinhas reais da mamãe e do papai primeiro, Ver mais com carregamento das demais; moderação preservada. Ursinha mostra Me leva para passear / Clique em mim ou arraste só quando parada; no arrasto a mensagem antiga permanece. Toque único simples alterna música, sem confundir rolagem, formulários ou arrasto; risadinha tem prioridade. Entrada com posição limpa da ursinha, ignorando posições antigas; pequeno espaço livre inicial em telas móveis/baixas, sem cobrir conteúdo. Nenhuma mensagem ou informação do evento foi substituída.
