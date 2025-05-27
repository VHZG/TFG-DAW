import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Aichat.css'

function AIassistant(){

    async function sendMessage() {
        const input = document.getElementById('userInput').value;
        const responseDiv = document.getElementById('response');
        if (!input) {
            responseDiv.innerHTML = 'Please enter a message.';
            return;
        }
        responseDiv.innerHTML = 'Loading...';
        try {
            const response = await fetch(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer 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',
                        'HTTP-Referer': 'https://www.sitename.com',
                        'X-Title': 'SiteName',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'deepseek/deepseek-r1:free',
                        messages: [{ role: 'user', content: input + `Please respond ONLY with JSON, and nothing else. No explanations, no formatting, just this exact format: 
                            { 
                                "taskName": " ",
                                "categoryName": " ",
                                "status": " "
                            },
                            Only this. No markdown, no preamble, no trailing characters.`
                            
                            }],
                    }),
                },
            );
            const data = await response.json();
            const rawContent = data.choices?.[0]?.message?.content || '[]';
    
            let tasks;
    
            console.log('Raw JSON:', rawContent);
    
            try {
                tasks = JSON.parse(rawContent);
              } catch (e) {
                console.error('JSON.parse failed:', e);
                responseDiv.innerHTML = 'AI response is not valid JSON.';
                return;
              }
    
            if(!Array.isArray(tasks)){
                tasks = [tasks];
            }
            responseDiv.innerHTML = tasks.map(task => `
                <b>Task:</b> ${task.taskName}<br>
                <b>Category:</b> ${task.categoryName}<br>
                <b>Status:</b> ${task.status}<br>
            `).join('');
    
            await sendTasksToBackend(tasks);
                
        }catch(error){
            console.error('Failed to process the response:', error);
            responseDiv.innerHTML = 'AI response is not valid JSON.';    
        }
    }

    async function sendTasksToBackend(tasks){

        try{
            const response = await fetch('http://localhost:8080/api/tasks/bulk', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(tasks),
            });
            if (response.ok){
                console.log('Task sent successfully');
            }else{
                console.error('Failed to send the task');
            }
        }catch(error){
            console.error('Error sending to backend', error);
        }
    }

    return(
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
            <div className="chat-container">
            <h2>AI ASSISTANT CREATE</h2>
                <div className="form-group">
                    <input type="text" className="form-control" id="userInput" placeholder="Type your question here..." />
                </div>
                <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                <div id="response"></div>
            </div>
            </div>
        </div>
    )
}

export default AIassistant