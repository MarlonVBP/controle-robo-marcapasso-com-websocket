const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

let clientes = [];
let esp32 = null;
let filaComandos = [];

let motores = {
  motor1: {
    status: "Desligado",
    rotacoes: 0,
  },
  motor2: {
    status: "Desligado",
    rotacoes: 0,
  },
};

console.log("Servidor WebSocket iniciado na porta 8080");

wss.on("connection", function connection(ws) {
  console.log("Novo cliente conectado");

  if (!esp32) {
    esp32 = ws;
    console.log("ESP32 conectado");
  } else {
    clientes.push(ws);
    console.log("Cliente comum conectado");
  }

  ws.on("message", function incoming(message) {
    try {
      const data = JSON.parse(message);

      if (ws === esp32) {
        if (data.motor1 !== undefined) {
          motores.motor1.status = data.motor1.status || motores.motor1.status;
          motores.motor1.rotacoes =
            data.motor1.rotacoes || motores.motor1.rotacoes;
        }
        if (data.motor2 !== undefined) {
          motores.motor2.status = data.motor2.status || motores.motor2.status;
          motores.motor2.rotacoes =
            data.motor2.rotacoes || motores.motor2.rotacoes;
        }

        clientes.forEach((cliente) => {
          if (cliente.readyState === WebSocket.OPEN) {
            cliente.send(
              JSON.stringify({
                status1: motores.motor1.status,
                rotations1: motores.motor1.rotacoes,
                status2: motores.motor2.status,
                rotations2: motores.motor2.rotacoes,
              })
            );
          }
        });
      } else {
        filaComandos.push({
          ws,
          comando: data.comando,
          prioridade: data.prioridade || 0,
        });
        filaComandos.sort((a, b) => b.prioridade - a.prioridade);
      }
    } catch (e) {
      console.error("Erro ao processar mensagem:", e);
    }
  });

  ws.on("close", () => {
    if (ws === esp32) {
      console.log("ESP32 desconectado");
      esp32 = null;
    } else {
      console.log("Cliente comum desconectado");
      clientes = clientes.filter((c) => c !== ws);
    }
  });
});

setInterval(() => {
  if (filaComandos.length > 0 && esp32 && esp32.readyState === WebSocket.OPEN) {
    const { comando, prioridade } = filaComandos.shift();

    switch (comando) {
      case "motor1_horario":
      case "motor1_antihorario":
        motores.motor1.status = "Ligado";
        break;
      case "motor2_horario":
      case "motor2_antihorario":
        motores.motor2.status = "Ligado";
        break;
      case "parar":
        motores.motor1.status = "Desligado";
        motores.motor2.status = "Desligado";
        break;
      case "frente":
      case "re":
      case "esquerda":
      case "direita":
        motores.motor1.status = "Ligado";
        motores.motor2.status = "Ligado";
        break;
      default:
        break;
    }

    clientes.forEach((cliente) => {
      if (cliente.readyState === WebSocket.OPEN) {
        cliente.send(
          JSON.stringify({
            status1: motores.motor1.status,
            rotations1: motores.motor1.rotacoes,
            status2: motores.motor2.status,
            rotations2: motores.motor2.rotacoes,
          })
        );
      }
    });

    esp32.send(JSON.stringify({ comando, prioridade }));
  }
}, 2000);
