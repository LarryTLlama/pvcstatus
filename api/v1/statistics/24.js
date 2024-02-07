let count = 5;

export default async function handler(req, res) {
    count++;
    res.send(count);
}