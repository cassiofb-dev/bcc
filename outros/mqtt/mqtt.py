import random, time, threading
import paho.mqtt.client as mqtt

def on_message(mqttc, obj, msg):
    print({"topic": msg.topic, "payload": msg.payload})

temperatura = mqtt.Client()
temperatura.on_message = on_message

temperatura.connect("test.mosquitto.org", 1883, 60)
temperatura.subscribe("umidade", 0)

umidade = mqtt.Client()
umidade.on_message = on_message

umidade.connect("test.mosquitto.org", 1883, 60)
umidade.subscribe("temperatura", 0)

temperatura_thread = threading.Thread(target=temperatura.loop_forever)
umidade_thread = threading.Thread(target=umidade.loop_forever)

temperatura_thread.start()
umidade_thread.start()

while True:
    time.sleep(1)
    if random.random() < 0.4:
        temperatura.publish("umidade", "temperatura publicando no topico umidade")
    if random.random() < 0.3:
        umidade.publish("temperatura", "umidade publicando no topico temperatura")