const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

const saveSubscription = async (name, subscription) => {
    console.log("Sending req to server")
    const response = await fetch('https://cool-website.my.to/services/pvc/status/subscribe/' + name, {
        method: 'post',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(subscription)
    })
    
    console.log("Req sent!")

    return await response.json()
}

self.addEventListener("message", async (e) => {
    if (e.data.startsWith("subscribe;;")) {
        console.log("Subscribing now!")
        const subscription = self.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BAMEl2FKZtOIVF-Jy3TbZNsfUppaYaq_UCvXTYWR1AfciuX-ms9iIQOP5Mi07MH3Wv1CRjfWr21JJLEdRP1f0Y4")
        })
        console.log(subscription);
        console.log(await subscription)
        console.log("Registered with push manager")
        const response = await saveSubscription(e.data.split("subscribe;;")[1], subscription)
        console.log(response)
    } else if(e.data.startsWith("unsubscribe;;")) {
        let x = await (await fetch("https://cool-website.my.to/services/pvc/status/unsubscribe/" + e.data.split("subscribe;;")[1], {method: "post"})).json();
        console.log(x);
        return x;
    } else {
        return "Invalid message payload :("
    }
})

self.addEventListener("activate", async (e) => {
    return "Ready! :)"
})

self.addEventListener("push", e => {
    self.registration.showNotification("PVC Status Alert", { body: e.data.text(), badge: "./pvc-96x.png" })
})