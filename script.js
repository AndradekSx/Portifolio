const elementos = ["Automações N8N", "Desenvolvedor HTML e CSS", "Banco de Dados"];
let i = 0;
let j = 0;
let apagando = false;
let velocidade = 70; // velocidade digitação

const span = document.querySelector(".texto-rotativo");

function digitar() {
  let palavra = elementos[i];

  if (!apagando) {
    span.textContent = palavra.substring(0, j + 1);
    j++;

    if (j === palavra.length) {
      apagando = true;
      setTimeout(digitar, 1500); // espera antes de apagar
      return;
    }
  } else {
    span.textContent = palavra.substring(0, j - 1);
    j--;

    if (j === 0) {
      apagando = false;
      i = (i + 1) % elementos.length;
    }
  }
  setTimeout(digitar, velocidade);
}

digitar();

// ===== CONSTELAÇÃO À DIREITA =====
(() => {
  const c = document.getElementById('constelacao');
  if(!c) return;
  const ctx = c.getContext('2d', { alpha: true });
  const DPI = window.devicePixelRatio || 1;

  let W=0, H=0;
  const mouse = { x:-9999, y:-9999 };

  const COLOR = '#822222';
  let POINTS = 90;
  const SPEED = 0.28;
  const LINK = 130;
  const DOT = 2;
  const P = [];

  const rand = (a,b)=> Math.random()*(b-a)+a;

  function resize(){
    const r = c.getBoundingClientRect();
    W = Math.floor(r.width*DPI); H = Math.floor(r.height*DPI);
    c.width = W; c.height = H;
    ctx.setTransform(DPI,0,0,DPI,0,0);
    const area = r.width*r.height;
    POINTS = Math.max(60, Math.min(140, Math.floor(area/6000)));
    spawn();
  }

  function spawn(){
    P.length = 0;
    const w=c.clientWidth, h=c.clientHeight;
    for(let i=0;i<POINTS;i++)
      P.push({ x:rand(0,w), y:rand(0,h), vx:rand(-SPEED,SPEED), vy:rand(-SPEED,SPEED) });
  }

  function tick(){
    const w=c.clientWidth, h=c.clientHeight;
    ctx.clearRect(0,0,w,h);

    ctx.fillStyle = COLOR + 'cc';
    for(const p of P){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>w) p.vx*=-1;
      if(p.y<0||p.y>h) p.vy*=-1;

      const dm = Math.hypot(p.x-mouse.x, p.y-mouse.y);
      if(dm<LINK){ p.x += (p.x-mouse.x)*0.004; p.y += (p.y-mouse.y)*0.004; }

      ctx.beginPath(); ctx.arc(p.x,p.y,DOT,0,Math.PI*2); ctx.fill();
    }

    ctx.strokeStyle = COLOR + '55';
    for(let i=0;i<P.length;i++){
      for(let j=i+1;j<P.length;j++){
        const a=P[i], b=P[j];
        const d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<LINK){
          ctx.globalAlpha = 1 - d/LINK;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  c.addEventListener('mousemove', e=>{
    const r=c.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  c.addEventListener('mouseleave', ()=>{ mouse.x = mouse.y = -9999; });

  resize(); tick();
})();

function myFunction() {
  let x = document.body;
  x.classList.toggle("dark-mode");
}

// --- MODAIS DE HABILIDADES ---

document.addEventListener('DOMContentLoaded', () => {
  // 1. Seleciona todos os cards de habilidade
  const skillCards = document.querySelectorAll('.habilidade-card');
  
  // 2. Adiciona um ouvinte de evento de clique a cada card
  skillCards.forEach(card => {
    card.addEventListener('click', () => {
      // Pega o ID do modal a partir do atributo 'data-modal' do card
      const modalId = card.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      
      if (modal) {
        modal.style.display = "block"; // Exibe o modal
      }
    });
  });

  // 3. Seleciona todos os botões de fechar (×)
  const closeBtns = document.querySelectorAll('.close-btn');

  // 4. Adiciona um ouvinte de evento de clique a cada botão de fechar
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Fecha o modal pai do botão (o modal-content e depois o modal)
      const modal = btn.closest('.modal');
      if (modal) {
        modal.style.display = "none";
      }
    });
  });

  // 5. Fecha o modal se o usuário clicar fora dele
  window.addEventListener('click', (event) => {
    // Verifica se o elemento clicado tem a classe 'modal' (o fundo)
    if (event.target.classList.contains('modal')) {
      event.target.style.display = "none";
    }
  });
});

// --- Envio para WhatsApp ---
document.getElementById("form-contato").addEventListener("submit", function(e) {
  e.preventDefault(); // impede o recarregamento da página

  // pega os valores
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  // monta o texto com formatação
  const texto = `Olá, meu nome é ${nome} (%0AEmail: ${email})%0A%0A${mensagem}`;

  // seu número de WhatsApp (sem + ou espaços)
  const numero = "5531973591394";

  // cria o link e abre no WhatsApp
  const link = `https://wa.me/${numero}?text=${texto}`;
  window.open(link, "_blank");
});
