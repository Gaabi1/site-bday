/* =========================================================
   ✏️ CONFIGURAÇÕES — EDITE AQUI
   ========================================================= */
const CONFIG = {
  nome: "Amigaaa",                       // <- nome da sua amiga
  idade: 27,                          // <- idade que ela completa
  fraseHero: "Você merece um dia cheio de carinho, risadas e coisas maravilhosas. 💕",

  // Texto da carta (use \n para pular linha)
  carta: "Nessa data, preparei essa surpresa para você amigaa. Espero poder compartilhar muitas das suas conquistas ao seu lado e estar presente em cada momento importante da sua vida. É tão bom ver você se tornando essa mulher incrível, forte e especial. Que eu possa continuar acompanhando de pertinho cada passo seu e comemorando muitas vitórias com você. 💕",

  // Fotos: coloque os arquivos na MESMA pasta do index.html (ou mude o caminho)
  fotos: [
    { src: "img/foto2.jpeg", legenda: "Saudadees" },
    { src: "img/foto1.jpeg", legenda: "Tá em todaas" },
    { src: "img/foto3.jpeg", legenda: "Showzão" },
    { src: "img/foto4.jpeg", legenda: "Parceriaa" },
    { src: "img/foto6.jpeg", legenda: "Amoooo" },
    { src: "img/foto5.jpeg", legenda: "Somos muito gatas!!" },
  ],

  // Cards "Você é especial porque..."
  cards: [
    { titulo: "Seu jeito",         emoji: "🌷", texto: "Incriveel" },
    { titulo: "Nossas conversas",  emoji: "💬", texto: "Sempre leve e transparente" },
    { titulo: "Suas loucuras",     emoji: "🤪", texto: "Elas deixam tudo muito mais divertido!" },
    { titulo: "Todos os momentos", emoji: "✨", texto: "Todos foram inesqueciveis" },
  ],

  // Frases aleatórias do jogo
  frases: [
    "Você é oficialmente incrível. 🌟",
    "Seu nível de amizade ultrapassou o limite. 🚀",
    "Você merece um dia perfeito. 🎀",
    "Hoje é proibido ficar triste. 🚫😢",
    "Você ganhou +1000 pontos de felicidade. 🎮",
  ],

  // Botão especial
  msgEspecial: "Que seu novo ciclo seja cheio de momentos incríveis, sonhos realizados e muitos motivos para sorrir.",
  msgEspecialExtra: "Te amo muito, amigaaaaa! 💗",   // <- mensagem final editável

  // Frase do final
  fraseFinal: "Que venham muitos outros momentos juntas. 💕",
};

/* =========================================================
   FUNÇÕES AUXILIARES
   ========================================================= */
const $ = (id) => document.getElementById(id);
const rand = (a, b) => Math.random() * (b - a) + a;
const PINKS = ["#ff4d94", "#ff8fb8", "#ffb3d1", "#ffffff", "#ffd1e3", "#ffc94d"];

/* =========================================================
   PREENCHE TEXTOS A PARTIR DA CONFIG
   ========================================================= */
document.querySelectorAll("[data-name]").forEach((el) => (el.textContent = CONFIG.nome));
$("hero-sub").textContent = CONFIG.fraseHero;
$("letter-text").textContent = CONFIG.carta;
$("end-text").textContent = CONFIG.fraseFinal;

/* =========================================================
   CONFETES / CORAÇÕES (canvas leve)
   ========================================================= */
const canvas = $("fx");
const ctx = canvas.getContext("2d");
let parts = [], running = false;

function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
addEventListener("resize", resize);
resize();

/** Explosão de partículas a partir de (x, y) */
function burst(x, y, n = 60) {
  for (let i = 0; i < n; i++) {
    const a = rand(0, Math.PI * 2), s = rand(3, 9);
    parts.push({
      x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 3, g: 0.18,
      size: rand(10, 20), rot: rand(0, 6), vr: rand(-.2, .2),
      color: PINKS[(Math.random() * PINKS.length) | 0],
      heart: Math.random() < 0.5, life: 1,
    });
  }
  if (!running) { running = true; requestAnimationFrame(loop); }
}

