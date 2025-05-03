# 🤖 Robô Marcapasso Controlado via WebSocket 📡

Este projeto implementa um sistema de controle remoto para o robô Marcapasso, utilizando comunicação WebSocket com um simulador do microcontrolador ESP32 🌐. O sistema é composto por uma interface web que envia comandos (frente, ré, esquerda, direita, parar) e um servidor WebSocket que gerencia a comunicação com um simulador do ESP32, controlando dois motores de passo 🚗. A comunicação é bidirecional, com suporte a uma fila de comandos com prioridade para mensagens críticas, como emergências 🚨.

## ✨ Funcionalidades

- Comunicação em tempo real via WebSocket 📶.
- Controle de movimentos do robô: frente ⬆️, ré ⬇️, esquerda ⬅️, direita ➡️, parar ⏹️.
- Controle individual dos motores: horário e anti-horário 🔄.
- Modo de emergência com priorização de comandos 🚨.
- Feedback visual na interface web com estados e rotações dos motores 📊.
- Fila de comandos com suporte a prioridade no servidor e no simulador ESP32 🕒.

## 📂 Estrutura do Projeto

O projeto está organizado em três arquivos principais:

- `index.html` 📄: Interface web para controle do robô, com botões, joystick virtual e feedback visual.
- `server.js` 📜: Servidor WebSocket em Node.js, responsável por gerenciar conexões e filas de comandos.
- `esp32_sim.js` 📝: Simulador do ESP32, que processa comandos e retorna estados simulados dos motores.

## 🛠️ Requisitos

### ⚙️ Hardware

- Computador para executar o servidor e o simulador 🖥️.
- **Nota**: Este projeto utiliza um simulador do ESP32 (`esp32_sim.js`). Para implementação física, seria necessário:
  - ESP32 (ex.: ESP32-WROOM-32) 🖥️.
  - 2x Motores de passo (ex.: NEMA 17) 🔧.
  - 2x Drivers de motor de passo (ex.: ULN2003 ou DRV8825) 🔌.
  - Fonte de alimentação (5V para ESP32, 12V para motores, se necessário) 🔋.

### 💾 Software

- Node.js (versão 18.x ou superior) 🖥️.
- Bibliotecas Node.js:
  - `ws` (WebSocket para Node.js, instalada via npm) 📦.
- Navegador web moderno (ex.: Chrome, Firefox) para acessar a interface 🌐.
- Visual Studio Code (ou outra IDE) para edição de código 📝.
- npm para gerenciamento de dependências 📚.

## 🔧 Configuração do Sistema

O sistema opera em três camadas: interface web, servidor WebSocket e simulador ESP32. A comunicação ocorre via WebSocket na porta 8080.

- **Interface Web** (`index.html`): Hospedada localmente ou em um servidor web, conecta-se ao servidor WebSocket para enviar comandos e receber atualizações.
- **Servidor WebSocket** (`server.js`): Gerencia conexões do cliente web e do ESP32, organizando comandos em uma fila com prioridade.
- **Simulador ESP32** (`esp32_sim.js`): Emula o comportamento do ESP32, processando comandos e retornando estados simulados dos motores.

## 🚀 Instruções de Instalação

1. **Clone o Repositório** 📥:

   ```bash
   git clone https://github.com/seu-usuario/robo-marcapasso-websocket.git
   cd robo-marcapasso-websocket
   ```

2. **Instale as Dependências** 📦:

   Instale a biblioteca `ws` para Node.js:

   ```bash
   npm install ws
   ```

3. **Execute o Servidor WebSocket** 🌐:

   Inicie o servidor na porta 8080:

   ```bash
   node server.js
   ```

   O terminal exibirá: `Servidor WebSocket iniciado na porta 8080`.

4. **Execute o Simulador ESP32** 🤖:

   Em outro terminal, inicie o simulador:

   ```bash
   node esp32_sim.js
   ```

   O terminal exibirá: `Conectado ao servidor WebSocket`.

5. **Hospede a Interface Web** 🌍:

   - Copie o arquivo `index.html` para um servidor web local (ex.: usando `http-server` do Node.js) ou abra diretamente no navegador com um servidor simples:

     ```bash
     npm install -g http-server
     http-server -p 8000
     ```

   - Acesse `http://localhost:8000/index.html` no navegador.

## 🎮 Como Usar

1. **Inicie o Sistema** 🌟:

   - Certifique-se de que o servidor (`server.js`) e o simulador (`esp32_sim.js`) estão em execução.
   - Abra a interface web no navegador.

2. **Controle o Robô** 🚗:

   - **Controles Individuais**: Use os botões para girar os motores no sentido horário ou anti-horário (ex.: "Motor 1 Horário", "Motor 2 Anti-Horário").
   - **Joystick Virtual**: Clique nos botões de direção (⬆️, ⬇️, ⬅️, ➡️) para mover o robô ou ⏹️ para parar.
   - **Parar Tudo**: Clique em "Parar Ambos os Motores" para desligar os motores.
   - **Modo Emergência**: Marque o checkbox "Emergência" para priorizar comandos, ativando uma sirene visual 🚨.
   - A interface exibe o estado dos motores (🟢 Ligado, 🔴 Desligado) e rotações simuladas 📊.

3. **Monitore a Comunicação** 📢:

   - No terminal do `server.js`, veja as conexões de clientes e do ESP32, além do processamento da fila de comandos.
   - No terminal do `esp32_sim.js`, acompanhe os comandos recebidos e as respostas enviadas.

## 🌟 Possíveis Melhorias

- Integrar com um ESP32 físico para controle real dos motores 🤖.
- Adicionar descarte automático de comandos antigos com base em temporizador ⏲️.
- Implementar autenticação no servidor WebSocket para maior segurança 🔒.
- Adicionar gráficos na interface web para visualização das rotações dos motores 📈.
- Suportar múltiplos clientes web controlando o robô simultaneamente 🌐.

## 📜 Licença

Este projeto está licenciado sob a MIT License. Sinta-se à vontade para usar, modificar e compartilhar! 🎉

---

Feito por: Marlon Victor Bezerra dos Passos 🚀
