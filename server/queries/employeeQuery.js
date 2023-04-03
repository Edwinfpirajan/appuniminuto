
const employeeQueryPost = `
    INSERT INTO employee (f_name, l_name, fk_task)  VALUES ($1, $2, $3)
`
const getAllEmployees = `
SELECT employee.id, f_name, l_name, fk_task, tittle, description FROM employee 
INNER JOIN task ON task.id = employee.fk_task
`
const employeeQueryUpdate = `
    UPDATE employee SET f_name = $1, l_name = $2, fk_task = $3 WHERE id = $4
`;

const employeeQueryDelete = `
    DELETE FROM employee WHERE id = $1
`;


module.exports = {
    getAllEmployees,
    employeeQueryPost,
    employeeQueryUpdate,
    employeeQueryDelete
}
