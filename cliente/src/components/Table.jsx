import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { EmployeeService } from '../service/EmployeService';

const Table = () => {
    const [employee, setEmployee] = useState({
        fName: '',
        lName: '',
        task: 1
    });
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

    useEffect(() => {
        EmployeeService.getAllEmployee().then((employees) => {
            setEmployees(employees);
        });
    }, []);

    const handleCreate = () => {
        setEmployee({
            fName: '',
            lName: '',
            task: 1
        });
        setEditDialogVisible(true);
    };

    const handleEdit = () => {
        setEmployee({
            ...selectedEmployee
        });
        setEditDialogVisible(true);
    };

    const handleDelete = () => {
        setDeleteDialogVisible(true);
    };

    const handleCreateEmployee = async () => {
        try {
            const newEmployee = await EmployeeService.createEmployee(employee);
            setEmployees([...employees, newEmployee]);
            setEditDialogVisible(false);
            setEmployee({
                fName: '',
                lName: '',
                task: 1
            });
            showToast('success', 'Empleado creado', 'El empleado ha sido creado exitosamente.');
        } catch (error) {
            showToast('error', 'Error al crear el empleado', 'Hubo un error al crear el empleado. Inténtelo de nuevo.');
        }
    };

    const handleEditEmployee = async () => {
        try {
            await EmployeeService.editEmployee(selectedEmployee.id, employee);
            const updatedEmployees = employees.map((e) => e.id === selectedEmployee.id ? employee : e);
            setEmployees(updatedEmployees);
            setEditDialogVisible(false);
            setSelectedEmployee(null);
            setEmployee({
                fName: '',
                lName: '',
                task: 1
            });
            showToast('success', 'Empleado actualizado', 'El empleado ha sido actualizado exitosamente.');
        } catch (error) {
            showToast('error', 'Error al actualizar el empleado', 'Hubo un error al actualizar el empleado. Inténtelo de nuevo.');
        }
    };

    const handleDeleteEmployee = async () => {
        try {
            await EmployeeService.deleteEmployee(selectedEmployee.id);
            const updatedEmployees = employees.filter((e) => e.id !== selectedEmployee.id);
            setEmployees(updatedEmployees);
            setDeleteDialogVisible(false);
            setSelectedEmployee(null);
            showToast('success', 'Empleado eliminado', 'El empleado ha sido eliminado exitosamente.');
        } catch (error) {
            showToast('error', 'Error al eliminar el empleado', 'Hubo un error al eliminar el empleado. Inténtelo de nuevo.');
        }
    };

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => {
                    setSelectedEmployee(rowData);
                    handleEdit();
                }} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => {
                    setSelectedEmployee(rowData);
                    handleDelete();
                }} />
            </>
        );
    };

    const header = (
        <div className="p-d-flex p-jc-between">
            <h2>Listado de empleados</h2>
            <Button label="Crear" icon="pi pi-plus" className="p-button-success" onClick={handleCreate} />
        </div>
    );

    const footer = (
        <div className="p-d-flex p-jc-between">
            <Button label="Cancelar" className="p-button-secondary" onClick={() => {
                setEditDialogVisible(false);
                setSelectedEmployee(null);
            }} />
            <Button label="Guardar" className="p-button-success" onClick={selectedEmployee ? handleEditEmployee : handleCreateEmployee} />
        </div>
    );

    const deleteFooter = (
        <div className="p-d-flex p-jc-between">
            <Button label="Cancelar" className="p-button-secondary" onClick={() => {
                setDeleteDialogVisible(false);
                setSelectedEmployee(null);
            }} />
            <Button label="Eliminar" className="p-button-danger" onClick={handleDeleteEmployee} />
        </div>
    );

    const toast = React.createRef();

    return (
        
        <div className="p-m-4">
            <div><Button label="Crear" icon="pi pi-plus" className="p-button-raised p-button-success p-mb-3" onClick={handleCreate} /></div>
            <Toast ref={toast} />
            <Dialog header={selectedEmployee ? 'Editar empleado' : 'Crear empleado'} visible={editDialogVisible} style={{ width: '400px' }} footer={footer} onHide={() => {
                setEditDialogVisible(false);
                setSelectedEmployee(null);
            }}>
                <div className="p-grid p-fluid">
                    <div className="p-field p-col-12">
                        <label htmlFor="fName">Nombre</label>
                        <input id="fName" type="text" value={employee.fName} onChange={(e) => setEmployee({ ...employee, fName: e.target.value })} />
                    </div>
                    <div className="p-field p-col-12">
                        <label htmlFor="lName">Apellido</label>
                        <input id="lName" type="text" value={employee.lName} onChange={(e) => setEmployee({ ...employee, lName: e.target.value })} />
                    </div>
                    <div className="p-field p-col-12">
                        <label htmlFor="task">Tarea</label>
                        <select id="task" value={employee.task} onChange={(e) => setEmployee({ ...employee, task: e.target.value })}>
                            <option value={1}>PROGRAMADOR</option>
                            <option value={2}>ARQUITECTO</option>
                            <option value={3}>TESTER</option>
                            <option value={4}>ANALISTA DE DATOS</option>
                        </select>
                    </div>
                </div>
            </Dialog>
            <ConfirmDialog header="Eliminar empleado" visible={deleteDialogVisible} footer={deleteFooter} onHide={() => {
                setDeleteDialogVisible(false);
                setSelectedEmployee(null);
            }}>
                ¿Está seguro de que desea eliminar al empleado seleccionado?
            </ConfirmDialog>
            <DataTable value={employees} selectionMode="single" selection={selectedEmployee} onSelectionChange={(e) => setSelectedEmployee(e.value)} dataKey="id">
                <Column field="f_name" header="Nombre" />
                <Column field="l_name" header="Apellido" />
                <Column field="tittle" header="Tarea" />
                <Column field="description" header="Descripción" />
                <Column body={actionBodyTemplate} />
            </DataTable>
        </div>
    );
};

export default Table;