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

1 - Elaborar um relatório explicando os principais pontos de funcionamento OTA baseado na prática 3 com seguintes arquivos em separado. O Moodle permite a inserção de mais de um arquivo, não é necessário compactar os arquivos:

- Relatório da prática, conforme explicação acima;
- Programa fonte .ino;
- Foto do resultado do programa (monitor serial).

2 - Elaborar um programa incluindo o WifiManager + OTA
explicando os principais pontos de funcionamento OTA baseado na prática 3 com seguintes arquivos em separado. O Moodle permite a inserção de mais de um arquivo, não é necessário compactar os arquivos:

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
- ```initSerial()```
  - Inicia o serial com as configurações necessárias
- ```init_Wifi()```
  - Mostra a rede que irá ser feita a conexão e aguarda a mesma
- ```reconectWiFi()```
  - Inicia a conexão e aguarda a mesma, no final printa as informações da conexão
- ```initOTA()```
  - Configura e inicia uma conexão OTA
- ```setup```
  - Inicia as configurações do ESP8266
- ```loop```
  - Mantém a conexão WiFi e OTA

## Código

Código utilizado na compilação:

```cpp
#include <ESP8266WiFi.h> // Importa a Biblioteca ESP8266WiFi

#include <ESP8266mDNS.h>
#include <ArduinoOTA.h>



//defines - mapeamento de pinos do NodeMCU
#define D0    16
#define D1    5
#define D2    4
#define D3    0
#define D4    2
#define D5    14
#define D6    12
#define D7    13
#define D8    15
#define D9    3
#define D10   1




// WIFI
const char* myHostname = "escolha_um_nome"; // Nome do host na rede
const char* SSID = "bangu-2"; // SSID / nome da rede WI-FI que deseja se conectar
const char* PASSWORD = "14101999-Bangu-2"; // Senha da rede WI-FI que deseja se conectar



//Prototypes"
void initSerial();
void initWiFi();
void initOTA();
void initMQTT();
void reconectWiFi();
void InitOutput(void);

/*
 *  Implementações das funções
 */
void setup()
{
    //inicializações:
    initSerial();
    initWiFi();
    initOTA();
    Serial.println("Programa carregado");
}


//Função: inicializa comunicação serial com baudrate 115200 (para fins de monitorar no terminal serial
//        o que está acontecendo.
//Parâmetros: nenhum
//Retorno: nenhum
void initSerial()
{
    Serial.begin(115200);
}


//Função: inicializa e conecta-se na rede WI-FI desejada
//Parâmetros: nenhum
//Retorno: nenhum
void initWiFi()
{
    delay(10);
    Serial.println("------Conexao WI-FI------");
    Serial.print("Conectando-se na rede: ");
    Serial.println(SSID);
    Serial.println("Aguarde");

    reconectWiFi();
}



//Função inicializa OTA - permite carga do novo programa via Wifi
void initOTA()
{
  Serial.println();
  Serial.println("Iniciando OTA....");
  ArduinoOTA.setHostname("pratica-4"); // Define o nome da porta

  // No authentication by default
   ArduinoOTA.setPassword((const char *)"teste-ota"); // senha para carga via WiFi (OTA)
  ArduinoOTA.onStart([]() {
    Serial.println("Start");
  });
  ArduinoOTA.onEnd([]() {
    Serial.println("\nEnd");
  });
  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
  });
  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("Error[%u]: ", error);
    if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
    else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
    else if (error == OTA_END_ERROR) Serial.println("End Failed");
  });
  ArduinoOTA.begin();
}



//Função: reconecta-se ao WiFi
//Parâmetros: nenhum
//Retorno: nenhum
void reconectWiFi()
{
    //se já está conectado a rede WI-FI, nada é feito.
    //Caso contrário, são efetuadas tentativas de conexão
    if (WiFi.status() == WL_CONNECTED)
        return;

    WiFi.hostname(myHostname);  // define o nome do dispositivo na rede
                                // caso não seja definido o host assumirá o nome padrão do dispositivo
    WiFi.begin(SSID, PASSWORD); // Conecta na rede WI-FI

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(100);
        Serial.print(".");
    }

    Serial.println();
    Serial.print("Conectado com sucesso na rede: ");
    Serial.print(SSID);
    Serial.println();
    Serial.print("IP obtido: ");
    Serial.print(WiFi.localIP());  // mostra o endereço IP obtido via DHCP
    Serial.println();
    Serial.print("Endereço MAC: ");
    Serial.print(WiFi.macAddress()); // mostra o endereço MAC do esp8266
}





//programa principal
void loop()
{
    reconectWiFi(); //garante funcionamento da conexão WiFi
    ArduinoOTA.handle(); // keep-alive da comunicação OTA
}

```

## Compilação

![aa_04](https://i.imgur.com/BbgiKtg.png)

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
