import axios from "axios";

const url = 'http://localhost:8080/api'

export const EmployeeService = {

    async createEmployee(newEmployee) {
        const response = await axios.post(`${url}/employee/create`, newEmployee);
        return response.data;
    },

    async getAllEmployee() {
        const res = await axios.get(`${url}/employee/all`);
        console.log(res.data)
        return res.data;
    },
    async editEmployee(id, updatedEmployee) {
        const response = await axios.put(`${url}/employee/edit/${id}`, updatedEmployee);
        return response.data;
    },
    async deleteEmployee(id) {
        const response = await axios.delete(`${url}/employees/delete/${id}`);
        return response.data;
    }
}
