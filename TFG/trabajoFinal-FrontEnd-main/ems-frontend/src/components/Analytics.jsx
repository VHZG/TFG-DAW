
import React,{useState, useEffect} from 'react';
import { Pie,Bar } from 'react-chartjs-2';
import { NavLink } from 'react-router-dom'
import {
  Chart as ChartJS,
  ArcElement,
  BarElement, 
  CategoryScale, 
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

import { getTaskByStatus } from '../services/TaskService'

ChartJS.register(ArcElement,BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Analytics = () => {

const [pendingTasks, setPendingTasks] = useState([]);
const [doneTasks, setDoneTasks] = useState([]);
const totalTasks = doneTasks.length + pendingTasks.length

    useEffect(() =>{
        getTaskFromStatus();  
    }, [])

    function getTaskFromStatus(){
      getTaskByStatus('Pending').then(response => {
        setPendingTasks(response.data);
      });

      getTaskByStatus('Done').then(response => {
        setDoneTasks(response.data);
      });
    }

  const dataPie = {
    labels: ['Completed tasks', 'Pending tasks'],
    datasets: [
      {
        label: 'Tasks',
        data: [doneTasks.length, pendingTasks.length],
        backgroundColor: ['rgba(63, 190, 97, 1)', '#f87171'],
        borderWidth: 1,
      }
    ]
  };

  const dataBar = {
    labels: ['Tasks'],
    datasets: [

      {
        label: 'Pending tasks',
        data: [pendingTasks.length],
        backgroundColor: 'rgba(248,113,113,0.8)',
        barPercentage: 1,
        categoryPercentage: 1,
        barThickness: 150,
        order: 1,
        grouped:false
      },
      {
        label: 'Completed tasks',
        data: [doneTasks.length],
        backgroundColor: 'rgba(63, 190, 97, 0.6)',
        barPercentage: 1,
        categoryPercentage: 1,
        barThickness: 150,
        order: 2,     
        grouped:false  

      },
      {
        label: 'Total tasks',
        data: [totalTasks],
        backgroundColor: 'rgba(75, 191, 249, 0.4)',
        barPercentage: 3,
        categoryPercentage: 1,
        barThickness: 150,
        order: 2,
        grouped:false
   
      },
    ]
  };
    const dataGroup = {
    labels: ['Pending tasks', 'Completed tasks', 'Total tasks'],
    datasets: [
      {
        label: 'Pending tasks',
        data: [pendingTasks.length, null,null],
        backgroundColor: ['#f87171'],
        barPercentage: 1
      },
      {
        label: 'Completed tasks',
        data: [null, doneTasks.length, null],
        backgroundColor: [ 'rgba(63, 190, 97, 1)'],
        barPercentage: 1
      },
    {
        label: 'Total tasks',
        data: [null, null, totalTasks],
        backgroundColor: ['#60a5fa'],
        barPercentage: 1
      }
    ]
  };

  const optionsPie = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        enabled: true
      }
    }
  };

    const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
    x: {
      stacked: false,
      offset: true,
      
    },
    y: {
        stacked: false,
        beginAtZero: true

    }
    }
  };
  const optionsGroup = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        enabled: true
      }
    }
  };

  return (
    <div className='background'>
      <div className='container'>
      <header>
          <nav>
          <NavLink to="/tasks" className={({isActive}) => isActive ? "tab active" : "tab"}>📋 Board view</NavLink>
          <NavLink to="/analytics"className={({isActive}) => isActive ? "tab active" : "tab"}>📊 Analytics</NavLink>
          <NavLink to="/AIchat" className={({isActive}) => isActive ? "tab active" : "tab"}>General AI</NavLink>
          <NavLink to="/AIassistant"className={({isActive}) => isActive ? "tab active" : "tab"}>Create AI Assistant</NavLink>
          </nav>
      </header>

    <div style={{display:'flex', flexWrap: 'wrap'}}>
        <div style={{ width: '20%', margin: '50px auto', color: 'white', }}>
        <br></br>
        <Pie data={dataPie} options={optionsPie} />
        </div>
        <div style={{ width: '30%', margin: '50px auto', color: 'white', }}>
        <br></br>
        <Bar data={dataBar} options={optionsBar} />
        </div>
        <div style={{ width: '30%', margin: '50px auto', color: 'white', }}>
        <br></br>
        <Bar data={dataGroup} options={optionsGroup} />
        </div>
    </div>

      </div>


    </div>


  )
}

export default Analytics