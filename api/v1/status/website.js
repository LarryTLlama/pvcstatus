export default async function handler(req, res) {
    let pre = Date.now();
    let status = await fetch("https://peacefulvanilla.club/?s=");
    let post = Date.now();
    res.json({ btncolor: status.ok ? "success" : "danger", online: status.ok, text: status.statusText, responsetime: post - pre})
  }