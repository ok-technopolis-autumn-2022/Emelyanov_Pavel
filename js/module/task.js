const MAX_ID_VALUE = 1000000000000;

export function createTask(desc) {
    return {
        id: getRandomInt(MAX_ID_VALUE),
        desc: desc
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}