/** Chuva de confetes vinda do topo */
function rain(n = 70) {
  for (let i = 0; i < n; i++) {
    parts.push({
      x: rand(0, canvas.width), y: rand(-200, 0), vx: rand(-1, 1), vy: rand(2, 5), g: 0.02,
      size: rand(8, 16), rot: rand(0, 6), vr: rand(-.15, .15),
      color: PINKS[(Math.random() * PINKS.length) | 0], heart: Math.random() < 0.4, life: 1,
    });
  }
  if (!running) { running = true; requestAnimationFrame(loop); }
}

function drawHeart(s) {
  ctx.beginPath();
  ctx.moveTo(0, s / 4);
  ctx.bezierCurveTo(-s / 2, -s / 3, -s, s / 4, 0, s);
  ctx.bezierCurveTo(s, s / 4, s / 2, -s / 3, 0, s / 4);
  ctx.fill();
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  parts = parts.filter((p) => p.life > 0 && p.y < canvas.height + 40);
  for (const p of parts) {
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= 0.004;
    ctx.save();
    ctx.globalAlpha = Math.max(p.life, 0);
    ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.color;
    if (p.heart) drawHeart(p.size / 2); else ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  }
  if (parts.length) requestAnimationFrame(loop); else { running = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
}

/* =========================================================
   DECORAÇÃO FLUTUANTE DE FUNDO (corações, estrelas, flores)
   ========================================================= */
(function floatingDecor() {
  const icons = ["💗", "✦", "🌸", "✨", "💕", "⭐"];
  const box = $("bg-decor");
  for (let i = 0; i < 16; i++) {
    const s = document.createElement("span");
    s.textContent = icons[i % icons.length];
    s.style.left = rand(0, 100) + "%";
    s.style.fontSize = rand(14, 32) + "px";
    s.style.animationDuration = rand(18, 34) + "s";
    s.style.animationDelay = -rand(0, 30) + "s";
    box.appendChild(s);
  }
})();

/* =========================================================
   1. TELA INICIAL → ABRIR SURPRESA
   ========================================================= */
$("open-btn").addEventListener("click", (e) => {
  $("intro").classList.add("gone");
  $("main").classList.remove("hidden");
  document.body.classList.remove("locked");
  burst(e.clientX, e.clientY, 80);
  rain(80);
  setTimeout(() => ($("intro").style.display = "none"), 800);
  observeReveals();
});

/* =========================================================
   ANIMAÇÃO AO ROLAR (IntersectionObserver)
   ========================================================= */
let ageDone = false, riseTimer = null;

function observeReveals() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        if (en.target.id === "age" && !ageDone) { ageDone = true; countUp(); }
      }
      // Corações subindo enquanto a seção final estiver visível
      if (en.target.id === "end") {
        clearInterval(riseTimer);
        if (en.isIntersecting) { riseHearts(); riseTimer = setInterval(riseHearts, 700); }
      }
    });
  }, { threshold: 0.25 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* =========================================================
   3. CONTADOR DE IDADE
   ========================================================= */
function countUp() {
  const el = $("age-num"), total = CONFIG.idade, t0 = performance.now(), dur = 1800;
  (function step(t) {
    const k = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(total * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(step); else burst(innerWidth / 2, innerHeight / 2, 40);
  })(t0);
}

/* =========================================================
   4. CARTA
   ========================================================= */
$("letter-btn").addEventListener("click", () => {
  const env = $("envelope");
  const open = env.classList.toggle("open");
  $("letter-btn").textContent = open ? "💌 Fechar carta" : "💌 Abrir carta";
  if (open) burst(innerWidth / 2, innerHeight / 2, 30);
});

/* =========================================================
   5. GALERIA + MODAL
   ========================================================= */
const modal = $("modal");

CONFIG.fotos.forEach((f) => {
  const item = document.createElement("div");
  item.className = "photo";
  item.tabIndex = 0;
  item.setAttribute("role", "button");
  item.textContent = "📷"; // aparece se a foto não existir

  const img = document.createElement("img");

  img.src = f.src;
  img.alt = f.legenda;

  item.appendChild(img);
  item.appendChild(cap());

  function cap() { const c = document.createElement("span"); c.className = "cap"; c.textContent = f.legenda; return c; }

  const open = () => openModal(f);
  item.addEventListener("click", open);
  item.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  $("photo-grid").appendChild(item);
});

function openModal(f) {
    
  console.log("ABRIU MODAL:", f.src);

  const media = $("modal-media");

  media.textContent = "";

  const im = document.createElement("img");

  im.src = f.src;
  im.alt = f.legenda;

  media.appendChild(im);

  $("modal-cap").textContent = f.legenda;

  modal.classList.add("on");
  modal.setAttribute("aria-hidden", "false");
}
function closeModal() { modal.classList.remove("on"); modal.setAttribute("aria-hidden", "true"); }

$("modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); }); // clicar fora fecha
addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

/* =========================================================
   6. CARDS "VOCÊ É ESPECIAL PORQUE..."
   ========================================================= */
CONFIG.cards.forEach((c) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "card glass";
  b.innerHTML = `<span style="font-size:2rem">${c.emoji}</span><b></b><span class="msg"></span>`;
  b.querySelector("b").textContent = c.titulo;
  b.querySelector(".msg").textContent = c.texto;
  b.addEventListener("click", (e) => {
    b.classList.toggle("on");
    if (b.classList.contains("on")) burst(e.clientX, e.clientY, 14);
  });
  $("cards").appendChild(b);
});

/* =========================================================
   7. JOGO: FRASES ALEATÓRIAS
   ========================================================= */
let lastPhrase = -1;
$("game-btn").addEventListener("click", (e) => {
  let i;
  do { i = (Math.random() * CONFIG.frases.length) | 0; } while (i === lastPhrase && CONFIG.frases.length > 1);
  lastPhrase = i;
  const out = $("game-out");
  out.textContent = CONFIG.frases[i];
  out.classList.remove("pop"); void out.offsetWidth; out.classList.add("pop"); // reinicia a animação
  $("game-btn").textContent = "Mais uma! ✨";
  burst(e.clientX, e.clientY, 20);
});

/* =========================================================
   8. BOTÃO ESPECIAL
   ========================================================= */
$("more-btn").addEventListener("click", (e) => {
  $("big-text").textContent = CONFIG.msgEspecial;
  $("big-extra").textContent = CONFIG.msgEspecialExtra;
  $("dim").classList.add("on");
  $("big-msg").classList.add("on");
  burst(e.clientX, e.clientY, 110);
  burst(innerWidth / 2, innerHeight / 2, 80);
  rain(60);
});
$("big-close").addEventListener("click", () => {
  $("dim").classList.remove("on");
  $("big-msg").classList.remove("on");
  $("end").scrollIntoView({ behavior: "smooth" });
});

/* =========================================================
   9. CORAÇÕES SUBINDO (final)
   ========================================================= */
function riseHearts() {
  for (let i = 0; i < 5; i++) {
    const h = document.createElement("span");
    h.className = "rise";
    h.textContent = ["💗", "💕", "💖", "🌸"][(Math.random() * 4) | 0];
    h.style.left = rand(2, 96) + "%";
    h.style.fontSize = rand(18, 40) + "px";
    h.style.animationDuration = rand(4, 7) + "s";
    h.style.animationDelay = rand(0, 1.2) + "s";
    h.addEventListener("animationend", () => h.remove());
    document.body.appendChild(h);
  }
}

/* =========================================================
   MÚSICA (nunca toca sozinha)
   ========================================================= */
const audio = $("audio"), mbtn = $("music-btn");
mbtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().catch(() => alert("Não achei o arquivo musica.mp3 na pasta do site. 🎵"));
  } else audio.pause();
});
audio.addEventListener("play", () => mbtn.classList.add("playing"));
audio.addEventListener("pause", () => mbtn.classList.remove("playing"));
