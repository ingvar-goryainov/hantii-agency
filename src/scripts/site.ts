/**
 * The site's only client script (docs/design.md §9):
 * 1. close the mobile menu popover when one of its links is chosen;
 * 2. copy the contact email, announcing the result to screen readers;
 * 3. count the StatBand figures up once as they come into view;
 * 4. hand the contact form to the visitor's email app (there is no backend).
 */

const menu = document.getElementById("menu");
menu?.addEventListener("click", (event) => {
  if ((event.target as Element).closest("a")) menu.hidePopover();
});

/** Set a live region's text so it is announced again even when unchanged. */
function announce(region: HTMLElement | null, message: string) {
  if (!region) return;
  region.textContent = "";
  requestAnimationFrame(() => (region.textContent = message));
}

function selectText(element: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

const copyStatus = document.getElementById("copy-status");

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
      announce(copyStatus, done);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        button.classList.remove("is-done");
        if (label) label.textContent = idle;
      }, 2000);
    } catch {
      const element = document.getElementById(target);
      if (element) selectText(element);
      announce(copyStatus, fallback);
    }
  });
}

// The figures carry their final value in the HTML; screen readers read a hidden copy.
const figures = document.querySelectorAll<HTMLElement>("[data-count]");
if ("IntersectionObserver" in window && matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        const figure = entry.target as HTMLElement;
        const target = Number(figure.dataset.target);
        const suffix = figure.dataset.suffix ?? "";
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / 1200);
          figure.textContent = `${Math.round(target * (1 - (1 - t) ** 3))}${suffix}`;
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    },
    { threshold: 0.5 },
  );
  for (const figure of figures) {
    const match = /^(\d+)(.*)$/.exec(figure.textContent ?? "");
    if (!match) continue;
    figure.dataset.target = match[1];
    figure.dataset.suffix = match[2];
    figure.textContent = `0${match[2]}`;
    observer.observe(figure);
  }
}

// Without JS the form posts to its mailto: action and the browser validates the email.
for (const form of document.querySelectorAll<HTMLFormElement>("form[data-mail-form]")) {
  const email = form.elements.namedItem("email") as HTMLInputElement;
  const message = form.elements.namedItem("message") as HTMLTextAreaElement;
  const errorId = email.dataset.error ?? "";
  const error = document.getElementById(errorId);
  const status = form.querySelector<HTMLElement>("[data-handoff]");
  form.noValidate = true;

  const setInvalid = (invalid: boolean) => {
    if (error) error.hidden = !invalid;
    if (invalid) {
      email.setAttribute("aria-invalid", "true");
      email.setAttribute("aria-describedby", errorId);
    } else {
      email.removeAttribute("aria-invalid");
      email.removeAttribute("aria-describedby");
    }
  };

  email.addEventListener("input", () => {
    if (email.hasAttribute("aria-invalid") && email.checkValidity()) setInvalid(false);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    email.value = email.value.trim();
    if (!email.checkValidity()) {
      setInvalid(true);
      email.focus();
      return;
    }
    setInvalid(false);
    const { to = "", subject = "", replyTo = "" } = form.dataset;
    const body = [message.value.trim(), `${replyTo} ${email.value}`].filter(Boolean).join("\n\n");
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    announce(status, status?.dataset.handoff ?? "");
  });
}

export {};
