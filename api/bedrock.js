const mcs = require('node-mcstatus');
const ip = "bedrock.peacefulvanilla.club";
const port = 19132;
export default async function handler(req, res) {
    let reqtime = Date.now();
    mcs.statusBedrock(ip, port).then((status) => {
        if(!status.online) return res.json({ color: "red", online: false, text: "Bedrock proxy offline!"});
        return res.json({ color: "green", online: true, text: "Bedrock is online!", additionalInfo: {responsetime: (status.retrieved_at - reqtime), version: status.version.name, players: status.players.online, motd: status.motd.html}});
    })
    .catch((error) => {
        return res.json({ color: "red", online: false, text: "Unable to contact status checker server!"})
    })
  }