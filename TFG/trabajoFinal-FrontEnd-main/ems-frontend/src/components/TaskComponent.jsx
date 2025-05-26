import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createTask, getTask, listCategories, updateTask } from '../services/TaskService';
import '../styles/formview.css'


const TaskComponent = () => {

    const [taskName,setTaskName] = useState('')
    const [categoryName,setCategoryName] = useState('')
    const [status, setStatus] = useState('')
    const statusValue = ["Pending", "Done"]
    const [categories, setCategories] = useState([])

    const {id} = useParams();
    const [errors, setErrors] = useState({
        taskName: '',
        status: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            getTask(id).then((response) => {
                setTaskName(response.data.taskName);
                setCategoryName(response.data.categoryName);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    function saveOrUpdateTask(e){
        e.preventDefault();

        if(validateForm()){
            const task = {taskName, status , categoryName}

            if(id){
                updateTask(id, task).then((response) => {
                    console.log(response.data);
                    navigator('/tasks');
                }).catch(error => {
                    console.error(error);
                })
            }else{
                createTask(task).then((response) => {
                    console.log(response.data); 
                    navigator('/tasks')
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function getAllCategories(){
        listCategories()
          .then(response => {
            setCategories(response.data)
          })
          .catch(err => console.error('Could not load categories', err))
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(taskName.trim()){
            errorsCopy.taskName = '';
        }else{
            errorsCopy.taskName = 'Task name is required';
            valid = false;
        }
        
        
        if(status.trim()){
            errorsCopy.status = '';
        }else{
            errorsCopy.status = 'Status is required';
            valid = false;
        }
        
        setErrors(errorsCopy);

        return valid;
    }

    function pagetitle(){
        if(id){
            return <h2 className='text-center'>Update Task</h2>
        }else{
            return <h2 className='text-center'>Add Task</h2>
        }
    }

  return (
    <div className="background">
    <br />
    <div className="custom-row">
        <div className="custom-card">
            <br />
            {pagetitle()}
            <div className="custom-card-body">
                <form onSubmit={saveOrUpdateTask}>
                    <div className="form-group">
                        <label className="form-label">First Name: </label>
                        <input 
                            type="text"
                            placeholder="Enter task name" 
                            name="taskName" 
                            value={taskName} 
                            className={`input-text ${errors.taskName ? 'input-invalid' : ''}`}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                        {errors.taskName && <div className="input-error">{errors.taskName}</div>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Category Name:</label>
                        <select
                            className="input-text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required
                        >
                            <option value="" disabled>-- Select category --</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.categoryName}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    
                    <div className="form-group">
                        <label className="form-label">Status:</label>
                        <select
                            className="input-text"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="" disabled>-- Select Status --</option>
                            {statusValue.map(statusOption => (
                                <option key={statusOption} value={statusOption}>
                                    {statusOption}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn-submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
 
    
)
}

export default TaskComponent