import React, {useEffect, useState} from 'react'
import { listTasks, deleteTask, getTaskByStatus,updateTask } from '../services/TaskService'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import '../styles/boardview.css'
import MusicPlayer from '../components/MusicPlayer'

const ListTaskComponent = () => {

    
    const [tasks, setTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);

    const navigator = useNavigate();

    useEffect(() =>{
        getAllTasks();  
    }, [])
    
    
    useEffect(() =>{
      getTaskFromStatus();  
    }, [])

    function getAllTasks(){
        listTasks().then((Response) => {
            setTasks(Response.data);
        }).catch(error =>{
            console.error(error);
        })
    }

    function addNewTask(){
      navigator('/add-task')
    }

    function goToEditTask(id){
      navigator(`/edit-task/${id}`)
    }

    function completeTask(id) {

      const taskToUpdate = pendingTasks.find(task => task.id === id);

      if (taskToUpdate) {
        const updatedTask = { ...taskToUpdate, status: 'Done' };

        updateTask(id, updatedTask).then(response => {
          getTaskFromStatus(); 
        }).catch(error => {
          console.error('Error completing task:', error);
        });
      }
    }


    function removeTask(id){
        deleteTask(id).then((response) =>{
            getTaskFromStatus();
        }).catch(error => {
            console.error(error);
        })
    }

    function getTaskFromStatus(){
      getTaskByStatus('Pending').then(response => {
        setPendingTasks(response.data);
      });

      getTaskByStatus('Done').then(response => {
        setDoneTasks(response.data);
      });
    }

  return (  
    <div className='background'>
      <div className='container'>
      <header>
        <nav>
        <NavLink to="/tasks" className={({isActive}) => isActive ? "tab active" : "tab"}>📋 Board view</NavLink>
        <NavLink to="/analytics"className={({isActive}) => isActive ? "tab active" : "tab"}>📊 Analytics</NavLink>
        <NavLink to="/AIchat" className={({isActive}) => isActive ? "tab active" : "tab"}>General AI</NavLink>
        <NavLink to="/AIassistant"className={({isActive}) => isActive ? "tab active" : "tab"}> Create AI Assistant</NavLink>
        </nav>
      </header>
    
      <main>
        <section class="column">
          <div class="column-header">
            <h3>Pending tasks: ({pendingTasks.length})</h3>
            <button type="button" class="btn btn-outline-primary"  onClick={addNewTask}>Add Task</button>
          </div>
        {pendingTasks.map((task) => (
          <div class="task-card">
            <strong>{task.taskName}</strong>
            <p>{task.categoryName}</p>
            <div class="progress"></div>
            <button type="button" class="btn btn-outline-warning" onClick={() => goToEditTask(task.id)}>Update</button>
            <button type="button" class="btn btn-outline-danger" onClick={() => removeTask(task.id)} style={{ marginLeft: '5px' }}>Delete</button>  
            <button type="button" class="btn btn-outline-success" onClick={() => completeTask(task.id)}  style={{ marginLeft: '5px' }}>Completed</button>       
          </div>
        ))}
        </section>
    
        <section class="timer">
        <MusicPlayer/>
        </section>
    
        <section class="column-done">
          <h3>Done Tasks</h3>
          {doneTasks.map((doneTask) => (

          <div class="task-card done-card">
            <strong>{doneTask.taskName}</strong>
            <p>{doneTask.categoryName}</p>
            <div class="progress"></div>
            <button type="button" class="btn btn-outline-warning" disabled >Update</button>
            <button type="button" class="btn btn-outline-danger"  onClick={() => removeTask(doneTask.id)} style={{ marginLeft: '5px' }}>Delete</button>  
            <button type="button" class="btn btn-outline-success" disabled style={{ marginLeft: '5px' }}>Completed</button>             
            </div>
          ))}

        </section>
      </main>
    </div>
    </div>
    

    
  )
}

export default ListTaskComponent