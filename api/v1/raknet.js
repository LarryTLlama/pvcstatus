const { Client } = require('raknet-native')
const client = new Client('bedrock.peacefulvanilla.club', 19132, 'minecraft')
console.log('listening for data');
let timer;

client.on('pong', (data) => {
    const msg = data.extra?.toString()
    console.log('Decoded Buffer:')
    console.log(msg);
    console.log('OK')
    clearTimeout(timer)
});
console.log(client);

setInterval(function () {
    timer = setTimeout(function () {
        console.log('Offline')
    }, 5000);
    client.ping();
}, 10000)