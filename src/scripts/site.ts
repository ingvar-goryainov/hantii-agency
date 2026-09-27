/**
 * The site's only client script (docs/design.md §9):
 * 1. close the mobile menu popover when one of its links is chosen;
 * 2. copy the contact email, announcing the result to screen readers.
 */

const menu = document.getElementById("menu");
menu?.addEventListener("click", (event) => {
  if ((event.target as Element).closest("a")) menu.hidePopover();
});

const copyStatus = document.getElementById("copy-status");

function announce(message: string) {
  if (!copyStatus) return;
  copyStatus.textContent = "";
  requestAnimationFrame(() => (copyStatus.textContent = message));
}

function selectText(element: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

for (const button of document.querySelectorAll<HTMLButtonElement>("button[data-copy]")) {
  const label = button.querySelector<HTMLElement>(".copy-label");
  const idle = label?.textContent ?? "";
  let timer: number | undefined;

  button.addEventListener("click", async () => {
    const { copy = "", done = "", fallback = "", target = "" } = button.dataset;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(copy);
      button.classList.add("is-done");
      if (label) label.textContent = done;
      announce(done);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        button.classList.remove("is-done");
        if (label) label.textContent = idle;
      }, 2000);
    } catch {
      const element = document.getElementById(target);
      if (element) selectText(element);
      announce(fallback);
    }
  });
}

export {};
