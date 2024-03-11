const util = require("node-mcstatus");
const ip = "bedrock.peacefulvanilla.club";
const port = 19132;
export default async function handler(req, res) {
    let reqtime = Date.now();
    const options = {
        timeout: 1000 * 5 // timeout in milliseconds
    };
    // The port and options arguments are optional, the
    // port will default to 25565 and the options will
    // use the default options.
    try {
        let status = await util.statusBedrock(ip, port);
        res.json({ color: status.online ? "green" : "red", btncolor: status.online ? "success" : "danger", online: status.online, text: status.online ? "Bedrock is online! :D" : "Bedrock is offline! D:", additionalInfo: { responsetime: (status.retrieved_at - reqtime), version: status.version, players: status.players, motd: status.motd } });
    } catch (error) {
        console.error("[Bedrock Checker] Encountered an Error - " + error)
        return res.json({ color: "orange", btncolor: "warning", online: false, text: "Failed to check server! - " + error })
    };

}