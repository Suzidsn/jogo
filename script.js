let player = document.getElementById("player");
let jogo = document.getElementById("jogo");
let pontuacao = 0;
let recorde = localStorage.getItem("recorde") || 0;
let dificuldade = 1000;
let posicao = 135;
let jogoAtivo = false;

document.getElementById("recorde").innerText = recorde;

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" && posicao > 0) {
        posicao -= 10;
    } else if (event.key === "ArrowRight" && posicao < 270) {
        posicao += 10;
    }
    player.style.left = posicao + "px";
});

function iniciarJogo() {
    document.getElementById("gameOverScreen").classList.add("hidden");
    pontuacao = 0;
    dificuldade = 1000;
    jogoAtivo = true;
    gerarObstaculos();
}

function gerarObstaculos() {
    if (!jogoAtivo) return;

    let obstaculo = document.createElement("div");
    obstaculo.style.width = "30px";
    obstaculo.style.height = "30px";
    obstaculo.style.backgroundColor = "#00ccff";
    obstaculo.style.position = "absolute";
    obstaculo.style.top = "0px";
    obstaculo.style.left = Math.floor(Math.random() * 270) + "px";
    jogo.appendChild(obstaculo);

    let intervalo = setInterval(() => {
        let topo = parseInt(obstaculo.style.top) + 10;
        obstaculo.style.top = topo + "px";

        // Verifica colisão com o jogador
        if (topo >= 370 && Math.abs(parseInt(obstaculo.style.left) - posicao) < 30) {
            clearInterval(intervalo);
            jogo.removeChild(obstaculo);
            gameOver();
            return;
        }

        if (topo >= 400) {
            clearInterval(intervalo);
            jogo.removeChild(obstaculo);
            pontuacao++;
            document.getElementById("pontuacao").innerText = pontuacao;

            if (pontuacao % 5 === 0) {
                dificuldade -= 100;
            }

            gerarObstaculos();
        }
    }, dificuldade);
}

function gameOver() {
    jogoAtivo = false;
    document.getElementById("finalScore").innerText = pontuacao;
    document.getElementById("gameOverScreen").classList.remove("hidden");
    atualizarRecorde();
}

function reiniciarJogo() {
    document.getElementById("gameOverScreen").classList.add("hidden");
    iniciarJogo();
}

function atualizarRecorde() {
    if (pontuacao > recorde) {
        recorde = pontuacao;
        localStorage.setItem("recorde", recorde);
        document.getElementById("recorde").innerText = recorde;
    }
}
function gerarObstaculos() {
    if (!jogoAtivo) return;

    let obstaculo = document.createElement("div");
    obstaculo.style.width = "30px";
    obstaculo.style.height = "30px";
    obstaculo.style.backgroundColor = "#00ccff";
    obstaculo.style.position = "absolute";
    obstaculo.style.top = "0px";
    obstaculo.style.left = Math.floor(Math.random() * 270) + "px";
    jogo.appendChild(obstaculo);

    let intervalo = setInterval(() => {
        let topo = parseInt(obstaculo.style.top) + 30; // Aumentando a velocidade
        obstaculo.style.top = topo + "px";

        // Verifica colisão com o jogador
        if (topo >= 370 && Math.abs(parseInt(obstaculo.style.left) - posicao) < 30) {
            clearInterval(intervalo);
            jogo.removeChild(obstaculo);
            gameOver();
            return;
        }

        if (topo >= 400) {
            clearInterval(intervalo);
            jogo.removeChild(obstaculo);
            pontuacao++;
            document.getElementById("pontuacao").innerText = pontuacao;

            if (pontuacao % 5 === 0) {
                dificuldade -= 50; // Aumentando a dificuldade progressivamente
            }

            gerarObstaculos();
        }
    }, 333); // Atualizando a cada 333ms para aumentar a velocidade
}
