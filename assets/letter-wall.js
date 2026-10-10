// Melhoria do mural público. Recebe o React já carregado pelo convite.
// Não cria outro banco e não altera as mensagens ou a moderação do servidor.
export const LETTERS_PER_PAGE = 3;

export function orderLetters(letters = []) {
  const affection =
    /\b(amor|carinho|feliz|felicidades|parabens|abenco|abraco|alegria|linda|especial|sonhos|saude)\w*/g;
  const score = (letter) => {
    const text = String(letter.message ?? "").trim();
    const normalized = text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    const wishes = new Set(normalized.match(affection) ?? []).size;
    // Mensagens curtas recebem maior destaque. Até três expressões de carinho
    // ajudam na seleção, sem excluir nem julgar as demais lembranças.
    return Math.max(0, 600 - text.length) + Math.min(wishes, 3) * 35;
  };
  return [...letters].sort(
    (left, right) =>
      score(right) - score(left) ||
      String(left.createdAt ?? "").localeCompare(
        String(right.createdAt ?? ""),
      ) ||
      String(left.id).localeCompare(String(right.id)),
  );
}

export function getLetterPage(letters, page = 0) {
  const pageCount = Math.max(1, Math.ceil(letters.length / LETTERS_PER_PAGE));
  const currentPage = Math.max(0, Math.min(page, pageCount - 1));
  const start = currentPage * LETTERS_PER_PAGE;
  return {
    currentPage,
    pageCount,
    start,
    end: Math.min(start + LETTERS_PER_PAGE, letters.length),
    letters: letters.slice(start, start + LETTERS_PER_PAGE),
  };
}

export function createLetterWall(React, jsx, Heart) {
  const { jsx: element, jsxs: elements } = jsx;

  function LetterNote({ letter, index }) {
    const [expanded, setExpanded] = React.useState(false);
    const messageId = `cartinha-${letter.id}`;
    return elements("article", {
      className: `note note-${index % 3}${expanded ? " note-expanded" : ""}`,
      children: [
        element(Heart, {
          className: "note-heart",
          size: 17,
          "aria-hidden": true,
        }),
        element("p", {
          id: messageId,
          className: "note-message",
          children: letter.message,
        }),
        element("button", {
          type: "button",
          className: "letter-read-more",
          "aria-expanded": expanded,
          "aria-controls": messageId,
          onClick: () => setExpanded(!expanded),
          children: expanded ? "Recolher cartinha" : "Ler cartinha completa",
        }),
        elements("footer", {
          children: [
            elements("strong", { children: ["Com carinho, ", letter.name] }),
            element("small", {
              children: new Date(letter.createdAt).toLocaleDateString("pt-BR"),
            }),
          ],
        }),
      ],
    });
  }

  return function LetterWall({ query }) {
    const [page, setPage] = React.useState(0);
    const order = React.useMemo(
      () => orderLetters(query.data ?? []),
      [query.data],
    );
    const current = getLetterPage(order, page);
    React.useEffect(() => {
      if (page !== current.currentPage) setPage(current.currentPage);
    }, [page, current.currentPage]);

    if (query.isLoading) {
      return element("div", {
        className: "letter-wall",
        role: "status",
        children: element("p", {
          children: "Preparando nosso mural de carinho...",
        }),
      });
    }
    if (query.isError) {
      return element("div", {
        className: "letter-wall",
        children: elements("div", {
          className: "empty-wall",
          role: "alert",
          children: [
            element("p", {
              children: "Não foi possível abrir as cartinhas agora.",
            }),
            element("button", {
              type: "button",
              className: "text-button",
              onClick: () => query.refetch(),
              children: "Tentar novamente",
            }),
          ],
        }),
      });
    }
    if (!order.length) {
      return element("div", {
        className: "letter-wall",
        children: elements("div", {
          className: "empty-wall",
          children: [
            element(Heart, { size: 38, "aria-hidden": true }),
            element("h3", { children: "O primeiro abraço pode ser seu." }),
            element("p", {
              children:
                "As cartinhas dos nossos convidados vão brilhar aqui. Escreva a primeira!",
            }),
            element("span", {
              className: "handwriting",
              children: "Um carinho para guardar para sempre",
            }),
          ],
        }),
      });
    }

    return elements("div", {
      className: "letter-wall letter-wall-paged",
      children: [
        elements("div", {
          className: "letter-wall-heading",
          children: [
            element("h3", { children: "Abraços em forma de cartinha" }),
            element("p", {
              children: "Três carinhos por vez, para ler com calma.",
            }),
          ],
        }),
        element("div", {
          id: "cartinhas-visiveis",
          className: "letter-cards",
          children: current.letters.map((letter, index) =>
            element(LetterNote, { letter, index }, letter.id),
          ),
        }),
        element("p", {
          className: "letter-page-status",
          role: "status",
          "aria-live": "polite",
          "aria-atomic": true,
          children: `${current.start + 1}–${current.end} de ${order.length} ${order.length === 1 ? "cartinha" : "cartinhas"}`,
        }),
        order.length > LETTERS_PER_PAGE &&
          elements("nav", {
            className: "letter-pagination",
            "aria-label": "Navegar pelas cartinhas",
            children: [
              element("button", {
                type: "button",
                className: "letter-previous",
                disabled: current.currentPage === 0,
                "aria-controls": "cartinhas-visiveis",
                onClick: () => setPage(current.currentPage - 1),
                children: "Anteriores",
              }),
              element("button", {
                type: "button",
                className: "button primary letter-next",
                "aria-controls": "cartinhas-visiveis",
                onClick: () =>
                  setPage(
                    current.currentPage === current.pageCount - 1
                      ? 0
                      : current.currentPage + 1,
                  ),
                children:
                  current.currentPage === current.pageCount - 1
                    ? "Voltar às primeiras cartinhas"
                    : "Ver próximas cartinhas",
              }),
            ],
          }),
      ],
    });
  };
}
