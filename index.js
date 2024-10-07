import mqtt from "mqtt";
import {checkRFIDTag} from "./checkRfid.js";

const client = mqtt.connect("mqtt://broker.mqtt.cool:1883");

client.on("connect", () => {
    console.log("Connected to broker");

    client.subscribe("iot/messages", (err) => {
        if (!err) client.publish("iot/connect", "Device connected and ready");
    });
    client.subscribe("test/topic", (err) => {
        if (err) {
            console.log("Error subscribing to test/topic");
            return;
        }
        console.log("Subscribed to test/topic");

    });
});

client.on("message", async (topic, message) => {
    if (topic === "test/topic") {
        const messageStr = message.toString();
        console.log(`Received message: ${messageStr} on topic: ${topic}`);
        const team = await checkRFIDTag(Number(messageStr));
        if(!team){
            console.log("RFID Tag does not exist.");
            return;
        }

    }
});