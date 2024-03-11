export default async function handler(req, res) {
  res.json({ btncolor: "danger", online: false, text: "Unable to fetch status", responsetime: 0})
    //let pre = Date.now();
    //let status = await fetch("https://authserver.mojang.com/");
    //let post = Date.now();
    //res.json({ btncolor: status.ok ? "success" : "danger", online: status.ok, text: status.statusText, responsetime: post - pre})
  }