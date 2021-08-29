<h1 align="center">
  Atividade Avaliativa 03
</h1>

<h4 align="center">
  Relatório da Terceira Atividade Avaliativa
</h4>

<p align="center">
  <a href="#instruções">Instruções</a> •
  <a href="#explicação">Explicação</a> •
  <a href="#código">Código</a> •
  <a href="#compilação">Compilação</a> •
  <a href="#créditos">Créditos</a> •
  <a href="#license">Licença</a>
</p>

<p align="center">
  <img src="https://i.imgur.com/K0E5iFC.jpg">
</p>

## Instruções

Deve elaborar um relatório explicando os principais pontos de funcionamento com seguintes arquivos em separado (o Moodle permite a inserção de mais de um arquivo, não é necessário compactar os arquivos:

- Relatório da prática, conforme explicação acima;
- Programa fonte .ino;
- Foto do resultado do programa (monitor serial).

## Explicação

O código abaixo foi disponibilizado pelo professor através da plataforma moodle do CEFET/RJ. Segue os pontos principais do código:

- ```myHostname```
  - Configura o nome do dispositivo na rede
- ```SSID```
  - Configura o SSID (Nome da rede) do ESP8266
- ```PASSWORD```
  - Configura a senha para entrar na rede do ESP8266
- ```init_WifiAp()```
  - Tenta iniciar em modo normal, caso contrário continua como *Access Point*
- ```setup```
  - Inicia as configurações do ESP8266 e tenta entrar em modo normal
- ```loop```
  - Caso entre em modo normal só retorna caso não, entra em modo *Access Point* e espera uma conexão manual pelo *WiFiManager*

## Código

Código utilizado na compilação:

```cpp
#include <ESP8266WiFi.h> // Inclui a biblioteca
#include <WiFiManager.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>

//Variáveis e objetos globais
WiFiClient espClient; // Cria o objeto espClient

// WIFI
const char *myHostname = "escolha_um_nome"; // Nome do host na rede
const char *SSID = "escolha_um_nome";       // SSID / nome da rede WI-FI (AP) do WiFiManager
const char *PASSWORD = "teste-ap";          // Senha da rede WI-FI (AP) do WiFiManager

void init_WifiAp()
{
  WiFi.hostname(myHostname);
  WiFiManager wifiManager;

  //wifiManager.resetSettings(); //Usado para resetar sssid e senhas armazenadas

  wifiManager.autoConnect(SSID, PASSWORD);
  Serial.print("Conectado com sucesso na rede via WifiManager na rede: ");
  Serial.println(WiFi.SSID());
  Serial.println();
  Serial.print("IP obtido: ");
  Serial.print(WiFi.localIP()); // mostra o endereço IP obtido via DHCP
  Serial.println();
  Serial.print("Endereço MAC: ");
  Serial.print(WiFi.macAddress()); // mostra o endereço MAC do esp8266
}

void setup()
{
  Serial.begin(115200); // observe a velocidade de conexão com o terminal
  init_WifiAp();        // inicia o WiFiManager
}

void loop()
{
  if (WiFi.status() == WL_CONNECTED) return;

  WiFi.hostname(myHostname);
  WiFi.begin(); // Conecta na rede WI-FI

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(100);
    Serial.print(".");

    Serial.println();
    Serial.print("Conectado com sucesso na rede: ");
    Serial.print(SSID);
    Serial.println();
    Serial.print("IP obtido: ");
    Serial.print(WiFi.localIP()); // mostra o endereço IP obtido via DHCP
    Serial.println();
    Serial.print("Endereço MAC: ");
    Serial.print(WiFi.macAddress()); // mostra o endereço MAC do esp8266
  }
}
```

## Compilação

![aa_03](https://i.imgur.com/yVNQ7p6.png)

## Créditos

Esse repositório utiliza os seguintes projetos de código aberto:

- [Arduino](https://github.com/arduino/Arduino)
- [ESP8266 core for Arduino](https://github.com/esp8266/Arduino)
- [WiFiManager](https://github.com/tzapu/WiFiManager)
- [Python](https://www.python.org/)

## License

MIT

---

> [Acesse meu site](https://cassiofernando.netlify.app/) &nbsp;&middot;&nbsp;
> GitHub [@cassiofb-dev](https://github.com/cassiofb-dev) &nbsp;&middot;&nbsp;
> Twitter [@cassiofb_dev](https://twitter.com/cassiofb_dev)
