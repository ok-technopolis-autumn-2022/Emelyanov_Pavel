export function createTask(desc) {
    return {
        id: Date.now(),
        desc: desc,
        completed: false
    }
}
