let allServers = document.querySelector("#allservers"),
    offlineServers = document.querySelector("#offlineservers");

function getQueueTimeIsh(number) {
    if(!number) return "Unavailable"
    if(number < 22) return `<strong style="color: green;">Low</strong>`
    if(number < 32) return `<strong style="color: orange;">Average</strong>`
    if(number < 42) return `<strong style="color: red;">High</strong>`
    return `<strong style="color: darkred;">Very High</strong>`
}

async function updateStatuses() {
    document.querySelector(".toasty").style.right = "16px";
    console.log("Updating status...")
    let serversoffline = 0,
        bedrock = await (await fetch("/api/v1/status/bedrock")).json(),
        java = await (await fetch("/api/v1/status/java")).json(),
        map = await (await fetch("/api/v1/status/map")).json(),
        website = await (await fetch("/api/v1/status/website")).json(),
        mojang = await (await fetch("/api/v1/status/mojang")).json();

    console.log(bedrock)
    console.log(java)
    console.log(map)
    console.log(mojang)

    // Server Information
    document.querySelector("#serverInfo").innerHTML = `<div class="d-flex text-body-secondary pt-3">
    <div class="pb-3 mb-0 small lh-sm w-100">
            <p class="pb-3 mb-0 small lh-sm border-bottom">
                <span style="display: inline-block;"><strong class="text-gray-dark">MOTD: </strong><span class="motd">${java.additionalInfo?.motd ?? "Unavailable"}</span> </span>
                <strong class="d-block text-gray-dark">Players Online: ${map.additionalInfo?.players?.length ?? "Unavailable"} </strong>
                <strong class="d-block text-gray-dark">Version: ${bedrock.additionalInfo?.version ?? "Unavailable"}  </strong>
                <strong class="d-block text-gray-dark">Estimated Queue Time Status: ${getQueueTimeIsh(map.additionalInfo?.players?.length)}  </strong>
                
            </p>
        </div>
    </div>
    <div class="d-flex text-body-secondary pt-3">
    <div class="pb-3 mb-0 mt-0 small lh-sm w-100">
            <p class="pb-3 mb-0 mt-0 small lh-sm border-bottom">
                <strong class="d-block text-gray-dark">Players Connected:</strong>
                <span>${(map.additionalInfo?.players ?? [] ).map(({ name }) => name).join(", ")}</span>
            </p>
        </div>
    </div>`;
    console.log(map.additionalInfo?.players?.length)
    document.querySelector("#playersOnline").innerText = map.additionalInfo?.players?.length ?? "0";

    // Bedrock
    allServers.innerHTML = ""
    offlineServers.innerHTML = ""
    allServers.innerHTML += `<div class="d-flex text-body-secondary pt-3">
    <div class="pb-3 mb-0 small lh-sm w-100">
        <button style="float: left; margin-right: 5px;" class="btn btn-${bedrock.btncolor}" type="button" enabled>
            <span style="margin-right: 5px;" class="spinner-grow spinner-grow-sm" role="status"
            aria-hidden="true"></span>${bedrock.online ? "Online" : "Offline"}
        </button>
            <p class="pb-3 mb-0 small lh-sm border-bottom">
                <strong class="d-block text-gray-dark">Bedrock Access Proxy</strong>
                ${"Status: " + bedrock.text} 
            </p>
        </div>
    </div>`
    if (!bedrock.online) {
        offlineServers.innerHTML += `<div class="d-flex text-body-secondary pt-3">
    <div class="pb-3 mb-0 small lh-sm w-100">
        <button style="float: left; margin-right: 5px;" class="btn btn-${bedrock.btncolor}" type="button" enabled>
            <span style="margin-right: 5px;" class="spinner-grow spinner-grow-sm" role="status"
            aria-hidden="true"></span>${bedrock.online ? "Online" : "Offline"}
        </button>
            <p class="pb-3 mb-0 small lh-sm border-bottom">
                <strong class="d-block text-gray-dark">Bedrock Access Proxy</strong>
                ${"Status: " + bedrock.text} 
            </p>
        </div>
    </div>`;
        serversoffline++;
    }
    // Java
    if (!java.online) {
        offlineServers.innerHTML += `<div class="d-flex text-body-secondary pt-3">
    <div class="pb-3 mb-0 small lh-sm w-100">
        <button style="float: left; margin-right: 5px;" class="btn btn-${java.btncolor}" type="button" enabled>
            <span style="margin-right: 5px;" class="spinner-grow spinner-grow-sm" role="status"
            aria-hidden="true"></span>${java.online ? "Online" : "Offline"}
        </button>
            <p class="pb-3 mb-0 small lh-sm border-bottom">
                <strong class="d-block text-gray-dark">Java Server Access</strong>
                ${"Status: " + java.text} 
            </p>
        </div>
    </div>`;
        serversoffline++;
    }
    allServers.innerHTML += `<div class="d-flex text-body-secondary pt-3">
    <div class="pb-3 mb-0 small lh-sm w-100">
        <button style="float: left; margin-right: 5px;" class="btn btn-${java.btncolor}" type="button" enabled>
            <span style="margin-right: 5px;" class="spinner-grow spinner-grow-sm" role="status"
            aria-hidden="true"></span>${java.online ? "Online" : "Offline"}
        </button>
            <p class="pb-3 mb-0 small lh-sm border-bottom">
                <strong class="d-block text-gray-dark">Java Server Access</strong>
                ${"Status: " + java.text} 
            </p>
        </div>
    </div>`
    // Map
    allServers.innerHTML += `<div class="d-flex text-body-secondary pt-3">
    <div class="pb-3 mb-0 small lh-sm w-100">
        <button style="float: left; margin-right: 5px;" class="btn btn-${map.btncolor}" type="button" enabled>
            <span style="margin-right: 5px;" class="spinner-grow spinner-grow-sm" role="status"
            aria-hidden="true"></span>${map.online ? "Online" : "Offline"}
        </button>
            <p class="pb-3 mb-0 small lh-sm border-bottom">
                <strong class="d-block text-gray-dark">Pl3xmap (PVC 2D Map)</strong>
                ${map.responsetime ? "Response Time: " + map.responsetime + "ms" : "Status: " + map.text} 
            </p>
        </div>
    </div>`
    if (!map.online) {
        offlineServers.innerHTML += `<div class="d-flex text-body-secondary pt-3">
    <div class="pb-3 mb-0 small lh-sm w-100">
        <button style="float: left; margin-right: 5px;" class="btn btn-${map.btncolor}" type="button" enabled>
            <span style="margin-right: 5px;" class="spinner-grow spinner-grow-sm" role="status"
            aria-hidden="true"></span>${map.online ? "Online" : "Offline"}
        </button>
            <p class="pb-3 mb-0 small lh-sm border-bottom">
                <strong class="d-block text-gray-dark">Pl3xmap (PVC 2D Map)</strong>
                ${map.responsetime ? "Response Time: " + map.responsetime + "ms" : "Status: " + map.text} 
            </p>
        </div>
    </div>`;
        serversoffline++;
    }
    // Mojang
    allServers.innerHTML += `<div class="d-flex text-body-secondary pt-3">
    <div class="pb-3 mb-0 small lh-sm w-100">
        <button style="float: left; margin-right: 5px;" class="btn btn-${mojang.btncolor}" type="button" enabled>
            <span style="margin-right: 5px;" class="spinner-grow spinner-grow-sm" role="status"
            aria-hidden="true"></span>${mojang.online ? "Online" : "Offline"}
        </button>
            <p class="pb-3 mb-0 small lh-sm border-bottom">
                <strong class="d-block text-gray-dark">Mojang Auth Server Status</strong>
                ${mojang.responsetime ? "Response Time: " + mojang.responsetime + "ms" : "Status: " + mojang.text} 
            </p>
        </div>
    </div>`
    if (!mojang.online) {
        offlineServers.innerHTML += `<div class="d-flex text-body-secondary pt-3">
    <div class="pb-3 mb-0 small lh-sm w-100">
        <button style="float: left; margin-right: 5px;" class="btn btn-${mojang.btncolor}" type="button" enabled>
            <span style="margin-right: 5px;" class="spinner-grow spinner-grow-sm" role="status"
            aria-hidden="true"></span>${mojang.online ? "Online" : "Offline"}
        </button>
            <p class="pb-3 mb-0 small lh-sm border-bottom">
                <strong class="d-block text-gray-dark">Mojang Auth Server Status</strong>
                ${mojang.responsetime ? "Response Time: " + mojang.responsetime + "ms" : "Status: " + mojang.text} 
            </p>
        </div>
    </div>`
        serversoffline++;
    }
    // Website
    allServers.innerHTML += `<div class="d-flex text-body-secondary pt-3">
    <div class="pb-3 mb-0 small lh-sm w-100">
        <button style="float: left; margin-right: 5px;" class="btn btn-${website.btncolor}" type="button" enabled>
            <span style="margin-right: 5px;" class="spinner-grow spinner-grow-sm" role="status"
            aria-hidden="true"></span>${website.online ? "Online" : "Offline"}
        </button>
            <p class="pb-3 mb-0 small lh-sm border-bottom">
                <strong class="d-block text-gray-dark">Website - Home Page</strong>
                ${website.responsetime ? "Response Time: " + website.responsetime + "ms" : "Status: " + website.text} 
            </p>
        </div>
    </div>`
    if (!website.online) {
        offlineServers.innerHTML += `<div class="d-flex text-body-secondary pt-3">
    <div class="pb-3 mb-0 small lh-sm w-100">
        <button style="float: left; margin-right: 5px;" class="btn btn-${website.btncolor}" type="button" enabled>
            <span style="margin-right: 5px;" class="spinner-grow spinner-grow-sm" role="status"
            aria-hidden="true"></span>${website.online ? "Online" : "Offline"}
        </button>
            <p class="pb-3 mb-0 small lh-sm border-bottom">
                <strong class="d-block text-gray-dark">Website - Home Page</strong>
                ${website.responsetime ? "Response Time: " + website.responsetime + "ms" : "Status: " + website.text} 
            </p>
        </div>
    </div>`
        serversoffline++;
    }

    if(offlineServers.innerHTML == "") {
        offlineServers.innerHTML += `<div class="d-flex text-body-secondary pt-3">
    <div class="pb-3 mb-0 small lh-sm w-100">
        <button style="float: left; margin-right: 5px;" class="btn btn-success" type="button" enabled>
            <span style="margin-right: 5px;" class="spinner-grow spinner-grow-sm" role="status"
            aria-hidden="true"></span>No servers offline!
        </button>
        </div>
    </div>`
    }

    document.querySelector("#serversoffline").innerText = serversoffline;
    document.querySelector(".toasty").style.right = "-200px";
}

updateStatuses()

let secs = 30;
setInterval(() => {
    secs = (secs == 1 ? 30 : secs - 1);
    if(secs == 30) updateStatuses()
    document.querySelector("#secondsToRefresh").innerText = "Refreshing in " + secs + " seconds...";
}, 1000)

navigator.serviceWorker.addEventListener("message", (e) => {
    if(e.data.type == "Sort notification request thing.") {
        console.log("Doing so now...")
    }
})
