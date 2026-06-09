
var votos = [];

document.getElementById('formVotacao').addEventListener('submit', function (e) {
  e.preventDefault();

  var jogadorSelecionado = document.querySelector('input[name="jogador"]:checked');
  if (!jogadorSelecionado) {
    alert('Por favor, escolha um jogador para votar!');
    return;
  }

  var nome      = document.getElementById('nomeVotante').value.trim();
  var jogador   = jogadorSelecionado.value;
  var comentario = document.getElementById('comentario').value.trim();

  votos.push({
    nome:      nome || 'Anônimo',
    jogador:   jogador,
    comentario: comentario,
    hora:      new Date().toLocaleTimeString('pt-BR')
  });

  var contagem = {};
  votos.forEach(function (v) {
    contagem[v.jogador] = (contagem[v.jogador] || 0) + 1;
  });

  var mensagem = '';
  if (nome) {
    mensagem += '<strong>' + nome + '</strong>, obrigado pelo seu voto! ';
  }
  mensagem += 'Você votou em <strong>' + jogador + '</strong>. ';
  if (comentario) {
    mensagem += '<br/><em>"' + comentario + '"</em><br/>';
  }

  mensagem += '<br/><strong>Placar atual de votos nesta sessão:</strong><br/>';
  var listaPlacar = Object.entries(contagem)
    .sort(function (a, b) { return b[1] - a[1]; })
    .map(function (item) {
      return '&bull; ' + item[0] + ': <strong>' + item[1] + ' voto(s)</strong>';
    })
    .join('<br/>');
  mensagem += listaPlacar;

  document.getElementById('msg-votacao').innerHTML = mensagem;
  document.getElementById('resultado-votacao').style.display = 'block';

  document.getElementById('formVotacao').reset();
  document.getElementById('resultado-votacao').scrollIntoView({ behavior: 'smooth' });
});

/*
   Modo escuro
*/
(function () {
  var btn  = document.getElementById('btn-dark-mode');
  var icon = document.getElementById('icon-dark-mode');

  if (localStorage.getItem('fla-dark') === '1') {
    document.body.classList.add('dark-mode');
    icon.className = 'bi bi-sun-fill';
    btn.setAttribute('data-tooltip', 'Modo claro');
  }

  btn.addEventListener('click', function () {
    var isDark = document.body.classList.toggle('dark-mode');
    icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    btn.setAttribute('data-tooltip', isDark ? 'Modo claro' : 'Modo escuro');
    localStorage.setItem('fla-dark', isDark ? '1' : '0');
  });
})();

/* 
   Scroll suave
*/
(function () {
  var sectionSelectors = [
    'section',
    '.card',
    '.foto-final',
    '.legenda-foto',
    '.alert-danger[role="alert"]:not(#resultado-votacao)',
  ];

  sectionSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (!el.closest('#resultado-votacao') && !el.classList.contains('hero')) {
        el.classList.add('reveal');
      }
    });
  });

  document.querySelectorAll('.card-jogador').forEach(function (el) {
    el.classList.remove('reveal');
    el.classList.add('reveal-child');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-child').forEach(function (el) {
    observer.observe(el);
  });
})();
