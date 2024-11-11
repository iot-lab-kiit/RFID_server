import mqtt from "mqtt";
import { checkRFIDTag } from "./checkRfid.js";

const client = mqtt.connect("tcp://broker.mqtt.cool:1883");

client.on("connect", () => {
  client.subscribe("test/topic-priyanshu", (err) => {
    if (err) {
      console.error("Error subscribing to test/topic-priyanshu");
      return;
    }
    console.log("Subscribed to test/topic-priyanshu");
  });
});

client.on("message", async (topic, message) => {
  if (topic === "test/topic-priyanshu") {
    const messageStr = message.toString();
    console.log(`Received message: ${messageStr} on topic: ${topic}`);
    await checkRFIDTag(Number(messageStr));
  }
});
