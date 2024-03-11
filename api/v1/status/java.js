const util = require("minecraft-server-util");
const ip = "mc.peacefulvanilla.club";
const port = 25565;
export default async function handler(req, res) {
    let reqtime = Date.now();
    const options = {
        timeout: 1000 * 5 // timeout in milliseconds
    };
    // The port and options arguments are optional, the
    // port will default to 25565 and the options will
    // use the default options.
    try {
        let status = await util.status(ip, port, options)
        res.json({ color: "green", btncolor: "success", online: true, text: "Java is online!", additionalInfo: { responsetime: (status.retrieved_at - reqtime), version: status.version.name_html, players: status.players.online, motd: status.motd.html } });
    } catch (error) {
        console.error("[Java Checker] Encountered an Error - " + error)
        return res.json({ color: "red", btncolor: "danger", online: false, text: "Couldn't connect to Java! - " + error })
    };

}