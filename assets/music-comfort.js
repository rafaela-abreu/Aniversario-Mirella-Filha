// Segurar 700 ms ou tocar três vezes numa área vazia alterna a música.
// Sem novos avisos/botões. Preserva o botão original e a pausa voluntária.
export const HOLD_DURATION = 700;
export const TAP_WINDOW = 1000;
const EXCLUDED =
  'a,button,input,textarea,select,label,form,video,audio,iframe,img,svg,p,h1,h2,h3,h4,h5,h6,li,blockquote,details,[role="button"],[role="link"],[contenteditable="true"],.teddy-world,.teddy-controls,.music-station,.map-frame,.note,.modal-backdrop';

export function isEmptyArea(target) {
  return target instanceof Element && !target.closest(EXCLUDED);
}

export function createComfortMusic(React, jsx, MusicIcon, MutedIcon, source) {
  const { jsx: element, jsxs: elements } = jsx;
  return function ComfortMusic() {
    const audio = React.useRef(null);
    const initialized = React.useRef(false);
    const desired = React.useRef(false);
    const teddyActive = React.useRef(false);
    const manuallyPaused = React.useRef(false);
    const [playing, setPlaying] = React.useState(false);
    const [enabled, setEnabled] = React.useState(false);
    const [blocked, setBlocked] = React.useState(false);

    const play = () => {
      if (
        !audio.current ||
        teddyActive.current ||
        !desired.current ||
        document.hidden
      )
        return;
      audio.current
        .play()
        .then(() => setBlocked(false))
        .catch(() => setBlocked(true));
    };
    const toggle = () => {
      initialized.current = true;
      desired.current = !desired.current;
      manuallyPaused.current = !desired.current;
      setEnabled(desired.current);
      try {
        localStorage.setItem(
          "mirella-music-paused",
          String(manuallyPaused.current),
        );
      } catch {}
      if (desired.current) play();
      else audio.current?.pause();
    };

    React.useEffect(() => {
      const track = new Audio(source);
      track.loop = true;
      track.preload = "auto";
      track.volume = 0.25;
      audio.current = track;
      try {
        manuallyPaused.current =
          localStorage.getItem("mirella-music-paused") === "true";
        initialized.current = manuallyPaused.current;
      } catch {}
      const onPlay = () => setPlaying(true);
      const onPause = () => setPlaying(false);
      track.addEventListener("play", onPlay);
      track.addEventListener("pause", onPause);
      const autoStart = (event) => {
        if (
          event.target?.closest?.(
            ".teddy-world,.teddy-controls,.music-station button",
          )
        )
          return;
        if (manuallyPaused.current) return;
        if (!initialized.current) {
          initialized.current = true;
          desired.current = true;
          setEnabled(true);
        }
        if (desired.current && track.paused) play();
      };
      const onTeddy = (event) => {
        teddyActive.current = !!event.detail.active;
        if (teddyActive.current) track.pause();
        else if (desired.current) play();
      };

      let press = null;
      let holdTimer = null;
      let taps = [];
      const cancelHold = () => {
        clearTimeout(holdTimer);
        holdTimer = null;
        press = null;
      };
      const onVisibility = () => {
        if (document.hidden) {
          track.pause();
          cancelHold();
        } else if (desired.current) play();
      };
      const pointerDown = (event) => {
        if (press) {
          cancelHold();
          taps = [];
          return;
        }
        if (
          event.button !== 0 ||
          !event.isPrimary ||
          !isEmptyArea(event.target)
        )
          return;
        press = {
          id: event.pointerId,
          x: event.clientX,
          y: event.clientY,
          held: false,
        };
        holdTimer = window.setTimeout(() => {
          if (!press) return;
          press.held = true;
          taps = [];
          toggle();
        }, HOLD_DURATION);
      };
      const pointerMove = (event) => {
        if (press?.id !== event.pointerId) return;
        if (Math.hypot(event.clientX - press.x, event.clientY - press.y) > 12) {
          cancelHold();
          taps = [];
        }
      };
      const pointerUp = (event) => {
        if (press?.id !== event.pointerId) return;
        const completed = press;
        cancelHold();
        if (completed.held || !isEmptyArea(event.target)) return;
        const now = performance.now();
        taps = taps.filter((time) => now - time <= TAP_WINDOW);
        taps.push(now);
        if (taps.length >= 3) {
          taps = [];
          toggle();
        }
      };
      const contextMenu = (event) => {
        if (isEmptyArea(event.target)) event.preventDefault();
      };
      const onScroll = () => {
        cancelHold();
        taps = [];
      };
      const autoEvents = ["pointerdown", "wheel", "keydown"];
      autoEvents.forEach((type) =>
        window.addEventListener(type, autoStart, { passive: true }),
      );
      window.addEventListener("pointerdown", pointerDown, { passive: true });
      window.addEventListener("pointermove", pointerMove, { passive: true });
      window.addEventListener("pointerup", pointerUp, { passive: true });
      window.addEventListener("pointercancel", cancelHold, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("contextmenu", contextMenu);
      window.addEventListener("mirella-teddy-audio", onTeddy);
      document.addEventListener("visibilitychange", onVisibility);
      return () => {
        track.pause();
        cancelHold();
        autoEvents.forEach((type) =>
          window.removeEventListener(type, autoStart),
        );
        window.removeEventListener("pointerdown", pointerDown);
        window.removeEventListener("pointermove", pointerMove);
        window.removeEventListener("pointerup", pointerUp);
        window.removeEventListener("pointercancel", cancelHold);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("contextmenu", contextMenu);
        window.removeEventListener("mirella-teddy-audio", onTeddy);
        document.removeEventListener("visibilitychange", onVisibility);
        track.removeEventListener("play", onPlay);
        track.removeEventListener("pause", onPause);
      };
    }, []);

    return elements("div", {
      className: "music-station",
      children: [
        elements("div", {
          className: "music-label",
          children: [
            element(MusicIcon, { size: 18, "aria-hidden": true }),
            elements("div", {
              children: [
                element("strong", { children: "A trilha da nossa festa" }),
                element("small", { children: "Golden · HUNTR/X" }),
              ],
            }),
            element("button", {
              type: "button",
              className: "icon-button",
              "aria-label": enabled ? "Pausar música" : "Tocar música",
              onClick: toggle,
              children: element(playing ? MutedIcon : MusicIcon, {
                size: 18,
                "aria-hidden": true,
              }),
            }),
          ],
        }),
        element("p", {
          children: blocked
            ? "Seu celular precisa de um toque para liberar o som. Aperte o botão de música."
            : "Deslize para ouvir. Ao pegar a ursinha, a música dá lugar à risadinha; ao soltar, ela volta.",
        }),
      ],
    });
  };
}
