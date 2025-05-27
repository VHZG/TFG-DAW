
import './App.css'
import ListTaskComponent from './components/ListTaskComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import TaskComponent from './components/TaskComponent'
import AIchat from './components/AIchat'
import AIassistant from './components/AIassistant'
import Analytics from './components/Analytics'


function App() {
  

  return (
    <>
    <BrowserRouter>

      <Routes>
        {/* // http://localhost:3000 */}
        <Route path='/' element= {<ListTaskComponent/>}></Route>
        {/* // http://localhost:3000/tasks*/}
        <Route path='/tasks' element ={<ListTaskComponent/>}></Route>
        {/* // http://localhost:3000/add-employee */}
        <Route path='/add-task' element={<TaskComponent/>}></Route>
        {/* // http://localhost:3000/edit-employee/1 */}
        <Route path='/edit-task/:id' element={<TaskComponent/>}></Route>
        {/* // http://localhost:3000/AIchat*/}
        <Route path='/AIchat' element ={<AIchat/>}></Route>
        {/* // http://localhost:3000/analytics*/}
        <Route path='/analytics' element ={<Analytics/>}></Route>
        {/* // http://localhost:3000/AIassistant*/}
        <Route path='/AIassistant' element ={<AIassistant/>}></Route>

      </Routes> 

    </BrowserRouter>
    </>
  )
}

export default App