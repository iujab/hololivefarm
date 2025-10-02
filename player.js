const SCREEN = document.getElementById("screen");

let frames = [];
let idx = 0;
const FPS = 12;
const FRAME_INTERVAL = 1000 / FPS;
let lastTs = 0;

const DELIM_RE = /^\s*-{3,}\s*frame\s*-{3,}\s*$/i;

(async function init() {
  try {
    const res = await fetch("frames.txt", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    frames = parseFrames(text);

    if (!frames.length) {
      SCREEN.textContent = "No frames found in frames.txt";
      return;
    }

    SCREEN.textContent = frames[0];
    requestAnimationFrame(loop);
  } catch (err) {
    SCREEN.textContent = `Failed to load frames.txt\n${String(err)}`;
  }
})();

function loop(ts) {
  if (frames.length && ts - lastTs >= FRAME_INTERVAL) {
    SCREEN.textContent = frames[idx];
    idx = (idx + 1) % frames.length;
    lastTs = ts;
  }
  requestAnimationFrame(loop);
}


function parseFrames(text) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");

  const out = [];
  let buf = [];

  for (const line of lines) {
    if (DELIM_RE.test(line)) {
      if (buf.length) {
        out.push(buf.join("\n"));
        buf = [];
      }
    } else {
      buf.push(line);
    }
  }

  if (buf.length) {
    if (buf.length) out.push(buf.join("\n"));
  }

  return out;
}
