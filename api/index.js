const app = require('express')();
const mcs = require("node-mcstatus")
// Fetch delay in seconds
const fetchDelay = 30;
let lastresponses = {
  java: {},
  bedrock: {},
  mojang: {},
  map: {}
}
let serverdetails = {
  java: {
    ip: "mc.peacefulvanilla.club",
    port: 25565
  },
  bedrock: {
    ip: "bedrock.peacefulvanilla.club",
    port: 19132
  }
}

setInterval(() => {
  // Fetch Bedrock.
  //fetch("/api/test")


  // Then java
  let reqtime2 = Date.now();
  mcs.statusJava(serverdetails.java.ip, serverdetails.java.port).then((status) => {
    if (!status.online) lastresponses.bedrock = { color: "red", online: false, text: "Java access offline!" };
    lastresponses.bedrock = { color: "green", online: true, text: "Java is online!", additionalInfo: { responsetime: (status.retrieved_at - reqtime2), version: status.version.name, players: status.players.online, motd: status.motd.html } };
  })
    .catch((error) => {
      lastresponses.bedrock = { color: "red", online: false, text: "Unable to contact status checker server!" }
    })
}, 1000 * 2)

app.get('/api', (req, res) => {
  res.json({ status: "OK", paths: ["/v1"] })
});

app.get('/api/v1', (req, res) => {
  res.json({ status: "OK", paths: ["/status", "/statistics"] })
});

app.get('/api/v1/status', (req, res) => {
  res.json({ status: "OK", paths: ["/bedrock", "/java", "/map", "/mojang", "/website"] })
});

app.get('/api/v1/statistics', (req, res) => {
  res.json({ status: "OK", paths: ["/1h", "/24h", "/responsetime", "/uptime1m"] })
});

const { Client, Server, PacketPriority } = require('raknet-native')
app.get("/api/v2/test", async (req, res) => {

  const client = new Client('bedrock.peacefulvanilla.club', 19132, "minecraft")
  client.on("connect", () => {
    console.log("Connected!")
    client.on("encapsulated", (buffer) => {
      console.log("Got it!")
      res.send(buffer.toString());
    })
  })
  console.log("Hello!")
  await client.connect();
  console.log("Connected!")
})

module.exports = app;