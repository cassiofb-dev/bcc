<h1 align="center">
  Atividade Avaliativa 01
</h1>

<h4 align="center">
  Relatório da Primeira Atividade Avaliativa
</h4>

<p align="center">
  <a href="#instruções">Instruções</a> •
  <a href="#instalação">Instalação</a> •
  <a href="#código">Código</a> •
  <a href="#compilação">Compilação</a> •
  <a href="#créditos">Créditos</a> •
  <a href="#license">Licença</a>
</p>

<p align="center">
  <img src="https://i.imgur.com/K0E5iFC.jpg">
</p>

## Instruções

O que dever postado como arquivo (total 3):

- Relatório explicando como foi feita a instalação da IDE do Arduino incluindo a inclusão da biblioteca do ESP8266
- Programa .ino (arquivo de extensão da IDE do Arduino) utilizado na compilação
- Foto da tela indicando que a compilação foi feita com êxito ("Compilação terminada") ou para os que já tiverem o ESP8266 foto da tela do monitor serial com resultado do programa.

## Instalação

Passo a passo para executar e compilar esse código:

### Instalação do [Chocolatey](https://chocolatey.org/install)

Chocolatey é um gerenciador de pacote para o Windows e com ele ficará bem mais fácil instalar, organizar e atualizar todos os pacotes.

Para instalar pelo terminal execute os comandos em ordem:

```sh
Set-ExecutionPolicy AllSigned or Set-ExecutionPolicy Bypass -Scope Process
```

```sh
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

### Instalação pelo Chocolatey

Após instalar o chocolatey podemos instalar os pacotes necessários para o programa em si.

Rode os comandos na seguinte ordem:

```sh
choco install arduino
```

```sh
choco install python
```

### Instalando o ESP8266

[Segundo ao guia oficial:](https://arduino-esp8266.readthedocs.io/en/3.0.2/installing.html)

> Start Arduino and open Preferences window.
>
> Enter ``https://arduino.esp8266.com/stable/package_esp8266com_index.json`` into Additional Board Manager URLs field. You can add multiple URLs, separating them with commas.
>
> Open Boards Manager from Tools > Board menu and find esp8266 platform.
>
> Select the version you need from a drop-down box.
>
> Click install button.
>
> Don’t forget to select your ESP8266 board from Tools > Board menu after installation.

Tradução:

- Abra o Arduino e depois a *Preferences window*.
- Digite ``https://arduino.esp8266.com/stable/package_esp8266com_index.json`` no campo *Additional Board Manager URLs*.
- Abra *Boards Manager* em *Tools - Board menu* e ache *esp8266 platform*.
- Selecione a versão que você precisa pela caixa de seleção.
- Clique no botão de instalar.
- Não esqueça de selecionar seu *ESP8266 board* em *Tools > Board menu* depois da instalação.

## Código

Código utilizado na compilação:

```cpp
// Importa a biblioteca de WiFi do módulo ESP8266
#include <ESP8266WiFi.h>

// Função de configuração do serial
void setup()
{
  Serial.begin(115200); // Configura a taxa de transmição do serial para 115200bps (bis por segundo)
  Serial.println();     // Pula uma linha XD

  WiFi.begin("nome-da-rede", "senha-da-rede");  // Configura o nome e senha do WiFi

  Serial.print("Conectando");                   // Avisa começo de tentativa de conexão
  while (WiFi.status() != WL_CONNECTED)         // Tenta conectar várias vezes
  {
    delay(500);                                 // Espera 500ms para tentar novamente
    Serial.print(".");                          // Printa um "." XD
  }
  Serial.println();                             // Printa uma linha XD

  Serial.print("Connected, IP address: ");      // Avisa quando conecta e o endereço de ip
  Serial.println(WiFi.localIP());               // Printa o endereço de ip do módulo ESP
}

void loop() {}  // Faz nada por enquanto XD
```

## Compilação

![aa_01](https://i.imgur.com/TM8uYlG.png)

## Créditos

Esse repositório utiliza os seguintes projetos de código aberto:

- [Arduino](https://github.com/arduino/Arduino)
- [ESP8266 core for Arduino](https://github.com/esp8266/Arduino)
- [Python](https://www.python.org/)

## License

MIT

---

> [Acesse meu site](https://cassiofernando.netlify.app/) &nbsp;&middot;&nbsp;
> GitHub [@cassiofb-dev](https://github.com/cassiofb-dev) &nbsp;&middot;&nbsp;
> Twitter [@cassiofb_dev](https://twitter.com/cassiofb_dev)
