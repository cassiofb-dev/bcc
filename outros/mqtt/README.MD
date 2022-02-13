# Implementação MQTT

Ao rodar o arquivo ``mqqt.py``, acontece o seguinte:

1. É definida uma função executada sempre que um cliente recebe uma mensagem
2. Configura o cliente temperatura:
   1. Define função a ser chamada quando recebe mensagem
   2. Conecta no broker Mosquitto
   3. Subscreve no tópico umidade
3. Configura o cliente umidade:
   1. Define função a ser chamada quando recebe mensagem
   2. Conecta no broker Mosquitto
   3. Subscreve no tópico temperatura
4. Cria uma thread para executar o cliente temperatura
5. Cria uma thread para executar o cliente umidade
6. Na thread principal ocorre:
   1. Uma pausa de 1 segundo
   2. 40% de Chance do cliente temperatura publicar uma mensagem para o cliente umidade
   3. 30% de Chance do cliente umidade publicar uma mensagem para o clinete temperatura

## Observação

Foi feito apenas um arquivo pois o código é relativamente curto (30 linhas e de fácil compreensão). E também ao forçar 3 processos em um arquivo python, precisei reforçar os aprendizados do exercício passado através da biblioteca ``threading`` do python.
