export default async function handler(req, res) {
    let pre = Date.now();
    let status = await fetch("https://web.peacefulvanilla.club/maps/tiles/players.json", {
      
    });
    let post = Date.now();
    let stuff;
    try {
      stuff = await status.json();
    } catch(e) {
      stuff = {};
    }
    res.json({ btncolor: status.ok ? "success" : "danger", online: status.ok, text: status.statusText, responsetime: post - pre, additionalInfo: stuff})
  }