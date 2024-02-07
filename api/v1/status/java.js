const mcs = require('node-mcstatus');
const ip = "mc.peacefulvanilla.club";
const port = 25565;
export default async function handler(req, res) {
    let reqtime = Date.now();
    mcs.statusJava(ip, port, {}).then((status) => {
        if (!status.online) return res.json({ color: "red", btncolor: "danger", online: false, text: "Java access offline!" });
        return res.json({ color: "green", btncolor: "success", online: true, text: "Java is online!", additionalInfo: { responsetime: (status.retrieved_at - reqtime), version: status.version.name_html, players: status.players.online, motd: status.motd.html } });
    })
    .catch((error) => {
        console.error(error)
        return res.json({ color: "red", btncolor: "warning", online: false, text: "Might not be offline! Unable to contact status checker server!" })
    })
}