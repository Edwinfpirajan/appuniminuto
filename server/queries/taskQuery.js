const taskQueryPost = `
    INSERT INTO task (tittle, description)  VALUES ($1, $2)
`

const taskQueryGet = `
    SELECT * FROM task
`

module.exports = {
    taskQueryGet,
    taskQueryPost
}