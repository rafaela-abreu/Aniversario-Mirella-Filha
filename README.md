# Aniversário Mirella Rebecca — 5 anos

Convite público: https://rafaela-abreu.github.io/Aniversario-Mirella-Filha/

## Funções

- Cartinhas salvas em banco de dados e exibidas publicamente no mural, com nome e mensagem. O mural se atualiza após o envio e a cada 20 segundos enquanto o site está aberto.
- Confirmação de presença salva na lista privada dos responsáveis, com opção de avisar a mamãe por WhatsApp. Nenhuma lista de convidados é pública.
- Área dos responsáveis: https://mirella5-kun5e5rs.manus.space/familia — exige a conta autorizada da dona do convite.
- Data, horário e local vêm do servidor e podem ser editados no painel.

## Visual e mídia

Tema lilás e branco, fonte Nunito arredondada, cartões arredondados, legenda com contraste melhorado e barra superior removida. Fundo sem cachorro por reenquadramento, loop contínuo e imagem de segurança. Vídeo principal da foto original com movimento de câmera, sem recriação do rosto. Música enviada pela família, ursinha arrastável com risadinha em volume moderado e galeria inclinada de família em loop mais ágil.

## Hospedagem

O frontend e as mídias ficam no GitHub Pages. O banco e as APIs ficam no servidor publicado https://mirella5-kun5e5rs.manus.space, com CORS limitado à origem https://rafaela-abreu.github.io. Os arquivos públicos não contêm credenciais nem listas de convidados.

## Tipografia legível

A fonte aplicada ao convite e às cartinhas é Fredoka variável, hospedada junto com o site. Os títulos usam peso 650; mensagens das cartinhas usam peso 600, 20px, preto e entrelinha 1,65, sem cursiva fina. Títulos e chamadas começam com maiúscula em vez de ficar inteiramente em caixa alta.

Referências verificadas para a escolha: [Google Fonts — Fredoka](https://fonts.google.com/specimen/Fredoka), [Figma — Fredoka](https://www.figma.com/fonts/fredoka/) e [Pimp my Type — legibilidade e alternativas à Quicksand](https://pimpmytype.com/quicksand-alternatives/). Fredoka foi escolhida pelas formas arredondadas e encorpadas, verificadas em tela de celular e computador. A licença OFL está em fonts/Fredoka-OFL.txt.

## Interações compactas — 10 de outubro de 2026

Toda a área do mapa (incluindo a legenda) é um link HTTPS para o Google Maps, usando o endereço atualizado pelo painel. No celular, o sistema pode abrir o aplicativo Google Maps, quando instalado; no computador abre no navegador. O aviso de localização provisória continua aparecendo quando o endereço ainda não foi confirmado.

O mural mostra até três cartinhas por vez. “Ver próximas cartinhas” substitui o grupo atual, sem acumular mensagens na página; é possível voltar às anteriores e, no último grupo, às primeiras. A seleção inicial prioriza mensagens mais curtas e até três expressões de carinho, por um critério local simples e determinístico. Nenhuma mensagem é excluída ou modificada. A leitura completa pode ser expandida em cada cartinha. O envio e a atualização a cada 20 segundos continuam usando o servidor existente.

O balão acima da Mirella diz “Me leve para brincar” e “Clique aqui ou me arraste!”. O balão também aceita clique para brincar. A barrinha inferior de abraços e controles da ursinha foi removida. O arraste e as setas do teclado continuam funcionando; Escape traz a Mirella para perto.

Pressionar e segurar por 700 ms uma área vazia, ou dar três toques rápidos em até um segundo, alterna entre pausar e retomar a música. O gesto não atua sobre links, formulários, texto, fotos, vídeos, mapa, cartinhas ou a Mirella. Rolagem/arraste cancela a pressão para evitar acionamentos acidentais. A pausa voluntária é preservada ao rolar, brincar e recarregar. Não foram adicionados avisos nem novos botões de áudio; o botão original da seção de música permanece.

Os módulos legíveis `assets/letter-wall.js` e `assets/music-comfort.js` recebem o React já carregado pelo convite, sem duplicar bibliotecas nem alterar o backend. Os ajustes visuais estão em `assets/invitation-interactions.css`. Teste de seleção/paginação: `node tests/letter-wall.test.mjs`.
