<h1 align="center">
  Atividade Avaliativa 05
</h1>

<h4 align="center">
  Relatório da Quinta Atividade Avaliativa
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

1 - Elaborar um programa incluindo o protocolo MQTT explicando os principais pontos de funcionamento do MQTT baseado na prática 4 com seguintes arquivos em separado. Quem não tiver adquirido o sensor DHT11, pode usar o LED acionando remotamente utilizando o broker público. O Moodle permite a inserção de mais de um arquivo, não é necessário compactar os arquivos:

- Relatório da prática, conforme explicação acima;
- Programa fonte .ino;
- Foto do resultado do programa (monitor serial).

## Explicação

O MQTT é um protocolo de transimissão de mensagens leve e otimizados para sensores e dispositivos mobile. Essa troca de mensagens é realizada através do esquema [Publicador-Subscritor](https://pt.wikipedia.org/wiki/Observer) onde um subscritor pode se inscrever em um tópico para ouvir as mudanças passadas por um publicador.

O código abaixo foi disponibilizado pelo professor através da plataforma moodle do CEFET/RJ. Segue os pontos principais do código:

- ```TOPICO_SUBSCRIBE_P1```
  - Váriavel para armazenar o nome do tópico para escuta
- ```ID_MQTT```
  - Configura o ID do broker (como é uma sessão deve ser único por cliente)
- ```USER_MQTT```
  - Configura o login do user do MQTT
- ```SSID```
  - Nome da rede para conexão
- ```PASSWORD```
  - Senha da rede para conexão
- ```BROKER_MQTT```
  - URL do broker
- ```BROKER_PORT```
  - Porta a ser utilizada pelo broker
- ```espClient```
  - Armazena o cliente esp
- ```PubSubClient MQTT(espClient)```
  - Instancia um cliente com um espClient
- ```initMQTT()```
  - Configura os parametros de conexão do MQTT
- ```PASS_MQTT```
  - Configura a senha do user do MQTT
- ```MQTT.setServer(BROKER_MQTT, BROKER_PORT);```
  - Configura os parametros do servidor broker
- ```MQTT.setCallback(mqtt_callback);```
  - Configura a função a ser chamada caso escutada alguma coisa do tópico
- ```reconnectMQTT()```
  - Reconecta em caso de perca de conexão ou conecta pela primeira vez
- ```VerificaConexoesWiFIEMQTT```
  - Tenta manter a conexão do WiFi e do broker em pé
- ```PASS_MQTT```
  - Configura a senha do user do MQTT
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
#include <PubSubClient.h> // Importa a Biblioteca PubSubClient

#include <ESP8266mDNS.h>
//#include <WiFiUdp.h>
#include <ArduinoOTA.h>


//defines de id mqtt e tópicos para publicação e subscribe

#define TOPICO_SUBSCRIBE_P1 "pratica-4/LED"     //tópico MQTT de escuta luz 1



                                                   
#define ID_MQTT  "meu_ID"     //id mqtt (para identificação de sessão)
                               //IMPORTANTE: este deve ser único no broker (ou seja, 
                               //            se um client MQTT tentar entrar com o mesmo 
                               //            id de outro já conectado ao broker, o broker 
                               //            irá fechar a conexão de um deles).

#define USER_MQTT  "login"   // usuario no MQTT
#define PASS_MQTT  "senha"  // senha no MQTT 

                               
 
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
const char* SSID = "bangu-2"; // SSID / nome da rede WI-FI que deseja se conectar
const char* PASSWORD = "14101999-Bangu-2"; // Senha da rede WI-FI que deseja se conectar
 
// MQTT
const char* BROKER_MQTT = "broker.hivemq.com"; //URL do broker MQTT que se deseja utilizar
int BROKER_PORT = 1883; // Porta do Broker MQTT
 
 
//Variáveis e objetos globais
WiFiClient espClient; // Cria o objeto espClient
PubSubClient MQTT(espClient); // Instancia o Cliente MQTT passando o objeto espClient

 
//Prototypes"
void initSerial();
void initWiFi();
void initOTA();
void initMQTT();
void reconectWiFi(); 
void mqtt_callback(char* topic, byte* payload, unsigned int length);
void VerificaConexoesWiFIEMQTT(void);
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
    initMQTT();
    InitOutput();

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
 
//Função: inicializa parâmetros de conexão MQTT(endereço do 
//        broker, porta e seta função de callback)
//Parâmetros: nenhum
//Retorno: nenhum
void initMQTT() 
{
    MQTT.setServer(BROKER_MQTT, BROKER_PORT);   //informa qual broker e porta deve ser conectado
    MQTT.setCallback(mqtt_callback);            //atribui função de callback (função chamada quando qualquer informação de um dos tópicos subescritos chega)
}
 
//Função: função de callback 
//        esta função é chamada toda vez que uma informação de 
//        um dos tópicos subescritos chega)
//Parâmetros: nenhum
//Retorno: nenhum
void mqtt_callback(char* topic, byte* payload, unsigned int length) 
{
    String msg;
 
    //obtem a string do payload recebido
    for(int i = 0; i < length; i++) 
    {
       char c = (char)payload[i];
       msg += c;
      
    }

    Serial.println("msg = " +  msg);

   if (msg.equals("ON")) // liga led
   {
      digitalWrite(D1, HIGH);
      Serial.println("Ligado led");
   }

   if (msg.equals("OFF"))
   {
      digitalWrite(D1, LOW);
      Serial.println("Desligado led");
   }   

 
}

 
//Função: reconecta-se ao broker MQTT (caso ainda não esteja conectado ou em caso de a conexão cair)
//        em caso de sucesso na conexão ou reconexão, o subscribe dos tópicos é refeito.
//Parâmetros: nenhum
//Retorno: nenhum
void reconnectMQTT() 
{
    while (!MQTT.connected()) 
    {
        Serial.print("* Tentando se conectar ao Broker MQTT: ");
        Serial.println(BROKER_MQTT);
//        if (MQTT.connect(ID_MQTT, USER_MQTT,PASS_MQTT)) // parameros usados para broker proprietário
                                                          // ID do MQTT, login do usuário, senha do usuário
 
           if (MQTT.connect(ID_MQTT))
        {
            Serial.println("Conectado com sucesso ao broker MQTT!");
            MQTT.subscribe(TOPICO_SUBSCRIBE_P1);
 
        } 
        else 
        {
            Serial.println("Falha ao reconectar no broker.");
            Serial.println("Havera nova tentatica de conexao em 2s");
            delay(2000);
        }
    }
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

 
//Função: verifica o estado das conexões WiFI e ao broker MQTT. 
//        Em caso de desconexão (qualquer uma das duas), a conexão
//        é refeita.
//Parâmetros: nenhum
//Retorno: nenhum
void VerificaConexoesWiFIEMQTT(void)
{
    if (!MQTT.connected()) 
        reconnectMQTT(); //se não há conexão com o Broker, a conexão é refeita
    
     reconectWiFi(); //se não há conexão com o WiFI, a conexão é refeita
}
 
 
//Função: inicializa o output em nível lógico baixo
//Parâmetros: nenhum
//Retorno: nenhum
void InitOutput(void)
{
    //enviar HIGH para o output faz o Led acender / enviar LOW faz o Led apagar)
    
    pinMode(D1, OUTPUT);
    digitalWrite(D1, LOW);
              
}

 
 
//programa principal
void loop() 
{   
    // keep-alive da comunicação OTA
    ArduinoOTA.handle();

    //garante funcionamento das conexões WiFi e ao broker MQTT
    VerificaConexoesWiFIEMQTT();
    
 
    //keep-alive da comunicação com broker MQTT
    MQTT.loop();
   
}

```

## Compilação

![aa_05](https://i.imgur.com/FpKPTdO.png)

## Créditos

Esse repositório utiliza os seguintes projetos de código aberto:

- [Arduino](https://github.com/arduino/Arduino)
- [ESP8266 core for Arduino](https://github.com/esp8266/Arduino)
- [WiFiManager](https://github.com/tzapu/WiFiManager)
- [Python](https://www.python.org/)
- [Servidor grátis](http://www.mqtt-dashboard.com/)
- [Webclient grátis](http://www.hivemq.com/demos/websocket-client/)

## License

MIT

---

> [Acesse meu site](https://cassiofernando.netlify.app/) &nbsp;&middot;&nbsp;
> GitHub [@cassiofb-dev](https://github.com/cassiofb-dev) &nbsp;&middot;&nbsp;
> Twitter [@cassiofb_dev](https://twitter.com/cassiofb_dev)
