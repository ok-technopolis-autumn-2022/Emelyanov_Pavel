export function createTask(desc) {
    return {
        id: Date.now(),
        desc: desc
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}