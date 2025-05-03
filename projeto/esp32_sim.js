const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:8080");

let motor1 = { status: "Desligado", rotacoes: 0 };
let motor2 = { status: "Desligado", rotacoes: 0 };

let filaPrioridade = [];
let filaNormal = [];

ws.on("open", () => {
  console.log("ESP32 Simulado conectado ao servidor");
  iniciarProcessamentoDeFila();
  enviarStatusPeriodicamente();
});

ws.on("message", (data) => {
  try {
    const msg = JSON.parse(data);
    if (msg.comando !== undefined && msg.prioridade !== undefined) {
      if (msg.prioridade === 1) {
        filaPrioridade.push(msg.comando);
      } else {
        filaNormal.push(msg.comando);
      }
      exibirFilas();
    }
  } catch (e) {
    console.error("Erro ao processar mensagem:", e);
  }
});

function iniciarProcessamentoDeFila() {
  setInterval(() => {
    let comando = null;

    if (filaPrioridade.length > 0) {
      comando = filaPrioridade.shift();
    } else if (filaNormal.length > 0) {
      comando = filaNormal.shift();
    }

    if (comando) {
      executarComando(comando);
    }

    exibirFilas();
  }, 2000);
}

function executarComando(comando) {
  console.log(`\n✅ Executando comando: ${comando}`);

  switch (comando) {
    case "motor1_horario":
    case "motor1_antihorario":
      motor1.status = "Ligado";
      motor1.rotacoes += 1;
      break;

    case "motor2_horario":
    case "motor2_antihorario":
      motor2.status = "Ligado";
      motor2.rotacoes += 1;
      break;

    case "parar":
      motor1.status = "Desligado";
      motor2.status = "Desligado";
      break;

    case "frente":
    case "re":
    case "esquerda":
    case "direita":
      motor1.status = "Ligado";
      motor2.status = "Ligado";
      motor1.rotacoes += 1;
      motor2.rotacoes += 1;
      break;

    default:
      console.log("⚠️ Comando não reconhecido");
  }

  exibirEstadoMotores();
}

function enviarStatusPeriodicamente() {
  setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          motor1: motor1,
          motor2: motor2,
        })
      );
    }
  }, 3000);
}

function exibirFilas() {
  console.log(`\n📋 Fila de Prioridade: [${filaPrioridade.join(", ")}]`);
  console.log(`📋 Fila Normal:       [${filaNormal.join(", ")}]`);
}

function exibirEstadoMotores() {
  console.log(`
🔧 Estado Atual dos Motores:
🔹 Motor 1: ${motor1.status} | Rotações: ${motor1.rotacoes}
🔹 Motor 2: ${motor2.status} | Rotações: ${motor2.rotacoes}
`);
}
