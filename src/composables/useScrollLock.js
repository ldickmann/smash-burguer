// Trava a rolagem do <body> enquanto um diálogo, menu ou gaveta está aberto.
// Usa contagem para que dois travamentos simultâneos não se desfaçam um ao outro.
let locks = 0;

export function useScrollLock() {
  let active = false;

  const lock = () => {
    if (active) return;
    active = true;
    locks += 1;
    document.body.style.overflow = "hidden";
  };

  const unlock = () => {
    if (!active) return;
    active = false;
    locks = Math.max(0, locks - 1);
    if (locks === 0) document.body.style.overflow = "";
  };

  return { lock, unlock };
}
